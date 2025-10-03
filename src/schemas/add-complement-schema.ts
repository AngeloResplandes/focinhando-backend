import z from "zod";

export const addComplementSchema = z.object({
    img: z.url({
        message: "Por favor, insira uma URL de imagem válida."
    }),
    phoneNumber: z.string().regex(/^\(?\d{2}\)?[\s-]?\d{4,5}-?\d{4}$/, {
        message: 'Formato de telefone inválido. Use (XX) XXXXX-XXXX.'
    }),

    city: z.string().min(2, {
        message: "O nome da cidade deve ter no mínimo 2 caracteres."
    }),

    state: z.string().min(2, {
        message: "O nome do estado deve ter no mínimo 2 caracteres."
    }),

    dateOfBirth: z.coerce.date({
        error: "A data de nascimento deve ser uma data válida."
    })
});