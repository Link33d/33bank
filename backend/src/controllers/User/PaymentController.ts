import { User } from "../../models/User";
import { PaymentService } from "../../services/User/PaymentService";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";

class PaymentController {

    async handle(user: User, body: any): Promise<HttpResponse<string>> {
        
        /* const {receiver, amount} = body;

        if (!receiver) return badRequest("Field `receiver` is required")
        if (!amount) return badRequest("Field `amount` is required")

        if (isNaN(amount) || amount <= 0) return badRequest("The `amount` field must be a number greater than 0") */

        return new PaymentService().execute(body.pixKey, body.amount);
    }
    
}

export { PaymentController }