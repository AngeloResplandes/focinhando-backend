import express, { type NextFunction, type Request, type Response } from "express";
import cors from "cors";
import { routes } from "./routes/main";
import helmet from "helmet";

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.static("public"));
server.use(express.json());

server.use(routes);
server.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).json({ error: "Erro Interno de Servidor" });
});

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado' });
});

const port = process.env.PORT || "4000";
const blue = '\x1b[34m';
const reset = '\x1b[0m';
server.listen(port, () => {
    console.log(`Servidor rodando com sucesso em ${blue}http://localhost:${port}/${reset}`);
});