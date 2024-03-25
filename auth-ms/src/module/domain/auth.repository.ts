import Auth from "./auth";

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default interface AuthRepository {
  register(auth: Auth): Promise<string>;
  findOne(where: { [s: string]: string | number }): Promise<Auth | null>;
  update(
    where: { [s: string]: string | number },
    data: { [s: string]: string | number }
  ): Promise<void>;
}
