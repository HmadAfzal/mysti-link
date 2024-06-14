import {z} from 'zod'

export const messageSchema = z.object({
    content: z.string()
    .min(5, 'content must be atleast of 5 chrachters')
    .max(300, 'content must be no longer than 300 chrachters')
})