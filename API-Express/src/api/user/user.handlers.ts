import { Response, Request, NextFunction } from "express";
import { UserWithId, Users, User } from "./user.model";
import { InsertOneResult } from "mongodb";
import { ZodError } from "zod";


export async function findAll(req: Request, res: Response<UserWithId[]>, next: NextFunction) {
    try {
        const users = await Users.find().toArray();
        res.json(users);
    } catch (error) {
        next(error);
    }
}

export async function createOne(req: Request<{}, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
    try {
        // using User as zod schema
        const insertResult = await Users.insertOne(req.body);

        if (!insertResult.acknowledged) throw new Error('Error inserting user');
        res.status(201);
        res.json({
            _id: insertResult.insertedId,
            ...req.body,
        });
    } catch (error) {
        next(error);
    }
}