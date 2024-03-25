import { v4 as uuidv4 } from "uuid";
import jwt from "jwt-simple";
import moment from "moment";
import bcrypt from "bcryptjs";
import EnvironmentVariables from "../../services/app.service";

export default class AuthAppService {
  static generateRefreshToken(): string {
    return uuidv4();
  }

  static generateAccessToken(id: string, name: string): string {
    const payload = {
      id,
      name,
      iat: moment().unix(),
      exp: moment().add(EnvironmentVariables.TOKEN_TIMEOUT, "minutes").unix(),
    };

    return jwt.encode(payload, EnvironmentVariables.TOKEN_SECRET_WORD);
  }

  static async cipherPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async isMatchPassword(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

  static validateAccessToken(accessToken: string) {
    return new Promise((resolve, reject) => {
      try {
        const payload = jwt.decode(
          accessToken,
          EnvironmentVariables.TOKEN_SECRET_WORD
        );
        resolve(payload);
      } catch (error: any) {
        if (error.message === "Token expired") {
          reject({ status: 409, message: "The access token has expired" });
        } else {
          reject({ status: 401, message: "The access token is invalid" });
        }
      }
    });
  }
}
