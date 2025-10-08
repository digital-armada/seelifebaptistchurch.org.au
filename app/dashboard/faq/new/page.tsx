'use client';

import { FAQForm } from '@/src/features/faq/components/FAQForm';
import { useRouter } from 'next/navigation';

export default function NewFAQPage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/dashboard/faq');
    };

    return (
        <div className='container mx-auto py-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Create New FAQ</h1>
            </div>
            <div className='max-w-2xl'>
                <FAQForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
}
