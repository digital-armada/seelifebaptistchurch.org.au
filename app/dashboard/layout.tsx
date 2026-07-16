'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/src/components/auth-provider';
import { AppSidebar } from '@/src/components/app-sidebar';
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from '@/src/components/ui/sidebar';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const session = await authClient.getSession();
            if (!session.data || (session.data.user as any).role !== 'ADMIN') {
                router.push('/login');
            } else {
                setIsLoading(false);
            }
        };
        checkAuth();
    }, [router]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className='flex h-16 shrink-0 items-center gap-2 px-4'>
                    <SidebarTrigger />
                    <h1 className='text-3xl font-bold'>Dashboard</h1>
                </header>
                <div className=' px-4 sm:px-6 lg:px-8 py-8'>{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
