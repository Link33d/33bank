import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";

class GetService 
{
    async execute(params: string[]): Promise<HttpResponse<string>> {

        try {
            let filter: { [key: string]: string } = {};
            filter[params[0]] = params[1];
            
            const user = await UserModel.findOne(filter).select('-password -sessions');
            return user ? ok(user) : badRequest("User not found!");
        } catch (err) {
            console.log(err)

            return serverError();
        }

        /* try {
            const user = await UserModel.findOne( { username: username }, "-password-session" );
            if (!user) badRequest("User not found");

            return ok(user)

        } catch (e) {
            return serverError();
        } */
    }
}

export { GetService }