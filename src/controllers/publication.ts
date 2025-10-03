import { RequestHandler } from "express";
import { getAllPublications, createPublication } from "../services/publication";
import { getAbsoluteImageUrl } from "../utils/get-absolute-image-url";
import { publicationSchema } from "../schemas/publication-schema";

export const getPublications: RequestHandler = async (req, res) => {
    const publications = await getAllPublications();
    if (!publications) {
        res.status(200).json({ error: "Ocorreu algum erro" })
    }

    const publicationsWithAbsoluteUrl = publications.map(publication => ({
        ...publication,
        img: getAbsoluteImageUrl(publication.img)
    }))

    res.json({ error: null, publications: publicationsWithAbsoluteUrl })
}

export const postPublication: RequestHandler = async (req, res) => {
    const parseResult = publicationSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({ error: "Dados inválidos" });
    }

    try {
        const publication = await createPublication(parseResult.data);
        publication.img = getAbsoluteImageUrl(`media/publications/${publication.img}`);
        res.status(201).json({ error: null, publication });
    } catch (error) {
        res.status(500).json({ error: "Erro ao criar publicação" });
    }
}