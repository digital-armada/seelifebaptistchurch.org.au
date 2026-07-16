import { z } from 'zod';

const dayOfWeekEnum = z.enum(['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']);

export const serviceTimesSchema = z.object({
    id: z.cuid().optional(),
    name: z.string().min(1, 'Service name is required'),
    // FIX: Use .optional() to produce `string | undefined`, which aligns with Prisma's update types
    // and form handling. We'll still send `null` to the DB if the field is empty.
    description: z.string().optional(),
    day: dayOfWeekEnum,
    time: z.string().min(1, 'Service time is required'),
});

export type ServiceTimeSchemaType = z.infer<typeof serviceTimesSchema>;
