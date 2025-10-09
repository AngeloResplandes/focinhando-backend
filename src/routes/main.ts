import { Router } from "express";
import * as contactController from "../controllers/contact";
import * as petController from "../controllers/pet";
import * as publicationController from "../controllers/publication";
import * as userController from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { authAdminMiddleware } from "../middleware/authAdmin";

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

routes.get('/ping', (req, res) => res.json({ pong: true }));

routes.post("/contact/register", authMiddleware, contactController.register);
routes.get("/contact/all-contacts", authMiddleware, authAdminMiddleware, contactController.getContact);
routes.get("/contact", authMiddleware, authAdminMiddleware, contactController.getContactsPaginated);
routes.post("/pets/register", authMiddleware, authAdminMiddleware, petController.postPets);
routes.get("/pets", petController.getPets);
routes.post("/publication/register", authMiddleware, authAdminMiddleware, publicationController.postPublication);
routes.get("/publication/all-publications", publicationController.getPublications);
routes.post("/user/register", userController.register);
routes.post("/user/login", userController.login);
routes.post("/user/complement", authMiddleware, userController.addComplement);
routes.get("/user/complement", authMiddleware, userController.getComplement);