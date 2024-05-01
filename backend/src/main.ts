import Fastify from "fastify";
import cors from "@fastify/cors";
import { routes } from "./routes/index";
import { mongooseClient } from "./utils/mongoose";
import dotenv from 'dotenv'; 
dotenv.config();
const app = Fastify({ logger: true });

const start = async () => {

    app.setErrorHandler((error, request, reply) => {
        reply.code(400).send({ message: error.message})
    })

    new mongooseClient(process.env.DATABASE_URL!).connect();

    await app.register(cors);
    await app.register(routes);
    
    try {
        await app.listen({ port: 3333 });
    } catch (e) {
        process.exit(1);
    }

} 

start();