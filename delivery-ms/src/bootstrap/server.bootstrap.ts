/* interface Bootstrap {
    initialize():Promise<boolean | Error>
}
 */
import http from "http";
import { Bootstrap } from "./bootstrap";
import EnvironmentVariables from "../services/app.service";
import { Application } from "express";

export default class extends Bootstrap {
  constructor(private readonly app: Application) {
    super();
  }

  initialize(): Promise<boolean | Error> {
    return new Promise<boolean | Error>((resolve, reject) => {
      const server = http.createServer(this.app);

      const PORT = EnvironmentVariables.PORT;

      server
        .listen(PORT)
        .on("listening", () => {
          resolve(true);
          console.log(`Server is running on port ${PORT}`);
        })
        .on("error", (err: Error) => {
          reject(err);
          console.log(err);
        });
    });
  }
}
