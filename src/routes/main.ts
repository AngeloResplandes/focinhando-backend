import { Router } from "express";

export const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            name: "Focinhando - Backend",
            version: "v1",
            status: "operational"
        }
    })
})

routes.get("/ping", (req, res) => {
    res.json({ pong: true });
});