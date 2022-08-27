import express, { json, urlencoded } from "express";
import { Config, dbConnect } from "../lib";
import { errorCatcher } from "../middleware";
import { loginRouter, jobRouter, userRouter } from "./routes";

export const getApp = async (): Promise<{ app: express.Application, config: Config }> => {
    const app = express();
    const config = new Config();
    dbConnect(config);

    app.use(json());
    app.use(urlencoded());
    app.use(errorCatcher);
    

    // App Routes
    app.use(jobRouter);
    app.use(loginRouter);
    app.use(userRouter);

    return { app, config };
};