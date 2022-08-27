import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { Config } from "../lib/config";

const config = new Config();

export const generateToken = (payload: { id: string, role: string }) => {
    return jwt.sign(payload, config.jwtSecret, { algorithm: "HS512", expiresIn: '30d' });
}

export const secureRoute = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    try {
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if(!token) {
            res.status(401);
            res.json({
                message: "Not Authorized, please provide Token"
            })
            return;
        }

        const decodeData = jwt.verify(token, config.jwtSecret);

        next();
    } catch (error) {
        console.log(error);
        res.status(401);
        res.json({
            message: "Not Authorized.",
            error
        })
    }
});