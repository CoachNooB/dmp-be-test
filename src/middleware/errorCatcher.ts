import { NextFunction, Request, Response } from "express";

export const errorCatcher = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode);
    res.json({
        message: err.message
    });
}