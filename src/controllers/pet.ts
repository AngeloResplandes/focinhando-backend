import { RequestHandler } from "express";
import { getPetsSchema } from "../schemas/get-pets-schema";
import { createPet, getAllPets } from "../services/pet";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { postPetsSchema } from "../schemas/post-pets-schema";

export const getPets: RequestHandler = async (req, res) => {
    const parseResult = getPetsSchema.safeParse(req.query);
    if (!parseResult.success) {
        res.status(400).json({ error: "Parâmetros inválidos" });
        return;
    }

    const filters = parseResult.data;
    const pets = await getAllPets(filters);
    const petsWithAbsoluteUrl = pets.map(pet => ({
        ...pet,
        img: getAbsoluteImageUrl(pet.img)
    }))

    res.json({ error: null, pets: petsWithAbsoluteUrl });
}

export const postPets: RequestHandler = async (req, res) => {
    const parseResult = postPetsSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const pet = await createPet(
        parseResult.data.userComplementId,
        parseResult.data
    );
    if (!pet) {
        res.status(400).json({ error: "Ocorreu algum erro" });
        return;
    }
    pet.img = getAbsoluteImageUrl(`media/pets/${pet.img}`);

    res.json({ error: null, pet });
}