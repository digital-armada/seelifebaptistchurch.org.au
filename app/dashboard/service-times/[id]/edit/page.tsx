import { notFound } from 'next/navigation';
import { getService } from '@/src/features/service-times/actions';
import { ServiceTimesForm } from '@/src/features/service-times/components/ServiceTimesForm';

export default async function EditServicePage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const result = await getService(id);

    if (!result.success) {
        notFound();
    }

    const service = result.data;

    return (
        <div className='container mx-auto py-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold'>Edit Service Time</h1>
                <p className='text-gray-600 mt-2'>
                    Update the details of this service time.
                </p>
            </div>
            <div className='bg-white shadow rounded-lg p-6'>
                <ServiceTimesForm service={service} />
            </div>
        </div>
    );
}
