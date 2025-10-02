import { RequestHandler } from "express";
import { userSchema } from "../schemas/user-schema";
import { createUser, logUser } from "../services/user";
import { loginSchema } from "../schemas/login-schema";

export const register: RequestHandler = async (req, res) => {
    const result = userSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const { name, email, password } = result.data;

    const user = await createUser(name, email, password);
    if (!user) {
        res.status(400).json({ error: "E-mail já cadastrado" });
        return
    }

    res.status(201).json({ error: null, user });
}

export const login: RequestHandler = async (req, res) => {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        res.status(400).json({ error: "Dados inválidos" });
        return;
    }

    const { email, password } = result.data;

    const token = await logUser(email, password);
    if (!token) {
        res.status(401).json({ error: "Acesso negado" });
        return
    }

    res.json({ error: null, token });
}