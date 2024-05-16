import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import { LoginService } from "./LoginService";

class RegisterService 
{
    async execute(user: HttpAuthBody): Promise<HttpResponse<string>> {
        try {
            const searchEmail = await UserModel.findOne( { email: user.email.toLowerCase() } );
            
            if (searchEmail) return badRequest("This email has already been registered");
            
            const searchUser = await UserModel.findOne( { username: user.username?.toLowerCase() } )

            if (searchUser) return badRequest("This username has already been registered");

            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(user.password, salt);
            const newUser = new UserModel({
                email: user.email.toLowerCase(),
                displayName: user.displayName,
                username: user.username?.toLowerCase(),
                password: passwordHash,
            });
        
            await newUser.save();

            return new LoginService().generateToken(newUser, user.userIp);
        } catch (err) {
            console.log(err)
            return serverError();
        }
    }
}

export { RegisterService }