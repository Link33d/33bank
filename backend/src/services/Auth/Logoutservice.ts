import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";

class LogoutService 
{
    async execute(sessionId: string): Promise<HttpResponse<string>> {

        if (!sessionId) return badRequest("Unauthorized");
        try {
            
            const user = await UserModel.findOne({ 'sessions._id': sessionId });
            if (!user) return badRequest("Unauthorized");

            const sessionIndex = user.sessions.findIndex(session => session._id.toString() === sessionId.toString());
            if (sessionIndex === -1 || !user.sessions[sessionIndex].activated) return badRequest("Unauthorized");
            
            user.sessions[sessionIndex].activated = false;

            user.save();

            return ok("disconnected");
        } catch (err) {
            console.log(err)
            
            return serverError();
        }
    }
}

export { LogoutService }