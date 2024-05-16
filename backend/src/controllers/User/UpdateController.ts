import validator from "validator";
import { User } from "../../models/User";
import { UpdateService } from "../../services/User/UpdateService";
import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok } from "../../utils/HttpHelper";

class UpdateController {

    async handle(user: User, newUser: any): Promise<HttpResponse<string>> {

        const emailIsValid = validator.isEmail(newUser.email);
        if (!emailIsValid) return badRequest("E-mail is invalid");

        if (newUser.displayName && newUser.displayName.length < 3) return badRequest("The `DisplayName` fields must be longer than 3 characters")
        if (newUser.username && newUser.username.length < 3) return badRequest("The `username` fields must be longer than 3 characters")
        
        if (newUser.bio && newUser.bio.length > 300) return badRequest("The `bio` field must be less than 300 characters")

        // verificar tamanho da imagem
        if (newUser.pixKeys && !Array.isArray(newUser.pixKeys)) newUser.pixKeys = user.pixKeys.push(newUser.pixKeys)

        return new UpdateService().execute(user, newUser);
    }
    
}

export { UpdateController }