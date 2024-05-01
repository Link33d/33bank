import { LoginService } from "../../services/Auth/LoginService";
import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse,ok } from "../../utils/HttpHelper";
import validator from "validator";

class LoginController 
{
    async handle(user: HttpAuthBody): Promise<HttpResponse<string>> {
        
        if (!user) return badRequest(`Field email is required`)

        const requiredFields = ["email", "password", "userIp"];

        for (const field of requiredFields) {
            if (!user[field as keyof HttpAuthBody]) {
                return badRequest(`Field ${field} is required`);
            }
        }

        const emailIsValid = validator.isEmail(user.email);

        if (!emailIsValid) return badRequest("E-mail is invalid");

        const loginService = new LoginService();

        const newUser = await loginService.execute(user);

        return newUser; 
    }
}

export { LoginController }