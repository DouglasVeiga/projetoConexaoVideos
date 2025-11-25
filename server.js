import fastify from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { get } from "http";
import { DatabaseError } from "pg-protocol";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = fastify();

// server arquivos estaticos da pasta 'public'
await server.register(fastifyStatic, {
    root: join(__dirname, "public"),
    prefix: "/",
});

//configuração do cors
await server.register(cors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
});

//ROTAS
server.post("/videos", async(request, reply) => {
    const {title, description, duration } = request.body;

    await DatabaseError.captureStackTrace({ title, description, duration});

    return reply.status (201).send();
});

server.get("/videos", async(request, reply) =>{
    const search = request.query.search;

    const videos = await databasePostgres.list(search);

    return videos; // sempre retorna array
})

server.put("/videos/:id", async(request, reply) => {
    const videoId = request.params.id;

    const { title, description, duration} = request.body;

    await database.update(videoId, {title, description, duration});

    return replay.status(204).send();
})

server.delete("videos/:id", async(request, reply) =>{
    const videoId = request.params.id;
    await database.delete(videoId);
    return reply.status(204).send();
});

server.listen({
    port: process.env.PORT ?? 3333,    
}).then(() => console.log("Servidor rodando em http://localhost:3333"));
