'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { faqSchema, type FAQSchemaType } from '../model/faq.schema';
import { useCreateFAQ, useUpdateFAQ } from '../queries';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { FAQ } from '../types';

interface FAQFormProps {
    faq?: FAQ | null;
    onSuccess?: () => void;
}

export function FAQForm({ faq, onSuccess }: FAQFormProps) {
    const createFAQ = useCreateFAQ();
    const updateFAQ = useUpdateFAQ();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(faqSchema),
        defaultValues: {
            question: faq?.question ?? '',
            answer: faq?.answer ?? '',
        },
    });

    const onSubmit: SubmitHandler<FAQSchemaType> = async data => {
        try {
            if (faq) {
                await updateFAQ.mutateAsync({
                    id: faq.id,
                    data,
                });
            } else {
                await createFAQ.mutateAsync(data);
            }
            onSuccess?.();
        } catch (error) {
            console.error('Error saving FAQ:', error);
        }
    };

    const isPending = createFAQ.isPending || updateFAQ.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
                <label htmlFor='question'>Question</label>
                <Input
                    id='question'
                    {...register('question')}
                    placeholder='e.g., What is the church service time?'
                />
                {errors.question && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.question.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='answer'>Answer</label>
                <Textarea
                    id='answer'
                    {...register('answer')}
                    placeholder='Provide a detailed answer to the question.'
                    rows={6}
                />
                {errors.answer && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.answer.message}
                    </p>
                )}
            </div>
            <Button type='submit' disabled={isPending}>
                {isPending ? 'Saving...' : faq ? 'Update FAQ' : 'Create FAQ'}
            </Button>
        </form>
    );
}
