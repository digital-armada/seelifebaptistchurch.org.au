'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import { getFAQs, getFAQ, createFAQ, updateFAQ, deleteFAQ } from './actions';

export function useFAQs() {
    return useQuery({
        queryKey: queryKeys.faqs.lists(),
        queryFn: async () => {
            const result = await getFAQs();
            if (!result.success) throw new Error(result.error);
            return result.data || [];
        },
    });
}

export function useFAQ(id: string) {
    return useQuery({
        queryKey: queryKeys.faqs.detail(id),
        queryFn: async () => {
            const result = await getFAQ(id);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        enabled: !!id,
    });
}

export function useCreateFAQ() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createFAQ,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.faqs.all,
            });
        },
    });
}

export function useUpdateFAQ() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: { question?: string; answer?: string };
        }) => updateFAQ(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.faqs.all,
            });
        },
    });
}

export function useDeleteFAQ() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteFAQ,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.faqs.all,
            });
        },
    });
}
