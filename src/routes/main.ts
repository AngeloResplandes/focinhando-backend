import { Router } from "express";
import * as contactController from "../controllers/contact";
import * as petController from "../controllers/pet";
import * as publicationController from "../controllers/publication";
import * as userController from "../controllers/user";
import { authMiddleware } from "../middleware/auth";
import { authAdminMiddleware } from "../middleware/authAdmin";

export const routes = Router();

const adminOnly = [authMiddleware, authAdminMiddleware];

routes.get("/", (req, res) => {
    res.json({
        success: true,
        data: {
            name: "Focinhando - Backend",
            version: "v1",
            status: "finished"
        }
    });
});

routes.get('/ping', (req, res) => res.json({ pong: true }));

const contactRouter = Router();
contactRouter.post("/register", contactController.register);
contactRouter.get("/all-contacts", ...adminOnly, contactController.getContact);
contactRouter.get("/", ...adminOnly, contactController.getContactsPaginated);
routes.use("/contact", contactRouter);

const petRouter = Router();
petRouter.post("/register", ...adminOnly, petController.postPets);
petRouter.get("/", petController.getPets);
petRouter.put("/:id", ...adminOnly, petController.updatePet);
petRouter.delete("/:id", ...adminOnly, petController.deletePet);
routes.use("/pets", petRouter);

const publicationRouter = Router();
publicationRouter.post("/register", ...adminOnly, publicationController.postPublication);
publicationRouter.get("/all-publications", publicationController.getPublications);
publicationRouter.put("/:id", ...adminOnly, publicationController.putPublication);
publicationRouter.delete("/:id", ...adminOnly, publicationController.deletePublicationById);
routes.use("/publication", publicationRouter);

const userRouter = Router();
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/", authMiddleware, userController.getUserData);
userRouter.post("/complement", authMiddleware, userController.addComplement);
userRouter.get("/complement", authMiddleware, userController.getComplement);
userRouter.put("/complement", authMiddleware, userController.updateComplement);
userRouter.delete("/remove", authMiddleware, userController.deleteUser);
routes.use("/user", userRouter);