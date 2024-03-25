import ServerBootstrap from "./bootstrap/server.bootstrap";
import DatabaseBootstrap from "./bootstrap/database.bootstrap";
import app from "./app";

(async () => {
  try {
    const listPromises = [];

    const serverBootstrap = new ServerBootstrap(app);
    const databaseBootstrap = new DatabaseBootstrap();

    listPromises.push(serverBootstrap.initialize());
    listPromises.push(databaseBootstrap.initialize());

    await Promise.all(listPromises);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
