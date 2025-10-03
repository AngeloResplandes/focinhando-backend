import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { routes } from "./routes/main.js";

const server = express();

server.use(cors());
server.use(express.static("public"));
server.use(express.json());

server.use(routes);
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || "4000";
const blue = '\x1b[34m';
const reset = '\x1b[0m';
server.listen(port, () => {
    console.log(`Servidor rodando com sucesso em ${blue}http://localhost:${port}/${reset}`);
});