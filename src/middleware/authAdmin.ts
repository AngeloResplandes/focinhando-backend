import { NextFunction, Request, Response } from "express";
import { getUserById } from "../services/user";

export const authAdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const userId = (req as any).userId;

    if (!userId) {
        res.status(401).json({ error: "Usuário não autenticado." });
        return;
    }

    const user = await getUserById(userId);

    if (!user) {
        res.status(404).json({ error: "Usuário não encontrado." });
        return;
    }

    if (user.role !== "admin") {
        res.status(403).json({ error: "Acesso negado. Requer permissão de administrador." });
        return;
    }
    next();
};