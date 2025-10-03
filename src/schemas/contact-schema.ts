import z from "zod";

const subjectOptions = [
    'Quero adotar um pet',
    'Quero cadatrar um pet',
    'Dúvidas gerais',
    'Sugestões',
    'Outro'
] as const;

export const contactSchema = z.object({
    fullName: z.string().min(2),
    email: z.email(),
    phoneNumber: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/),
    subject: z.enum(subjectOptions),
    message: z.string().min(10).max(300)
})