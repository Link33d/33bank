import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";

class GetUserService 
{
    async execute(username: string): Promise<HttpResponse<string>> {
        try {
            const user = await UserModel.findOne( { username: username }, "-password-session" );
            if (!user) badRequest("User not found");

            return ok(user)

        } catch (e) {
            return serverError();
        }
    }
}

export { GetUserService }