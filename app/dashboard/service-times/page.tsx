import { ServiceTimesTable } from '@/src/features/service-times/components/ServiceTimesTable';

export default function ServiceTimesPage() {
    return (
        <div className='container mx-auto py-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>Service Times Management</h1>
            </div>
            <div className='space-y-6'>
                <ServiceTimesTable />
            </div>
        </div>
    );
}
