import z from "zod";

export const loginSchema = z.object({
    email: z.email({
        message: 'Por favor, insira um endereço de e-mail válido.'
    }),
    password: z.string().min(8, {
        message: 'A senha deve ter no mínimo 8 caracteres.'
    })
})