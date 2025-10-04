import z from "zod";

export const addComplementSchema = z.object({
    img: z.url(),
    phoneNumber: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/),
    city: z.string().min(2),
    state: z.string().min(2),
    dateOfBirth: z.coerce.date()
});