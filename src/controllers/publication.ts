import { RequestHandler } from "express";
import {
    getAllPublications,
    createPublication,
    updatePublicationFromId,
    deletePublicationFromId
} from "../services/publication";
import { getAbsoluteImageUrlPublications } from "../utils/get-absolute-image-url";
import { publicationSchema } from "../schemas/publication-schema";
import { Publication } from "../types/publication";

export const getPublications: RequestHandler = async (req, res) => {
    const publications = await getAllPublications();
    if (!publications) {
        res.status(200).json({ error: "Ocorreu algum erro" });
        return;
    }

    const publicationsWithAbsoluteUrl = publications.map((publication: Publication) => ({
        ...publication,
        img: getAbsoluteImageUrlPublications(publication.img)
    }))

    res.json({ error: null, publications: publicationsWithAbsoluteUrl })
}

export const postPublication: RequestHandler = async (req, res) => {
    const parseResult = publicationSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const publication = await createPublication(parseResult.data);
    if (!publication) {
        res.status(400).json({ error: "Ocorreu algum erro" });
        return;
    }
    publication.img = getAbsoluteImageUrlPublications(`${publication.img}`);

    res.status(201).json({ error: null, publication });
}

export const putPublication: RequestHandler = async (req, res) => {
    const { id } = req.params;
    const parseResult = publicationSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const updated = await updatePublicationFromId(id, parseResult.data);
    updated.img = getAbsoluteImageUrlPublications(`${updated.img}`);
    if (!updated) {
        res.status(404).json({ error: "Publicação não encontrada" });
        return;
    }

    res.json({ error: null, publication: updated });
};

export const deletePublicationById: RequestHandler = async (req, res) => {
    const { id } = req.params;

    const ok = await deletePublicationFromId(id);
    if (!ok) {
        res.status(404).json({ error: "Publicação não encontrada" });
        return;
    }

    res.json({ error: null, message: "Publicação removida com sucesso" });
};