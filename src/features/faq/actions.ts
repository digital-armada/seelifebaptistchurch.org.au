'use server';

import { revalidateTag } from 'next/cache';
import { PrismaClient } from '../../generated/prisma';
import { prisma } from '@/src/lib/prisma';

export async function getFAQs() {
    try {
        const faqs = await prisma.fAQ.findMany({
            select: {
                id: true,
                question: true,
                answer: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return { success: true, data: faqs };
    } catch (error) {
        return { success: false, error: 'Failed to fetch FAQs' };
    }
}

export async function getFAQ(id: string) {
    try {
        const faq = await prisma.fAQ.findUnique({
            where: { id },
            select: {
                id: true,
                question: true,
                answer: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!faq) {
            return { success: false, error: 'FAQ not found' };
        }
        return { success: true, data: faq };
    } catch (error) {
        return { success: false, error: 'Failed to fetch FAQ' };
    }
}

export async function createFAQ(data: { question: string; answer: string }) {
    try {
        console.log('Creating FAQ with data:', data);
        const faq = await prisma.fAQ.create({
            data: {
                id: crypto.randomUUID(),
                question: data.question,
                answer: data.answer,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                question: true,
                answer: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        console.log('FAQ created successfully:', faq);

        revalidateTag('faqs');
        return { success: true, data: faq };
    } catch (error) {
        console.error('Error creating FAQ:', error);
        return { success: false, error: 'Failed to create FAQ' };
    }
}

export async function updateFAQ(
    id: string,
    data: {
        question?: string;
        answer?: string;
    }
) {
    try {
        const faq = await prisma.fAQ.update({
            where: { id },
            data: {
                ...data,
                updatedAt: new Date(),
            },
            select: {
                id: true,
                question: true,
                answer: true,
                createdAt: true,
                updatedAt: true,
            },
        });

        revalidateTag('faqs');
        return { success: true, data: faq };
    } catch (error) {
        return { success: false, error: 'Failed to update FAQ' };
    }
}

export async function deleteFAQ(id: string) {
    try {
        await prisma.fAQ.delete({
            where: { id },
        });

        revalidateTag('faqs');
        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to delete FAQ' };
    }
}
