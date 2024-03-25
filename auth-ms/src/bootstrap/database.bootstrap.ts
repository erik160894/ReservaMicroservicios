import mongoose, { CallbackError } from "mongoose";
import { Bootstrap } from "./bootstrap";
import EnvironmentVariables from "../services/app.service";

export default class extends Bootstrap {
  initialize(): Promise<boolean | Error> {
    return new Promise<boolean | Error>((resolve, reject) => {
      const username = EnvironmentVariables.MONGO_USERNAME;
      const password = EnvironmentVariables.MONGO_PASSWORD;
      const host = EnvironmentVariables.MONGO_HOST;
      const port = EnvironmentVariables.MONGO_PORT;
      const database = "auth";
      const authSource = "admin";

      const connectionString = `mongodb://${username}:${password}@${host}:${port}/${database}?authSource=${authSource}&retryWrites=true&w=majority`;

      const options = {
        minPoolSize: 5,
        maxPoolSize: 10,
      };

      const callbackMongo = (error: CallbackError) => {
        if (error) {
          return reject(error);
        }
        console.log("Connected to MongoDB");
        resolve(true);
      };

      mongoose.connect(connectionString, options, callbackMongo);
    });
  }
}
