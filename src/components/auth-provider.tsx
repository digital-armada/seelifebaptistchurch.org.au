// FILE: src/components/auth-provider.tsx

'use client';

import { createAuthClient } from 'better-auth/react';

export const authClient = createAuthClient({
    // Use the publicly exposed environment variable.
    // It's better to fail explicitly if it's not set than to fall back to localhost in prod.
    baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
