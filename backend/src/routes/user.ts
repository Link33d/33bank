import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { badRequest, serverError } from "../utils/HttpHelper";
import { GetController } from "../controllers/User/GetController";
import jsonwebtoken from "jsonwebtoken";
import { User, UserModel } from "../models/User";
import { PaymentController } from "../controllers/User/PaymentController";
import { UpdateController } from "../controllers/User/UpdateController";

interface UserFastifyRequest extends FastifyRequest {
    user?: User; // Defina o tipo do usuário conforme necessário
}

const authMiddleware = async (request: UserFastifyRequest, reply: FastifyReply, next: () => void) => {
    let sendBad = (err: string) =>{

        const { statusCode, body} = badRequest(err);

        reply.code(statusCode).send(body)

    }
    
    try {
        const authorizationHeader = request.headers["authorization"];
        const token = authorizationHeader && authorizationHeader.split(" ")[1];

        if (!token) {
            return sendBad("Unauthorized");
        }

        const secret: string | undefined = process.env.SECRET;
        if (!secret) {
            return sendBad("Unauthorized");
        }

        let session: any;
        try {
            session = jsonwebtoken.verify(token, secret);
        } catch (err) {
            return sendBad("Unauthorized");
        }

        if (typeof session !== 'object' || !session.id) {
            return sendBad("Unauthorized");
        }

        const sessionId = session.id;
        const user = await UserModel.findOne({ 'sessions._id': sessionId });
        if (!user) {
            return sendBad("Unauthorized");
        }
        
        const sessionIndex = user.sessions.findIndex((session: any) => session._id.toString() === sessionId.toString());
        if (sessionIndex === -1 || !user.sessions[sessionIndex].activated) {
            return sendBad("Unauthorized");
        }

        request.user = user;
        next();
    } catch (err) {
        console.error(err);

        const { statusCode, body} = serverError();

        reply.code(statusCode).send(body);

    }
};

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {
    /* fastify.get<{ Params: { username: string } }>("/getbyusername/:username", { preHandler: authMiddleware }, async (request, reply) => {
        try {
            const getUserController = new GetUserController();
            const { body, statusCode } = await getUserController.handle(request.params.username);
            reply.code(statusCode).send(body);
        } catch (err) {
            const { body, statusCode } = serverError();
            reply.code(statusCode).send(body);
        }
    }); */

    fastify.get<{ Params: { type: string, value: string } }>("/getby:type/:value", { preHandler: authMiddleware }, async (request, reply) => {
        try {
            const { body, statusCode } = await new GetController().handle([request.params.type, request.params.value]);
            reply.code(statusCode).send(body);
        } catch (err) {
            const { body, statusCode } = serverError();
            reply.code(statusCode).send(body);
        }
    });

    fastify.post("/payment", { preHandler: authMiddleware }, async (request: UserFastifyRequest, reply: FastifyReply) => {
        try {

            if (!request.user) {
                const { statusCode, body} = badRequest("Unauthorized");

                reply.code(statusCode).send(body)
                return;
            }

            const { body, statusCode } = await new PaymentController().handle(request.user, request.body);

            reply.code(statusCode).send(body)
        } catch (err) {
            console.log(err)
            const { body, statusCode } = serverError();
            reply.code(statusCode).send(body);
        };
    });

    fastify.post("/update", { preHandler: authMiddleware }, async (request: UserFastifyRequest, reply: FastifyReply) => {
        try {

            if (!request.user) {
                const { statusCode, body} = badRequest("Unauthorized");

                reply.code(statusCode).send(body)
                return;
            }

            const { body, statusCode } = await new UpdateController().handle(request.user, request.body);

            reply.code(statusCode).send(body)
        } catch (err) {
            console.log(err)
            const { body, statusCode } = serverError();
            reply.code(statusCode).send(body);
        };
    });
}
