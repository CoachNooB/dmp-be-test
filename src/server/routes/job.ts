import { Router, IRouter, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import { secureRoute } from "../../middleware";
import { getJobs, getJobById } from "../controller/v1";

export const jobRouter: IRouter = Router();

jobRouter.get("/api/v1/jobs", secureRoute, expressAsyncHandler(getJobs));
jobRouter.get("/api/v1/jobs/:id", secureRoute, expressAsyncHandler(getJobById));