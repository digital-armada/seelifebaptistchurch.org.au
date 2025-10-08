import { z } from 'zod';
import type { Statement as PrismaStatement } from '@/src/generated/prisma';

// Define a placeholder interface. This is a standard pattern for helping TypeScript
// understand the shape of a recursive object before the Zod schema is defined.
interface RecursiveStatement {
    id?: string;
    topic: string;
    content: string;
    bibleReferences?: string;
    displayOrder: number;
    subStatements: RecursiveStatement[];
}

// Create the recursive schema, explicitly telling TypeScript it will conform to our interface.
// This guides the type inference process correctly.
export const statementFormDataSchema: z.ZodType<RecursiveStatement> = z.lazy(() =>
    z.object({
        id: z.string().cuid().optional(),
        topic: z.string().min(1, 'Topic is required'),
        content: z.string().min(1, 'Content is required'),
        bibleReferences: z.string().optional(),
        displayOrder: z.number().min(0, 'Display order must be 0 or greater'),
        // The recursion uses the schema itself.
        subStatements: z.array(statementFormDataSchema),
    })
);

// Now, infer the final, fully-typed `StatementFormData` from the corrected schema.
// This is the type we will use in our form components.
export type StatementFormData = z.infer<typeof statementFormDataSchema>;

// This type definition for the server-fetched data remains unchanged.
export type Statement = PrismaStatement & {
    subStatements: Statement[];
};
