import { Skeleton } from '@/src/components/ui/skeleton';

export default function Loading() {
    // This UI will be shown automatically via Suspense while the page fetches data.
    return (
        <div className='container mx-auto py-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold'>Edit Service Time</h1>
                <p className='text-gray-600 mt-2'>
                    Update the details of this service time.
                </p>
            </div>
            <div className='max-w-md space-y-4'>
                <Skeleton className='h-10 w-1/3' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
                <Skeleton className='h-10 w-full' />
            </div>
        </div>
    );
}
