import { FAQTable } from '@/src/features/faq/components/FAQTable';

export default function FAQPage() {
    return (
        <div className='container mx-auto py-6'>
            <div className='flex justify-between items-center mb-6'>
                <h1 className='text-3xl font-bold'>FAQ Management</h1>
            </div>
            <div className='space-y-6'>
                <FAQTable />
            </div>
        </div>
    );
}
