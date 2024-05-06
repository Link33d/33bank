import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { RegisterController } from "../controllers/Auth/RegisterController";
import { HttpAuthBody } from "../utils/HttpBody";
import { LoginController } from "../controllers/Auth/LoginController";
import { serverError } from "../utils/HttpHelper";
import { LogoutController } from "../controllers/Auth/LogoutController";
import { request } from "http";
import { CheckService } from "../services/Auth/CheckService";
import { CheckController } from "../controllers/Auth/CheckController";

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.post("/register", async (request: FastifyRequest, reply: FastifyReply) => { 
        
        try {
            const registerController = new RegisterController();
            const { body, statusCode } = await registerController.handle(request.body as HttpAuthBody);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            console.log(err)

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
            console.log(err)

            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }

    })

    fastify.delete("/logout", async (request: FastifyRequest, reply: FastifyReply) => {

        try {
            const logoutController = new LogoutController();
            const { body, statusCode } = await logoutController.handle(request.headers["authorization"]);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            console.log(err)

            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }

    })

    fastify.post("/check", async (request: FastifyRequest, reply: FastifyReply) => {
        try {

            const checkController = new CheckController();
            const { body, statusCode } = await checkController.handle(request.body);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            console.log(err)

            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }
    })
}