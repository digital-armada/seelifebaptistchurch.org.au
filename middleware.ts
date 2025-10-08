import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    // For now, just check if accessing dashboard
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        // Redirect to login if not authenticated - will be checked client-side
        // Since edge runtime issues with Prisma, we'll handle auth in components
        return NextResponse.next();
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
