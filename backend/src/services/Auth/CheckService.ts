import { UserModel } from "../../models/User";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";

class CheckService
{
    async Execute(data: string[]): Promise<HttpResponse<string>> {

        try {
            let filter: { [key: string]: string } = {};
            filter[data[0]] = data[1];

            const user = await UserModel.findOne( filter );
            return user ? ok("User found!") : badRequest("User not found!");
        } catch (err) {
            console.log(err)

            return serverError();
        }
        
        
    }
}

export { CheckService }