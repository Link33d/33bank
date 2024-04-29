import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteCustomerService } from "../services/DeleteCustomerService";

class DeleteCustomerController
{
    async handle(request: FastifyRequest, reply: FastifyReply) {

        const deleteCustomerService = new DeleteCustomerService();

        const { id } = request.body as {id: string};

        const costumer = deleteCustomerService.execute({ id });

        reply.send(costumer)

    }
}

export { DeleteCustomerController }