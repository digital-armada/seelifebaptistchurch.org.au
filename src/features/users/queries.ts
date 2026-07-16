'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { getUsers, updateUser, deleteUser } from './actions';
import { registerUserAction } from '@/src/features/auth/actions';
import { CreateUserFormValues } from './model/user.schema';
import { toast } from 'sonner';

export function useUsers() {
    return useQuery({
        queryKey: queryKeys.users.lists(),
        queryFn: async () => {
            const result = await getUsers();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    });
}

// 10x IMPROVEMENT: This hook now correctly handles server action responses.
export function useRegisterUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: CreateUserFormValues) => {
            const result = await registerUserAction(data);

            // If the server action indicates failure, we THROW an error.
            // This is what tells React Query the mutation has failed.
            if (!result.success) {
                throw new Error(result.error || 'An unknown error occurred.');
            }

            return result.data; // Return the successful data
        },
        onSuccess: () => {
            toast.success(
                'Admin user created successfully. You can now log in.'
            );
            // Invalidate the users list to refetch if needed elsewhere
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.lists(),
            });
        },
        onError: (error: Error) => {
            // Now, this will correctly fire and we can show a toast.
            toast.error(`Registration Failed: ${error.message}`);
            console.error('Registration failed:', error.message);
        },
    });
}

export function useUpdateUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: { name?: string; email?: string; role?: string };
        }) => updateUser(id, data),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.lists(),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.users.detail(variables.id),
            });
        },
    });
}

export function useDeleteUser() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
        },
    });
}
