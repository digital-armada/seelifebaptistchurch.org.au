'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    serviceTimesSchema,
    type ServiceTimeSchemaType,
} from '../model/service-times.schema';
import { useCreateService, useUpdateService } from '../queries';
import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import { ServiceTime, DayOfWeek } from '../types';

interface ServiceTimesFormProps {
    service?: ServiceTime | null;
    onSuccess?: () => void;
}

const toDateTimeLocal = (date: Date): string => {
    try {
        const ten = (i: number) => (i < 10 ? '0' : '') + i;
        const YYYY = date.getFullYear();
        const MM = ten(date.getMonth() + 1);
        const DD = ten(date.getDate());
        const HH = ten(date.getHours());
        const mm = ten(date.getMinutes());
        return `${YYYY}-${MM}-${DD}T${HH}:${mm}`;
    } catch (e) {
        return ''; // Gracefully handle invalid dates
    }
};

export function ServiceTimesForm({
    service,
    onSuccess,
}: ServiceTimesFormProps) {
    const createService = useCreateService();
    const updateService = useUpdateService();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(serviceTimesSchema),
        // This is correct: use nullish coalescing to provide empty strings for null DB values.
        defaultValues: {
            name: service?.name ?? '',
            description: service?.description ?? '',
            day: service?.day ?? 'SUNDAY',
            time: service?.time ?? '',
        },
    });

    // FIX: Explicitly type the handler with SubmitHandler for full compatibility
    const onSubmit: SubmitHandler<ServiceTimeSchemaType> = async data => {
        // FIX: Create a payload where the empty string for `description` is
        // converted back to `undefined` for the database.
        const payload = {
            ...data,
            description: data.description === '' ? undefined : data.description,
        };

        try {
            if (service) {
                // `payload` now perfectly matches the `updateService` expectation
                await updateService.mutateAsync({
                    id: service.id,
                    data: payload,
                });
            } else {
                // `payload` also perfectly matches the `createService` expectation
                await createService.mutateAsync(payload);
            }
            onSuccess?.();
        } catch (error) {
            console.error('Error saving service:', error);
        }
    };

    const isPending = createService.isPending || updateService.isPending;

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div>
                <label htmlFor='name'>Service Name</label>
                <Input
                    id='name'
                    {...register('name')}
                    placeholder='e.g., Sunday Morning Worship'
                />
                {errors.name && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.name.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='description'>Description (Optional)</label>
                <Textarea
                    id='description'
                    {...register('description')}
                    placeholder='e.g., A time of worship, prayer, and preaching.'
                />
                {errors.description && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.description.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='day'>Day of the Week</label>
                <select
                    id='day'
                    {...register('day')}
                    className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'>
                    <option value='SUNDAY'>Sunday</option>
                    <option value='MONDAY'>Monday</option>
                    <option value='TUESDAY'>Tuesday</option>
                    <option value='WEDNESDAY'>Wednesday</option>
                    <option value='THURSDAY'>Thursday</option>
                    <option value='FRIDAY'>Friday</option>
                    <option value='SATURDAY'>Saturday</option>
                </select>
                {errors.day && (
                    <p className='text-sm text-red-600 mt-1'>
                        {errors.day.message}
                    </p>
                )}
            </div>
            <div>
                <label htmlFor='time'>Service Time</label>
                <Input
                    id='time'
                    type='text'
                    placeholder='e.g., Sunday 10:00 AM'
                    {...register('time')}
                />
                {errors.time && (
                    <p className='text-sm text-red-600 mt-1'>
                        {String(errors.time.message)}
                    </p>
                )}
            </div>
            <Button type='submit' disabled={isPending}>
                {isPending
                    ? 'Saving...'
                    : service
                    ? 'Update Service'
                    : 'Create Service'}
            </Button>
        </form>
    );
}
