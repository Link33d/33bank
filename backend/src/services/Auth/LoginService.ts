import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import fetch from "node-fetch";

class LoginService 
{
    async execute(userData: HttpAuthBody): Promise<HttpResponse<string>> {

        const user = await UserModel.findOne( { email: userData.email } );
        
        if (!user) return badRequest("This user does not exist");

        const checkPassword = await bcrypt.compare(userData.password, user.password.toString());
        
        if (!checkPassword) return badRequest("Incorrect password")

        try {
            const secret: string | any = process.env.SECRET;
            if (!secret) throw "Secret not found"

            if (!user.sessions) user.sessions = [];

            const locationResponse = await fetch(`https://ipapi.co/${userData.userIp}/json/`);
            const locationData = await locationResponse.json() as any;

            let locationString = `${locationData.city}, ${locationData.region}, ${locationData.country}`

            const sessionId = new mongoose.Types.ObjectId();

            user.sessions.push({
                _id: sessionId, // Gera um novo ID para a sessão
                location: locationString,
                createdAt: new Date().toISOString(),
                activated: true
            });
            
            await user.save();

            const token = jsonwebtoken.sign(
              {
                id: sessionId,
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