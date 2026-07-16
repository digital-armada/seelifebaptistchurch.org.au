'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterUser } from '../queries';
import { createUserSchema, CreateUserFormValues } from '../model/user.schema';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';

export function CreateUserForm() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateUserFormValues>({
        resolver: zodResolver(createUserSchema),
    });

    const registerUserMutation = useRegisterUser();

    const onSubmit = (data: CreateUserFormValues) => {
        registerUserMutation.mutate(data, {
            onSuccess: () => {
                reset();
                // Optionally show a success toast here
            },
            // onError is handled globally in the useMutation hook
        });
    };

    const isPending = isSubmitting || registerUserMutation.isPending;

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 max-w-md p-4 border rounded-lg'>
            <h3 className='text-lg font-semibold'>Create a New User</h3>
            <div>
                <label htmlFor='name'>Name</label>
                <Input
                    id='name'
                    {...register('name')}
                    placeholder='John Doe'
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <Input
                    id='email'
                    type='email'
                    {...register('email')}
                    placeholder='user@example.com'
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='password'>Password</label>
                <Input
                    id='password'
                    type='password'
                    {...register('password')}
                    aria-invalid={!!errors.password}
                />
                {errors.password && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='confirmPassword'>Confirm Password</label>
                <Input
                    id='confirmPassword'
                    type='password'
                    {...register('confirmPassword')}
                    aria-invalid={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {registerUserMutation.isError && (
                <p className='text-sm text-red-600 mt-1'>
                    {registerUserMutation.error.message}
                </p>
            )}

            <Button type='submit' disabled={isPending}>
                {isPending ? 'Creating User...' : 'Create User'}
            </Button>
        </form>
    );
}
