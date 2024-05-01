import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../utils/models";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";

class LoginService 
{
    async execute(user: HttpAuthBody): Promise<HttpResponse<string>> {

        const searchEmail = await UserModel.findOne( { email: user.email } );
        
        if (!searchEmail) return badRequest("This user does not exist");

        const checkPassword = await bcrypt.compare(user.password, user.password);

        try {
            const secret: string | any = process.env.SECRET;
        
            const token = jsonwebtoken.sign(
              {
                id: searchEmail._id,
              },
              secret
            );
        
            return ok(token);
          } catch (error) {
            return serverError();
          }
    }
}

export { LoginService }