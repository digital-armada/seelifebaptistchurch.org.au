import { notFound } from 'next/navigation';
import { getFAQ } from '@/src/features/faq/actions';
import { FAQForm } from '@/src/features/faq/components/FAQForm';

export default async function EditFAQPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const result = await getFAQ(id);

    if (!result.success) {
        notFound();
    }

    const faq = result.data;

    return (
        <div className='container mx-auto py-6'>
            <div className='mb-6'>
                <h1 className='text-3xl font-bold'>Edit FAQ</h1>
                <p className='text-gray-600 mt-2'>
                    Update the details of this FAQ.
                </p>
            </div>
            <div className='bg-white shadow rounded-lg p-6'>
                <FAQForm faq={faq} />
            </div>
        </div>
    );
}
