'use client';

import { useMutation } from '@tanstack/react-query';
import { sendContactMessageAction } from './actions';

export function useSendContactMessage() {
    return useMutation({
        mutationFn: sendContactMessageAction,
    });
}
