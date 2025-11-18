import { RequestHandler } from "express";
import { getPetsSchema } from "../schemas/get-pets-schema";
import {
    createPet,
    deletePetFromId,
    getAllPets,
    updatePetFromId
} from "../services/pet";
import { getAbsoluteImageUrlPets } from "../utils/get-absolute-image-url";
import { postPetsSchema } from "../schemas/post-pets-schema";
import { postUserPetSchema } from "../schemas/post-user-pet-schema";
import { Pet } from "../types/pet";
import { getComplementFromUserId } from "../services/user";

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
        img: getAbsoluteImageUrlPets(pet.img)
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
    pet.img = getAbsoluteImageUrlPets(pet.img);

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
    updatedPet.img = getAbsoluteImageUrlPets(updatedPet.img);

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

export const postUserPet: RequestHandler = async (req, res) => {
    const parseResult = postUserPetSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const userId = (req as any).userId;
    if (!userId) {
        res.status(401).json({ error: "Usuário não autenticado" });
        return;
    }

    const userComplement = await getComplementFromUserId(userId);
    if (!userComplement) {
        res.status(400).json({ error: "Usuário não possui perfil completo. Complete seu perfil antes de cadastrar um pet." });
        return;
    }

    const pet = await createPet(
        userComplement.id,
        parseResult.data
    );
    if (!pet) {
        res.status(400).json({ error: "Ocorreu algum erro ao cadastrar o pet" });
        return;
    }
    pet.img = getAbsoluteImageUrlPets(pet.img);

    res.json({ error: null, pet });
}
