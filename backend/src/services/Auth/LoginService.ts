import { HttpAuthBody } from "../../utils/HttpBody";
import { badRequest, HttpResponse, ok, serverError } from "../../utils/HttpHelper";
import { User, UserModel } from "../../models/User";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import mongoose from "mongoose";
import fetch from "node-fetch";

class LoginService 
{
    async execute(userData: HttpAuthBody): Promise<HttpResponse<string>> {
        try {
            const user = await UserModel.findOne( { email: userData.email.toLowerCase() } );
            
            if (!user) return badRequest("This user does not exist");

            const checkPassword = await bcrypt.compare(userData.password, user.password.toString());
            
            if (!checkPassword) return badRequest("Incorrect password")

            return this.generateToken(user, userData.userIp);
        } catch (err) {
            console.log(err)

            return serverError();
        }
    }

  async generateToken(user: User, userIp: string | undefined): Promise<HttpResponse<string>> {
    try {
      const secret: string | any = process.env.SECRET;
      if (!secret) throw "Secret not found"

      if (!userIp) return badRequest("User IP not defined!")

      if (!user.sessions) user.sessions = [];

      const locationResponse = await fetch(`https://ipapi.co/${userIp}/json/`);
      const locationData = await locationResponse.json() as any;

      let locationString = `${locationData.city}, ${locationData.region}, ${locationData.country}`

      const sessionId = new mongoose.Types.ObjectId();

      user.sessions.push({
          _id: sessionId, 
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

      return ok(token)
    } catch (err) {
      console.log(err)

      return serverError();
    }
  }
}

export { LoginService }