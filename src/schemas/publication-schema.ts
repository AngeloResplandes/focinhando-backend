import { z } from "zod";

export const publicationSchema = z.object({
    title: z.string().min(1),
    topic: z.string().min(1),
    img: z.string().min(1),
    text: z.string().min(1)
});