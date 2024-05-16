import { GetService } from "../../services/User/GetService";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";

class GetController 
{
    async handle(params: string[]): Promise<HttpResponse<string>> {
        

        if (!["email", "username", "id"].includes(params[0])) return badRequest(`Parameter \`type\` is unknown`)
        if (!params[1]) return badRequest(`Parameter \`username\` is required`)
        
        if (params[0] == "id") params[0] = "_id"

        const newUser = await new GetService().execute(params);

        return newUser; 
    }
}

export { GetController }