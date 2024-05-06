import validator from "validator";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";
import { CheckService } from "../../services/Auth/CheckService";

class CheckController
{
    async handle(body: any): Promise<HttpResponse<string>> {

        if (!body?.type) return badRequest("Field `type` is required")
        if (!body?.value) return badRequest("Field `value` is required")
        
        body.type = body.type.toString().toLowerCase()
        body.value = body.value.toString().toLowerCase()

        if (!["email", "username"].includes(body.type)) return badRequest("Invalid type!")
        
        const checkService = new CheckService();
        const response = checkService.Execute([ body.type, body.value ])
        return response;

    }
}

export { CheckController }