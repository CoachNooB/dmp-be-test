import * as http from "http";
import { getApp } from "./app";

(async () => {
    try {
        const { app, config } = await getApp();

        const server: http.Server = http.createServer(app);
        server.listen(config.port);
        console.log(`Server Running in Port ${config.port}`);

    } catch (error) {
        console.log(error);
        process.exit(1);
    }
})();