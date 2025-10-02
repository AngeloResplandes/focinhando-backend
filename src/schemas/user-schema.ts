import z from "zod";

export const userSchema = z.object({
    name: z.string().min(2, {
        message: 'O nome deve ter no mínimo 2 caracteres.'
    }),
    email: z.email({
        message: 'Por favor, insira um endereço de e-mail válido.'
    }),
    password: z.string().min(8, {
        message: 'A senha deve ter no mínimo 8 caracteres.'
    })
})