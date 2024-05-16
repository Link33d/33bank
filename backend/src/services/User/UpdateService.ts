import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { User, UserModel } from "../../models/User";

class UpdateService 
{
    async execute(user: User, userData: any): Promise<HttpResponse<string>> {

        try {

            if (user.username.toLowerCase() != userData.username.toLowerCase()) {

                const iUser = await UserModel.findOne({ 'username': userData.username.toLowerCase() });
                if (iUser) return badRequest("This username has already been used");

            }

            if (user.email.toLowerCase() != userData.email.toLowerCase()) {

                const iUser = await UserModel.findOne({ 'email': userData.email.toLowerCase() });
                if (iUser) return badRequest("This email has already been used");

            }

            for ( let pixKey of userData.pixKeys) {

                if (!user.pixKeys.includes(pixKey)) {

                    const iUser = await UserModel.findOne({ 'pixKeys': pixKey });
                    if (iUser) return badRequest(`The key '${pixKey}' has already been used`);
    
                }

            }

            user.email = userData.email?.toLowerCase() ?? user.email;
            user.displayName = userData.displayName?.toLowerCase() ?? user.displayName;
            user.username = userData.username?.toLowerCase() ?? user.username;
            user.bio = userData.bio?.toLowerCase() ?? user.bio;
            user.profilePic = userData.profilePic?.toLowerCase() ?? user.profilePic;
            user.pixKeys = userData.pixKeys ?? user.pixKeys;

            user.save();

            return ok(userData);
        } catch (err) {
            console.log(err)

            return serverError();
        }

    }
}

export { UpdateService }