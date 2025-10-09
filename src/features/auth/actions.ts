'use server';

import { auth } from '@/src/lib/auth';
import { createUserSchema } from '@/src/features/users/model/user.schema';
import { prisma } from '@/src/lib/prisma';
import { z } from 'zod';
import { Prisma } from '@/src/generated/prisma';

export async function registerUserAction(
    input: z.infer<typeof createUserSchema>
) {
    console.log(
        '[SERVER ACTION] registerUserAction invoked at:',
        new Date().toISOString()
    );
    console.log('[SERVER ACTION] Input received:', {
        name: input.name,
        email: input.email,
    });

    const validation = createUserSchema.safeParse(input);
    if (!validation.success) {
        const errorMessage =
            validation.error.issues[0]?.message || 'Invalid input data.';
        console.error('[SERVER ACTION] Validation failed:', errorMessage);
        return { success: false, error: errorMessage };
    }

    const { name, email, password } = validation.data;

    try {
        const userCount = await prisma.user.count();
        console.log(`[SERVER ACTION] Found ${userCount} existing user(s).`);

        if (userCount > 0) {
            const errorMessage =
                'Registration is not allowed. An admin user already exists.';
            console.warn('[SERVER ACTION] Aborting:', errorMessage);
            return { success: false, error: errorMessage };
        }

        console.log(
            '[SERVER ACTION] Attempting to sign up user with better-auth...'
        );
        const user = await auth.api.signUpEmail({
            body: { email, password, name },
        });
        console.log(
            '[SERVER ACTION] better-auth signup successful. User ID:',
            user.user.id
        );

        console.log(
            `[SERVER ACTION] Updating user ${user.user.id} to ADMIN role...`
        );
        await prisma.user.update({
            where: { id: user.user.id },
            data: { role: 'ADMIN' },
        });
        console.log('[SERVER ACTION] Role update successful.');

        return {
            success: true,
            data: { id: user.user.id, email: user.user.email },
        };
    } catch (error) {
        console.error(
            '[SERVER ACTION] An error occurred in the try-catch block:',
            JSON.stringify(error, null, 2)
        );

        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                return {
                    success: false,
                    error: 'An account with this email already exists.',
                };
            }
        }

        if (error instanceof Error) {
            const apiError = error as any;
            if (
                apiError.status === 'UNPROCESSABLE_ENTITY' &&
                apiError.body?.message
            ) {
                return { success: false, error: apiError.body.message };
            }
            return { success: false, error: error.message };
        }

        return {
            success: false,
            error: 'An unknown error occurred during registration.',
        };
    }
}
