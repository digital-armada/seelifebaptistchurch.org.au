'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import * as statementActions from './actions';
import { StatementFormData } from './schemas';
import { Statement } from '@/src/generated/prisma'; // Import the correct Statement type
import { toast } from 'sonner';
// This ApiClient pattern is good, but for server actions, it's clearer to import them directly.
// Let's adapt to call the actions directly in the hooks.

export function useStatements() {
    return useQuery({
        queryKey: queryKeys.statements.lists(),
        queryFn: async () => {
            const result = await statementActions.getStatements();
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
    });
}

export function useStatement(id: string) {
    return useQuery({
        queryKey: queryKeys.statements.detail(id),
        queryFn: async () => {
            const result = await statementActions.getStatement(id);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        enabled: !!id,
    });
}

export function useCreateOrUpdateStatement() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: StatementFormData) =>
            statementActions.createOrUpdateStatement(data),
        onSuccess: (_data, _variables, _context) => {
            // Invalidate all queries related to statements to ensure data is fresh everywhere
            return queryClient.invalidateQueries({
                queryKey: queryKeys.statements.all,
            });
        },
        onError: error => {
            console.error('Mutation failed:', error);
            // Optionally show a toast notification here
        },
    });
}

export function useDeleteStatement() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => statementActions.deleteStatement(id),
        onSuccess: () => {
            return queryClient.invalidateQueries({
                queryKey: queryKeys.statements.all,
            });
        },
    });
}

export function useUpdateStatementOrder() {
    const queryClient = useQueryClient();
    const queryKey = queryKeys.statements.lists();

    return useMutation({
        mutationFn: statementActions.updateStatementOrder,
        // When the mutation is called, we optimistically update the UI.
        onMutate: async newOrder => {
            // Cancel any outgoing refetches so they don't overwrite our optimistic update.
            await queryClient.cancelQueries({ queryKey });

            // Snapshot the previous value.
            const previousStatements =
                queryClient.getQueryData<Statement[]>(queryKey);

            // Optimistically update to the new value.
            // Here, we trust the `newOrder` array reflects the visual change.
            if (previousStatements) {
                const updatedStatements = previousStatements
                    .map(stmt => {
                        const newOrderItem = newOrder.find(
                            item => item.id === stmt.id
                        );
                        return newOrderItem
                            ? {
                                  ...stmt,
                                  displayOrder: newOrderItem.displayOrder,
                              }
                            : stmt;
                    })
                    .sort((a, b) => a.displayOrder - b.displayOrder);

                queryClient.setQueryData(queryKey, updatedStatements);
            }

            // Return a context object with the snapshotted value.
            return { previousStatements };
        },
        // If the mutation fails, use the context returned from onMutate to roll back.
        onError: (_err, _newOrder, context) => {
            if (context?.previousStatements) {
                queryClient.setQueryData(queryKey, context.previousStatements);
            }
            toast.error('Failed to update statement order');
        },
        // Always refetch after the mutation is settled (success or error).
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey });
        },
        onSuccess: () => {
            toast.success('Statement order updated successfully');
        },
    });
}
