import { IRouter, Router } from "express";
import expressAsyncHandler from "express-async-handler";
import { getUsers, registerUser } from "../controller/v1";

export const userRouter: IRouter = Router();

userRouter.get("/api/v1/users", expressAsyncHandler(getUsers));
userRouter.post("/api/v1/users", expressAsyncHandler(registerUser));