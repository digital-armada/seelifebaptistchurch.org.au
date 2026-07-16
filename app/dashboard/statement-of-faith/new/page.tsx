'use client';

import { StatementOfFaithForm } from '@/src/features/statement/components/StatementOfFaithForm';

export default function NewStatementPage() {
    return (
        <div className='w-full px-6 py-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold'>
                    Create New Statement of Faith
                </h1>
                <p className='text-gray-600 mt-2'>
                    Add a new statement of faith to your church's doctrine.
                </p>
            </div>
            <div className='bg-white shadow rounded-lg p-6 w-full'>
                <StatementOfFaithForm />
            </div>
        </div>
    );
}
