export const queryKeys = {
    users: {
        all: ['users'] as const,
        lists: () => [...queryKeys.users.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.users.lists(), { filters }] as const,
        details: () => [...queryKeys.users.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.users.details(), id] as const,
    },
    statements: {
        all: ['statements'] as const,
        lists: () => [...queryKeys.statements.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.statements.lists(), { filters }] as const,
        details: () => [...queryKeys.statements.all, 'detail'] as const,
        detail: (id: string) =>
            [...queryKeys.statements.details(), id] as const,
    },
    serviceTimes: {
        all: ['service-times'] as const,
        lists: () => [...queryKeys.serviceTimes.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.serviceTimes.lists(), { filters }] as const,
        details: () => [...queryKeys.serviceTimes.all, 'detail'] as const,
        detail: (id: string) =>
            [...queryKeys.serviceTimes.details(), id] as const,
    },
    faqs: {
        all: ['faqs'] as const,
        lists: () => [...queryKeys.faqs.all, 'list'] as const,
        list: (filters: Record<string, unknown>) =>
            [...queryKeys.faqs.lists(), { filters }] as const,
        details: () => [...queryKeys.faqs.all, 'detail'] as const,
        detail: (id: string) => [...queryKeys.faqs.details(), id] as const,
    },
} as const;
