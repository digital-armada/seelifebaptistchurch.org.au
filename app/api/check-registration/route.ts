import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';

export async function GET() {
    try {
        const userCount = await prisma.user.count();
        return NextResponse.json({ allowed: userCount === 0 });
    } catch (error) {
        console.error('Failed to check user count:', error);
        return NextResponse.json({ allowed: false }, { status: 500 });
    }
}
