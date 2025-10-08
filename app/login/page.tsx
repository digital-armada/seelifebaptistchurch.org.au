'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authClient } from '@/src/components/auth-provider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    useEffect(() => {
        const checkSession = async () => {
            const session = await authClient.getSession();
            if (session.data) {
                router.push('/dashboard');
            }
        };
        checkSession();
    }, [router]);

    const onSubmit = async (data: LoginFormValues) => {
        try {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
            });
            router.push('/dashboard');
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed. Please check your credentials.');
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center bg-gray-50'>
            <div className='max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md'>
                <div>
                    <h2 className='text-center text-3xl font-extrabold text-gray-900'>
                        Sign in to your account
                    </h2>
                </div>
                <form
                    className='mt-8 space-y-6'
                    onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label
                            htmlFor='email'
                            className='block text-sm font-medium text-gray-700'>
                            Email address
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
                        <Button
                            type='submit'
                            disabled={isSubmitting}
                            className='w-full'>
                            {isSubmitting ? 'Signing in...' : 'Sign in'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
