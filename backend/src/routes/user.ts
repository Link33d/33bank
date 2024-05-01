import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { serverError } from "../utils/HttpHelper";
import { GetUserController } from "../controllers/User/GetUserController";

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/:username", async (request: FastifyRequest<{ Params: { username: string } }>, reply: FastifyReply) => { 
        
        try {

            const getUserController = new GetUserController();
            const { body, statusCode } = await getUserController.handle(request.params?.username);

            reply.code(statusCode).send(body)
            
        } catch (err) {
            const { body, statusCode } = serverError();

            reply.code(statusCode).send(body)
        }

    })

}