import { Request, Response } from "express";
import { User } from "../../../../models";


export const getUsers = async (req: Request, res: Response) => {
    const usersData = await User.find({},{ password: 0 });

    res.status(200);
    res.json({
        message: "Success Retreive Users.",
        data: usersData
    });
}