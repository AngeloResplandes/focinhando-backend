import { Router } from "express";
import * as contactController from "../controllers/contact";
import * as userController from "../controllers/user";
import { authMiddleware } from "../middleware/auth";

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
routes.post("/user/login", userController.login);
routes.post("/user/complement", authMiddleware, userController.addComplement);
routes.get("/user/complement", authMiddleware, userController.getComplement);