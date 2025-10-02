import z from "zod";

const subjectOptions = [
    'Quero adotar um pet',
    'Quero cadatrar um pet',
    'Dúvidas gerais',
    'Sugestões',
    'Outro'
] as const;

export const contactSchema = z.object({
    fullName: z.string().min(2, {
        message: 'O nome completo deve ter no mínimo 2 caracteres.'
    }),
    email: z.email({
        message: 'Por favor, insira um endereço de e-mail válido.'
    }),
    phoneNumber: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
        message: 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.'
    }),
    subject: z.enum(subjectOptions, {
        message: 'Por favor, selecione um assunto válido.'
    }),
    message: z.string()
        .min(10, { message: 'A mensagem deve ter no mínimo 10 caracteres.' })
        .max(300, { message: 'A mensagem não pode exceder 300 caracteres.' })
})