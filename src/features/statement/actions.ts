'use server';

import { revalidateTag } from 'next/cache';
import { Prisma } from '@/src/generated/prisma';
import { prisma } from '@/src/lib/prisma';
import { z } from 'zod';
import {
    statementFormDataSchema,
    StatementFormData,
    Statement,
} from './schemas';
import type { Statement as PrismaStatement } from '@/src/generated/prisma';

// Helper Types for Prisma's return value which includes sub-statement relations
type StatementWithSubStatements = PrismaStatement & {
    subStatements: StatementLevel2[];
};

type StatementLevel2 = PrismaStatement & {
    subStatements: StatementLevel3[];
};

type StatementLevel3 = PrismaStatement & {
    subStatements: StatementLevel4[];
};

type StatementLevel4 = PrismaStatement & {
    subStatements: PrismaStatement[];
};

/**
 * A recursive helper function that safely casts the data returned from Prisma
 * into our strict, recursive `Statement` application type. This ensures that
 * every node in the tree has a `subStatements` array, satisfying TypeScript.
 */
function toAppStatement(
    prismaStatement: StatementWithSubStatements
): Statement {
    return {
        ...prismaStatement,
        subStatements: prismaStatement.subStatements.map(toAppStatement),
    };
}

const updateOrderSchema = z.array(
    z.object({
        id: z.string().cuid(),
        displayOrder: z.number(),
    })
);

// A reusable, deeply nested include object for fetching the entire statement tree.
const recursiveStatementInclude: Prisma.StatementInclude = {
    subStatements: {
        orderBy: { displayOrder: 'asc' },
        include: {
            subStatements: {
                orderBy: { displayOrder: 'asc' },
                include: {
                    subStatements: {
                        orderBy: { displayOrder: 'asc' },
                        include: {
                            subStatements: {
                                orderBy: { displayOrder: 'asc' },
                            },
                        },
                    },
                },
            },
        },
    },
};

export async function updateStatementOrder(
    items: z.infer<typeof updateOrderSchema>
) {
    const validation = updateOrderSchema.safeParse(items);
    if (!validation.success) {
        return {
            success: false,
            error: 'Invalid input for reordering.',
        };
    }

    try {
        await prisma.$transaction(
            validation.data.map(item =>
                prisma.statement.update({
                    where: { id: item.id },
                    data: { displayOrder: item.displayOrder },
                })
            )
        );

        revalidateTag('statements');
        return { success: true };
    } catch (error) {
        console.error('Failed to update statement order:', error instanceof Error ? error.message : 'Unknown error');
        return {
            success: false,
            error: 'Database operation failed during reorder.',
        };
    }
}

export async function getStatements(): Promise<
    { success: true; data: Statement[] } | { success: false; error: string }
> {
    try {
        const statements = await prisma.statement.findMany({
            where: { parentId: null },
            include: recursiveStatementInclude,
            orderBy: { displayOrder: 'asc' },
        });
        return {
            success: true,
            data: (statements as unknown as StatementWithSubStatements[]).map(
                toAppStatement
            ),
        };
    } catch (error) {
        console.error('Failed to fetch statements:', error instanceof Error ? error.message : 'Unknown error');
        return { success: false, error: 'Failed to fetch statements' };
    }
}

export async function getStatement(
    id: string
): Promise<
    | { success: true; data: Statement }
    | { success: false; error: string; data: null }
> {
    try {
        const statement = await prisma.statement.findUnique({
            where: { id },
            include: recursiveStatementInclude,
        });

        if (!statement) {
            return { success: false, error: 'Statement not found', data: null };
        }
        return {
            success: true,
            data: toAppStatement(
                statement as unknown as StatementWithSubStatements
            ),
        };
    } catch (error) {
        console.error(`Failed to fetch statement ${id}:`, error instanceof Error ? error.message : 'Unknown error');
        return {
            success: false,
            error: 'Failed to fetch statement',
            data: null,
        };
    }
}

/**
 * A robust, transactional action to create or update a statement and its entire
 * nested tree of sub-statements.
 */
export async function createOrUpdateStatement(input: StatementFormData) {
    const validation = statementFormDataSchema.safeParse(input);
    if (!validation.success) {
        return {
            success: false,
            error: `Invalid input data: ${validation.error.message}`,
        };
    }

    const data = validation.data;

    try {
        const result = await prisma.$transaction(async tx => {
            const processNode = async (
                node: StatementFormData,
                parentId: string | null
            ): Promise<Statement> => {
                const { subStatements, ...statementData } = node;

                const dataForDb = {
                    topic: statementData.topic,
                    content: statementData.content,
                    bibleReferences: statementData.bibleReferences || null,
                    displayOrder: statementData.displayOrder,
                    parentId,
                };

                let processedStatement: StatementWithSubStatements;

                if (node.id) {
                    processedStatement = (await tx.statement.update({
                        where: { id: node.id },
                        data: dataForDb,
                        include: { subStatements: true },
                    })) as StatementWithSubStatements;
                } else {
                    processedStatement = (await tx.statement.create({
                        data: dataForDb,
                        include: { subStatements: true },
                    })) as StatementWithSubStatements;
                }

                const existingSubIds = processedStatement.subStatements.map(
                    s => s.id
                );
                const incomingSubIds = subStatements
                    .map(sub => sub.id)
                    .filter((id): id is string => !!id);

                const idsToDelete = existingSubIds.filter(
                    id => !incomingSubIds.includes(id)
                );
                if (idsToDelete.length > 0) {
                    await tx.statement.deleteMany({
                        where: { id: { in: idsToDelete } },
                    });
                }

                const processedChildren: Statement[] = [];
                for (const [index, subStatement] of subStatements.entries()) {
                    const child = await processNode(
                        { ...subStatement, displayOrder: index },
                        processedStatement.id
                    );
                    processedChildren.push(child);
                }

                const { subStatements: _, ...restOfProcessedStatement } =
                    processedStatement;

                return {
                    ...restOfProcessedStatement,
                    subStatements: processedChildren,
                };
            };

            return await processNode(data, null);
        }, {
            timeout: 20000, // 20 seconds timeout for complex nested operations
        });

        revalidateTag('statements');
        return { success: true, data: result };
    } catch (error) {
        console.error('Failed to create or update statement:', error instanceof Error ? error.message : 'Unknown error');
        return { success: false, error: 'Database operation failed.' };
    }
}

export async function deleteStatement(id: string) {
    try {
        await prisma.statement.delete({
            where: { id },
        });

        revalidateTag('statements');
        return { success: true };
    } catch (error) {
        console.error(`Failed to delete statement ${id}:`, error instanceof Error ? error.message : 'Unknown error');
        return { success: false, error: 'Failed to delete statement' };
    }
}
