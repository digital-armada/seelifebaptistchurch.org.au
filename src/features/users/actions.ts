'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient } from '../../generated/prisma';
import { prisma } from '@/src/lib/prisma';

export async function getUsers() {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });
        return { success: true, data: users };
    } catch (error) {
        console.error(
            'Failed to fetch users:',
            error instanceof Error ? error.message : 'Unknown error'
        );
        return { success: false, error: 'Failed to fetch users' };
    }
}

// REMOVED: The insecure createUser function has been deleted.
// User creation is now handled exclusively by `src/features/auth/actions.ts`
// which leverages `better-auth` for secure password hashing.

export async function updateUser(
    id: string,
    data: { name?: string; email?: string; role?: string }
) {
    // Note: Add Zod validation here for production-grade robustness
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
            },
        });

        revalidateTag('users');
        return { success: true, data: user };
    } catch (error) {
        console.error(
            'Failed to update user:',
            error instanceof Error ? error.message : 'Unknown error'
        );
        return { success: false, error: 'Failed to update user' };
    }
}

export async function deleteUser(id: string) {
    try {
        await prisma.user.delete({
            where: { id },
        });

        revalidateTag('users');
        return { success: true };
    } catch (error) {
        console.error(
            'Failed to delete user:',
            error instanceof Error ? error.message : 'Unknown error'
        );
        return { success: false, error: 'Failed to delete user' };
    }
}
