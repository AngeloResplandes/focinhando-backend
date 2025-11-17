import { RequestHandler } from "express";
import { getPetsSchema } from "../schemas/get-pets-schema";
import {
    createPet,
    deletePetFromId,
    getAllPets,
    updatePetFromId
} from "../services/pet";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { postPetsSchema } from "../schemas/post-pets-schema";
import { Pet } from "../types/pet";
import { isUrl } from "../utils/is-url";

export const getPets: RequestHandler = async (req, res) => {
    const parseResult = getPetsSchema.safeParse(req.query);
    if (!parseResult.success) {
        res.status(400).json({ error: "Parâmetros inválidos" });
        return;
    }

    const filters = parseResult.data;
    const pets = await getAllPets(filters);
    const petsWithAbsoluteUrl = pets.map((pet: Pet) => ({
        ...pet,
        img: isUrl(pet.img) ? pet.img : getAbsoluteImageUrl(pet.img)
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
        String(parseResult.data.userComplementId),
        parseResult.data
    );
    if (!pet) {
        res.status(400).json({ error: "Ocorreu algum erro" });
        return;
    }
    pet.img = isUrl(pet.img) ? pet.img : getAbsoluteImageUrl(`media/pets/${pet.img}`);

    res.json({ error: null, pet });
}

export const updatePet: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const parseResult = postPetsSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const updatedPet = await updatePetFromId(id, parseResult.data);
    updatedPet.img = isUrl(updatedPet.img) ? updatedPet.img : getAbsoluteImageUrl(`media/pets/${updatedPet.img}`);

    if (!updatePet) {
        res.status(404).json({ error: "Pet não encontrado" });
        return;
    }

    res.json({ error: null, pet: updatedPet });
}

export const deletePet: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const ok = await deletePetFromId(id);
    if (!ok) {
        res.status(404).json({ error: "Pet não encontrado" });
        return;
    }

    res.json({ error: null, message: "Pet removido com sucesso" });
}