import { Response, Request, NextFunction } from "express";
import { UserWithId, Users, User } from "./user.model";
import { ParamsWithId } from "../../interfaces/ParamsWithId";
import { ObjectId } from "mongodb";


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

export async function findOne(req: Request<ParamsWithId, UserWithId, {}>, res: Response<UserWithId>, next: NextFunction) {
    try {
        const result = await Users.findOne({
            //ObjectId from mongodb to avoid type errors
            _id: new ObjectId(req.params.id),
        });
        //if statment when user id is not found
        if (!result) {
            res.status(404);
            throw new Error(`User with id ${req.params.id} not found`);
        }
        res.json(result);
    } catch (error) {

    }
};

export async function updateOne(req: Request<ParamsWithId, UserWithId, User>, res: Response<UserWithId>, next: NextFunction) {
    try {
        const result = await Users.findOneAndUpdate({
            _id: new ObjectId(req.params.id),
        }, {
            //$set: req.body updates user info
            $set: req.body,
        }, {
            //When set to 'after', return updated document rather than the original
            returnDocument: 'after',
        });
        // result.value is updated object (if it exists)
        if (!result.value) {
            res.status(404);
            throw new Error(`User with id ${req.params.id} not found`);
        }
        res.json(result.value);
    } catch (error) {
        next(error);
    }
};

export async function deleteOne(req: Request<ParamsWithId, {}, {}>, res: Response<{}>, next: NextFunction) {
    try {
        const result = await Users.findOneAndDelete({
            _id: new ObjectId(req.params.id),
        });
        if (!result.value) {
            res.status(404);
            throw new Error(`User with id ${req.params.id} not found`);
        }
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};