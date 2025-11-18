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
            userComplementId: true,
            userComplement: {
                select: {
                    phoneNumber: true,
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    return pets.map((pet: any) => ({
        ...pet,
        img: `${pet.img}`,
        userName: pet.userComplement?.user?.name,
        phoneNumber: pet.userComplement?.phoneNumber,
        email: pet.userComplement?.user?.email
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

export const updatePetFromId = async (id: string, data: Pet) => {
    return await prisma.pet.update({
        where: { id },
        data
    });
}

export const deletePetFromId = async (id: string) => {
    return await prisma.pet.delete({
        where: { id }
    });
}