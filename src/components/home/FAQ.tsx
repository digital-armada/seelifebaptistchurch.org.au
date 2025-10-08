'use client';

import { useFAQs } from '@/src/features/faq/queries';

export function FAQ() {
    const { data: faqs, isLoading, error } = useFAQs();

    if (isLoading) return <div>Loading FAQs...</div>;
    if (error) return <div>Error loading FAQs</div>;
    if (!faqs || faqs.length === 0) return null;

    return (
        <div className='py-8 bg-gray-50'>
            <div className='container mx-auto px-4'>
                <div className='text-center mb-6'>
                    <h2 className='text-2xl font-bold text-gray-900 mb-3'>
                        Frequently Asked Questions
                    </h2>
                    <p className='text-gray-600 max-w-xl mx-auto text-sm'>
                        Common questions about our church.
                    </p>
                </div>

                <div className='max-w-2xl mx-auto space-y-3'>
                    {faqs.map(faq => (
                        <details
                            key={faq.id}
                            className='bg-white rounded-lg border'>
                            <summary className='cursor-pointer p-4 font-medium text-gray-900 text-sm hover:bg-gray-50 hover:rounded-lg focus:outline-none '>
                                {faq.question}
                            </summary>
                            <div className='px-4 py-4 text-gray-700 text-sm'>
                                {faq.answer}
                            </div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
