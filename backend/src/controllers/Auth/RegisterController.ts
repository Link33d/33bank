import { RegisterService } from "../../services/Auth/RegisterService";
import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";
import validator from "validator";

class RegisterController 
{
    async handle(user: HttpAuthBody): Promise<HttpResponse<string>> {
        
        if (!user) return badRequest(`Field email is required`)

        const requiredFields = ["email", "displayName", "username", "password"];

        for (const field of requiredFields) {
            if (!user[field as keyof HttpAuthBody]) {
                return badRequest(`Field ${field} is required`);
            }
        }

        const emailIsValid = validator.isEmail(user.email);

        if (!emailIsValid) return badRequest("E-mail is invalid");

        const createService = new RegisterService();

        const newUser = await createService.execute(user);

        return newUser; 
    }
}

export { RegisterController }