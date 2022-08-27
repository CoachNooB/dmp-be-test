import { Request, Response } from "express";
import { Config } from "../../../../lib";
import axios from "axios";


const config = new Config;

export const getJobs = async (req: Request, res: Response) => {
    const filterParams = {
        description: req.query.description ? req.query.description as string : "",
        location: req.query.location ? req.query.location as string : "",
        fullTime: req.query['full-time'] ? req.query['full-time'] as string : "",
        page: req.query.page ? req.query.page as string : "1",
        limit: req.query.limit ? req.query.limit as string : "10"
    }
    const respData = await axios(`${config.jobsEndPoint}`, { method: "GET" }).then(res => res.data);
    const filtered = filterData(respData, filterParams);
    console.log(filtered.length);
    const totalPage = Math.ceil(filtered.length / parseInt(filterParams.limit));

    res.status(200);
    res.json({
        message: "Succes Get Jobs",
        data: paginate(filtered, parseInt(filterParams.page), parseInt(filterParams.limit)),
        page: parseInt(filterParams.page),
        totalPage
    });
}

const paginate = (data: any[], page: number, limit: number) => {
    return data.slice((page - 1) * limit, page * limit);
}

const filterData = (data: any[], filter: any) => {
    const filtered = data.filter(item => {
        return item.description.includes(filter.description) && item.location.includes(filter.location) && (filter.fullTime ? item.type === "Full Time" : item.type)
    })
    return filtered;
}