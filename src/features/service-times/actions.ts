'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient } from '../../generated/prisma';
import { prisma } from '@/src/lib/prisma';

export async function getServices() {
    try {
        const services = await prisma.services.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                day: true,
                time: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                time: 'asc',
            },
        });
        return { success: true, data: services };
    } catch (error) {
        return { success: false, error: 'Failed to fetch services' };
    }
}

export async function getService(id: string) {
    try {
        const service = await prisma.services.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                description: true,
                day: true,
                time: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!service) {
            return { success: false, error: 'Service not found' };
        }
        return { success: true, data: service };
    } catch (error) {
        return { success: false, error: 'Failed to fetch service' };
    }
}

export async function createService(data: {
    name: string;
    description?: string;
    day: string;
    time: string;
}) {
    try {
        const service = await prisma.services.create({
            data: {
                name: data.name,
                description: data.description,
                day: data.day as any,
                time: data.time,
            },
            select: {
                id: true,
                name: true,
                description: true,
                day: true,
                time: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        revalidateTag('service-times');
        return { success: true, data: service };
    } catch (error) {
        return { success: false, error: 'Failed to create service' };
    }
}

export async function updateService(
    id: string,
    data: {
        name?: string;
        description?: string | null;
        day?: string;
        time?: string;
    }
) {
    try {
        const service = await prisma.services.update({
            where: { id },
            data: {
                ...data,
                day: data.day as any,
            },
            select: {
                id: true,
                name: true,
                description: true,
                day: true,
                time: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        revalidateTag('service-times');
        return { success: true, data: service };
    } catch (error) {
        return { success: false, error: 'Failed to update service' };
    }
}

export async function deleteService(id: string) {
    try {
        await prisma.services.delete({
            where: { id },
        });

        revalidateTag('service-times');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete service' };
    }
}
