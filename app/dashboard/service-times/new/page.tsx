'use client';

import { ServiceTimesForm } from '@/src/features/service-times/components/ServiceTimesForm';
import { useRouter } from 'next/navigation';

export default function NewServiceTimePage() {
    const router = useRouter();

    const handleSuccess = () => {
        router.push('/dashboard/service-times');
    };

    return (
        <div className='container mx-auto py-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Create New Service Time</h1>
            </div>
            <div className='max-w-md'>
                <ServiceTimesForm onSuccess={handleSuccess} />
            </div>
        </div>
    );
}
