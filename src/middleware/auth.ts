import { NextFunction, Request, Response } from "express";

export const authMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.status(401).json({ error: "Acesso negado" });
        return;
    }
    const tokenSplit = authHeader.split("Bearer ");
    if (!tokenSplit[1]) {
        res.status(401).json({ error: "Acesso negado" });
        return;
    }

    const token = tokenSplit[1];

}