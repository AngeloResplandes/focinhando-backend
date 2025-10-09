import { z } from "zod";

export const postPetsSchema = z.object({
    name: z.string().min(2),
    img: z.string().min(2),
    age: z.coerce.date(),
    city: z.string().min(2),
    state: z.string().min(2),
    sex: z.string().min(2),
    vaccinated: z.boolean(),
    about: z.string().min(2),
    specie: z.string().min(2),
    race: z.string().min(2),
    weight: z.number().positive(),
    userComplementId: z.string()
});