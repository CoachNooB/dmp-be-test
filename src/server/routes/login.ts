import { IRouter, Router } from "express";
import { loginHandler } from "../controller/v1/post/login";

export const loginRouter: IRouter = Router();

loginRouter.post("/api/v1/login", loginHandler);