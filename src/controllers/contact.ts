import { RequestHandler } from "express";
import { contactSchema } from "../schemas/contact-schema";
import { createContact } from "../services/contact";

export const register: RequestHandler = async (req, res) => {
    const result = contactSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const { fullName, email, phoneNumber, subject, message } = result.data;

    const contact = await createContact(
        fullName,
        email,
        phoneNumber,
        subject,
        message);
    if (!contact) {
        res.status(400).json({ error: "E-mail já cadastrado" });
        return
    }

    res.status(201).json({ error: null, contact });
}