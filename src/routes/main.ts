import { Router } from "express";
import * as contactController from "../controllers/contact";
import * as userController from "../controllers/user";

export const routes = Router();

routes.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            name: "Focinhando - Backend",
            version: "v1",
            status: "operational"
        }
    });
});

routes.get("/ping", (req, res) => {
    res.json({ pong: true });
});

routes.post("/contact/register", contactController.register);
routes.post("/user/register", userController.register);