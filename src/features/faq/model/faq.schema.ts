import { z } from 'zod';

export const faqSchema = z.object({
    id: z.cuid().optional(),
    question: z.string().min(1, 'Question is required'),
    answer: z.string().min(1, 'Answer is required'),
});

export type FAQSchemaType = z.infer<typeof faqSchema>;
