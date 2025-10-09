import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/user";

export const authAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = (req as any).userId;

    if (!userId) {
        return res.status(401).json({ error: "Usuário não autenticado." });
    }

    const user = await getUserById(userId);

    if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
    }

    if (user.role !== "admin") {
        return res.status(403).json({ error: "Acesso negado. Requer permissão de administrador." });
    }
    next();
};