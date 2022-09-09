import * as z from 'zod';

// Validation Schema

export const User = z.object({
    userName: z.string().min(3),
    firstName: z.string().min(1),
    surName: z.string().min(3),
    email: z.string().min(5),
    phoneNumber: z.number().min(9).max(9),
    country: z.string(),
});

// Creating interface for User
export type User = z.infer<typeof User>;