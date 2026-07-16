'use client'; // This page has client-side routing buttons, so 'use client' is appropriate for now.
// A more advanced refactor could move the data fetching to a parent Server Component.

import { useRouter, useParams } from 'next/navigation';
import { useStatement } from '@/src/features/statement/queries';
import { NestedEditor } from '@/src/features/statement/components/NestedEditor';
import { Button } from '@/src/components/ui/button';
import { Skeleton } from '@/src/components/ui/skeleton';

export default function ViewStatementPage() {
    const router = useRouter();
    const params = useParams();
    const id = params.id as string;

    const { data: statement, isLoading, error } = useStatement(id);

    if (isLoading) {
        return (
            <div className='container mx-auto py-6'>
                <div className='space-y-4'>
                    <Skeleton className='h-12 w-1/2' />
                    <Skeleton className='h-6 w-3/4' />
                    <div className='p-6 bg-white shadow rounded-lg'>
                        <Skeleton className='h-48 w-full' />
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className='container mx-auto py-6'>
                <div className='text-center text-red-600'>
                    Error loading statement: {error.message}
                </div>
            </div>
        );
    }

    if (!statement) {
        return (
            <div className='container mx-auto py-6'>
                <div className='text-center'>Statement not found</div>
            </div>
        );
    }

    return (
        <div className='container mx-auto py-6'>
            <div className='mb-6'>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold'>
                            {statement.topic}
                        </h1>
                        {statement.content && (
                            <p className='text-gray-600 mt-2'>
                                {statement.content}
                            </p>
                        )}
                        <p className='text-sm text-gray-500 mt-1'>
                            Created:{' '}
                            {isNaN(new Date(statement.createdAt).getTime())
                                ? 'N/A'
                                : new Date(
                                      statement.createdAt
                                  ).toLocaleDateString()}{' '}
                            | Updated:{' '}
                            {isNaN(new Date(statement.updatedAt).getTime())
                                ? 'N/A'
                                : new Date(
                                      statement.updatedAt
                                  ).toLocaleDateString()}
                        </p>
                    </div>
                    <div className='flex space-x-3'>
                        <Button
                            variant='outline'
                            onClick={() =>
                                router.push(
                                    `/dashboard/statement-of-faith/${id}/edit`
                                )
                            }>
                            Edit Statement
                        </Button>
                        <Button
                            variant='outline'
                            onClick={() =>
                                router.push('/dashboard/statement-of-faith')
                            }>
                            Back to List
                        </Button>
                    </div>
                </div>
            </div>

            <div className='bg-white shadow rounded-lg p-6'>
                <NestedEditor statement={statement} />
            </div>
        </div>
    );
}
