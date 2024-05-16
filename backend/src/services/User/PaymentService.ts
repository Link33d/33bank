import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { User, UserModel } from "../../models/User";

class PaymentService 
{
    async execute(pixKey: String, amount: number ): Promise<HttpResponse<string>> {
        
        try {

            const user = await UserModel.findOne({ 'pixKeys': pixKey });
            if (!user) return badRequest(`Cannot find ${pixKey}`);

            return ok(user);

        } catch (err) {
            console.log(err)

            return serverError();
        }

    }
}

export { PaymentService }