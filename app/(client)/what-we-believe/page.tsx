import { getStatements } from '@/src/features/statement/actions';
import StatementOfFaithContent from './StatementOfFaithContent';

export default async function StatementOfFaithPage() {
    const result = await getStatements();

    if (!result.success) {
        return (
            <div className='flex items-center justify-center min-h-screen'>
                <div>Error: {result.error}</div>
            </div>
        );
    }

    return <StatementOfFaithContent statements={result.data} />;
}
