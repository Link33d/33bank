import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { badRequest, serverError } from "../utils/HttpHelper";
import { GetUserController } from "../controllers/User/GetUserController";
import jsonwebtoken from "jsonwebtoken";
import { UserModel } from "../models/User";

const authMiddleware = async (request: FastifyRequest, reply: FastifyReply, next: () => void) => {
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

        next();
    } catch (err) {
        console.error(err);

        const { statusCode, body} = serverError();

        reply.code(statusCode).send(body);

    }
};

export default async function (fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get<{ Params: { username: string } }>("/:username", { preHandler: authMiddleware }, async (request, reply) => {
        try {
            const getUserController = new GetUserController();
            const { body, statusCode } = await getUserController.handle(request.params.username);
            reply.code(statusCode).send(body);
        } catch (err) {
            const { body, statusCode } = serverError();
            reply.code(statusCode).send(body);
        }
    });
}
