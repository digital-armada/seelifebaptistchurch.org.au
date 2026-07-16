'use client';

import { Dashboard } from '@/src/features/statement/components/Dashboard';
import { useStatements } from '@/src/features/statement/queries';

export default function StatementOfFaithPage() {
    const { data: statements } = useStatements();

    return (
        <div className='w-full px-6 py-10'>
            <Dashboard statements={statements || []} />
        </div>
    );
}
