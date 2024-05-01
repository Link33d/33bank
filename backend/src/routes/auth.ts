import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { RegisterController } from "../controllers/Auth/RegisterController";
import { HttpAuthBody } from "../utils/HttpBody";
import { LoginController } from "../controllers/Auth/LoginController";
import { serverError } from "../utils/HttpHelper";

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => { 
        
        try {
            const registerController = new RegisterController();
            const { body, statusCode } = await registerController.handle(request.body as HttpAuthBody);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }

    })

    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => { 
        
        try {
            const loginController = new LoginController();
            const { body, statusCode } = await loginController.handle(request.body as HttpAuthBody);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }

    })
}