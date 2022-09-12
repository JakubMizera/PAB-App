import { Response, Request, NextFunction } from "express";
import { UserWithId, Users } from "./user.model";


export async function findAll(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
    try {
        const users = await Users.find().toArray();
        res.json(users);
    } catch (error) {
        next(error);
    }
}