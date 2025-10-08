'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import {
    getServices,
    getService,
    createService,
    updateService,
    deleteService,
} from './actions';

export function useServices() {
    return useQuery({
        queryKey: queryKeys.serviceTimes.lists(),
        queryFn: async () => {
            const result = await getServices();
            if (!result.success) throw new Error(result.error);
            return result.data || [];
        },
    });
}

export function useService(id: string) {
    return useQuery({
        queryKey: queryKeys.serviceTimes.detail(id),
        queryFn: async () => {
            const result = await getService(id);
            if (!result.success) throw new Error(result.error);
            return result.data;
        },
        enabled: !!id,
    });
}

export function useCreateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.serviceTimes.all,
            });
        },
    });
}

export function useUpdateService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            id,
            data,
        }: {
            id: string;
            data: { name?: string; description?: string | null; day?: string; time?: string };
        }) => updateService(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.serviceTimes.all,
            });
        },
    });
}

export function useDeleteService() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteService,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: queryKeys.serviceTimes.all,
            });
        },
    });
}
