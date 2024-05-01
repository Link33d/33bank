import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import authRoute from "./auth";
import userRoute from "./user";


export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
        return { online: true}
    })

    fastify.register(authRoute, {prefix: "/auth"})

    fastify.register(userRoute, {prefix: "/user"})

    /* fastify.post("/costumer", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateCustomerController().handle(request, reply);
    })

    fastify.get("/costumers", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListCustomerController().handle(request, reply);
    })

    fastify.delete("/costumer", new DeleteCustomerController().handle); */

}