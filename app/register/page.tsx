'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRegisterUser } from '@/src/features/users/queries';
import {
    createUserSchema,
    CreateUserFormValues,
} from '@/src/features/users/model/user.schema';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const registerSchema = createUserSchema;

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
    const router = useRouter();
    // const [canRegister, setCanRegister] = useState<boolean | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
    });

    const registerUserMutation = useRegisterUser();

    // useEffect(() => {
    //     // Check if registration is allowed (no users exist)
    //     const checkRegistration = async () => {
    //         try {
    //             const response = await fetch('/api/check-registration');
    //             const data = await response.json();
    //             setCanRegister(data.allowed);
    //             if (!data.allowed) {
    //                 router.push('/login');
    //             }
    //         } catch (error) {
    //             console.error('Failed to check registration status:', error);
    //             setCanRegister(false);
    //             router.push('/login');
    //         }
    //     };
    //     checkRegistration();
    // }, [router]);

    const onSubmit = (data: RegisterFormValues) => {
        registerUserMutation.mutate(data, {
            onSuccess: () => {
                router.push('/login');
            },
            onError: error => {
                console.error('Registration failed:', error);
                alert('Registration failed. Please try again.');
            },
        });
    };

    //     if (canRegister === null) {
    //         return <div>Loading...</div>;
    //     }
    //
    //     if (!canRegister) {
    //         return (
    //             <div>
    //                 Registration is not allowed. An admin user already exists.
    //             </div>
    //         );
    //     }

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
                <div>
                    <h2 className='text-center text-3xl font-extrabold text-gray-900'>
                        Create Admin Account
                    </h2>
                    <p className='mt-2 text-center text-sm text-gray-600'>
                        This is a one-time registration for the admin user.
                    </p>
                </div>
                <form
                    className='mt-8 space-y-6'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor='name'
                            className='block text-sm font-medium text-gray-700'>
                            Name
                        </label>
                        <Input
                            id='name'
                            type='text'
                            {...register('name')}
                            className='mt-1'
                            placeholder='Enter your name'
                        />
                        {errors.name && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'>
                            Email
                        </label>
                        <Input
                            id='email'
                            type='email'
                            {...register('email')}
                            className='mt-1'
                            placeholder='Enter your email'
                        />
                        {errors.email && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor='password'
                            className='block text-sm font-medium text-gray-700'>
                            Password
                        </label>
                        <Input
                            id='password'
                            type='password'
                            {...register('password')}
                            className='mt-1'
                            placeholder='Enter your password'
                        />
                        {errors.password && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label
                            htmlFor='confirmPassword'
                            className='block text-sm font-medium text-gray-700'>
                            Confirm Password
                        </label>
                        <Input
                            id='confirmPassword'
                            type='password'
                            {...register('confirmPassword')}
                            className='mt-1'
                            placeholder='Confirm your password'
                        />
                        {errors.confirmPassword && (
                            <p className='mt-1 text-sm text-red-600'>
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full'>
                            {isSubmitting
                                ? 'Creating Account...'
                                : 'Create Admin Account'}
                        </Button>
                    </div>
                    {registerUserMutation.isError && (
                        <p className='text-sm text-red-600 text-center'>
                            {registerUserMutation.error.message}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
