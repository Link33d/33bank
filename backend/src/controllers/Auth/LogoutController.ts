import { LogoutService } from "../../services/Auth/Logoutservice";
import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse,ok } from "../../utils/HttpHelper";
import validator from "validator";
import jsonwebtoken from "jsonwebtoken";

class LogoutController 
{
    async handle(authorizationHeader: string | any): Promise<HttpResponse<string>> {
        
        const token = authorizationHeader && authorizationHeader.split(" ")[1];

        if (!token) return badRequest("Unauthorized");

        const secret: string | any = process.env.SECRET;
        if (!secret) throw "Secret not found"

        try {
            let session = jsonwebtoken.verify(token, secret);
            if (typeof session === 'string') {
                return badRequest("Unauthorized");
            }

            const logoutService = new LogoutService();

            const newUser = await logoutService.execute(session.id);

            return newUser; 
        } catch(err) {
            return badRequest("Unauthorized")
        }
    }
}

export { LogoutController }