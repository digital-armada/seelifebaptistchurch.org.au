'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    contactFormSchema,
    ContactFormValues,
} from '@/src/features/contact/model/contact.schema';
import { useSendContactMessage } from '@/src/features/contact/queries';

import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import PageHeader from '@/src/components/PageHeader';

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactFormSchema),
    });

    const sendMessageMutation = useSendContactMessage();

    const onSubmit = (data: ContactFormValues) => {
        ``;
        sendMessageMutation.mutate(data, {
            onSuccess: () => {
                reset();
            },
            onError: error => {
                console.error('Submission failed:', error);
            },
        });
    };

    const isPending = isSubmitting || sendMessageMutation.isPending;

    return (
        <div className='min-h-screen bg-gray-50'>
            <PageHeader title='Contact Us' sub='' />

            <div className='py-16'>
                <div className='container mx-auto px-4 max-w-2xl'>
                    {sendMessageMutation.isSuccess && (
                        <div className='mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded'>
                            Thank you for your message! We'll get back to you
                            soon.
                        </div>
                    )}

                    {sendMessageMutation.isError && (
                        <div className='mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded'>
                            {sendMessageMutation.error.message ||
                                'Sorry, there was an error sending your message. Please try again.'}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className='space-y-6'>
                        <div>
                            <label
                                htmlFor='name'
                                className='block text-sm font-medium text-gray-700 mb-2'>
                                Name
                            </label>
                            <Input
                                id='name'
                                {...register('name')}
                                className='w-full'
                                placeholder='Your full name'
                                aria-invalid={!!errors.name}
                            />
                            {errors.name && (
                                <p className='text-sm text-red-600 mt-1'>
                                    {errors.name.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='email'
                                className='block text-sm font-medium text-gray-700 mb-2'>
                                Email
                            </label>
                            <Input
                                id='email'
                                type='email'
                                {...register('email')}
                                className='w-full'
                                placeholder='your.email@example.com'
                                aria-invalid={!!errors.email}
                            />
                            {errors.email && (
                                <p className='text-sm text-red-600 mt-1'>
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        <div>
                            <label
                                htmlFor='phone'
                                className='block text-sm font-medium text-gray-700 mb-2'>
                                Phone number (Optional)
                            </label>
                            <Input
                                id='phone'
                                type='tel'
                                {...register('phone')}
                                className='w-full'
                                placeholder='Your phone number'
                            />
                        </div>

                        <div>
                            <label
                                htmlFor='message'
                                className='block text-sm font-medium text-gray-700 mb-2'>
                                Message
                            </label>
                            <Textarea
                                id='message'
                                {...register('message')}
                                rows={6}
                                className='w-full'
                                placeholder='Your message...'
                                aria-invalid={!!errors.message}
                            />
                            {errors.message && (
                                <p className='text-sm text-red-600 mt-1'>
                                    {errors.message.message}
                                </p>
                            )}
                        </div>

                        <div className='flex justify-center'>
                            <Button
                                type='submit'
                                disabled={isPending}
                                className='px-8 py-2 bg-cerulean-700 hover:bg-cerulean-600 text-white rounded-md font-medium'>
                                {isPending ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
