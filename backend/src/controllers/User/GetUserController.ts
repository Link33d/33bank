import { GetUserService } from "../../services/User/GetUserService";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";

class GetUserController 
{
    async handle(username: string): Promise<HttpResponse<string>> {
        
        if (!username) return badRequest(`Parameter \`username\` is required`)

        const createService = new GetUserService();

        const newUser = await createService.execute(username);

        return newUser; 
    }
}

export { GetUserController }