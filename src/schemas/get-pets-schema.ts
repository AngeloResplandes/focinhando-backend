import z from "zod";

export const getPetsSchema = z.object({
    sex: z.string().optional(),
    specie: z.string().optional(),
    race: z.string().optional()
})