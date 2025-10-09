import { prisma } from "../libs/prisma";
import { Pet, PetFilters } from "../types/pet";

export const getAllPets = async (filters: PetFilters) => {
    const pets = await prisma.pet.findMany({
        where: filters,
        select: {
            id: true,
            name: true,
            img: true,
            age: true,
            city: true,
            state: true,
            sex: true,
            vaccinated: true,
            about: true,
            specie: true,
            race: true,
            weight: true,
            createdAt: true,
            updatedAt: true,
            userComplementId: true
        }
    });

    return pets.map(pet => ({
        ...pet,
        img: `media/pets/${pet.img}`
    }));
}

export const createPet = async (userComplementId: string, pet: Pet) => {
    return await prisma.pet.create({
        data: {
            ...pet,
            userComplementId,
        }
    });
}