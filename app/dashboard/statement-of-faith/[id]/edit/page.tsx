import { notFound } from 'next/navigation';
import { getStatement } from '@/src/features/statement/actions';
import { StatementOfFaithForm } from '@/src/features/statement/components/StatementOfFaithForm';
import { Statement } from '@/src/features/statement/schemas';

// This is now a Server Component
export default async function EditStatementPage({
    params,
}: {
    params: { id: string };
}) {
    const { id } = params;
    const result = await getStatement(id);

    // Handle the case where the statement is not found on the server.
    if (!result.success || !result.data) {
        notFound();
    }

    const statement: Statement = result.data;

    return (
        <div className='w-full px-6 py-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold'>Edit Statement of Faith</h1>
                <p className='text-gray-600 mt-2'>
                    Update the details of this statement of faith.
                </p>
            </div>
            {/* The form receives the server-fetched data as a prop */}
            <div className='bg-white shadow rounded-lg p-6 w-full'>
                <StatementOfFaithForm statement={statement} />
            </div>
        </div>
    );
}
