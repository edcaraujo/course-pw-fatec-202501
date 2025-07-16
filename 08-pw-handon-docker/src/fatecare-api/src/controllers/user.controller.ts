import { Request,Response, NextFunction } from "express";
import userRepostory from "../repositories/user.repostory";

async function addUser(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    const user = await userRepostory.addUser(username,password);

    res.status(201).json(user);
}

export default {
    addUser
}