import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";

class RegisterService 
{
    async execute(user: HttpAuthBody): Promise<HttpResponse<string>> {

        const searchEmail = await UserModel.findOne( { email: user.email } );
        
        if (searchEmail) return badRequest("This email has already been registered");
        
        const searchUser = await UserModel.findOne( { username: user.username } )

        if (searchUser) return badRequest("This username has already been registered");

        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(user.password, salt);
        const newUser = new UserModel({
            email: user.email,
            displayName: user.displayName,
            username: user.username,
            password: passwordHash,
        });
        
        try {
            await newUser.save();
        
            return ok(newUser);
        } catch (error) {
            return serverError();
        }
    }
}

export { RegisterService }