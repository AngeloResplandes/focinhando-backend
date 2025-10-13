import { prisma } from "../libs/prisma"
import { Publication } from "../types/publication"

export const getAllPublications = async () => {
    const publications = await prisma.publication.findMany({
        select: {
            id: true,
            title: true,
            topic: true,
            img: true,
            text: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return publications.map((publication: Publication) => ({
        ...publication,
        img: `media/publications/${publication.img}`
    }));
}

export const createPublication = async (data: Publication) => {
    const publication = await prisma.publication.create({
        data
    });
    return publication;
}