import axios from "axios";
import { Request, Response } from "express";
import { Config } from "../../../../lib";

const config = new Config();

export const getJobById = async (req: Request, res: Response) => {
    const { id } = req.params;

    const respData = await axios(`${config.jobsByIdEndPoint}/${id}`, { method: "GET" });

    if(!respData.data) {
        res.status(400);
        res.json({
            message: `No Job with ID ${id}`
        });
        return;
    }

    res.status(200);
    res.json({
        message: "Success Get Job Detail.",
        data: respData.data
    });
}