import { Router, Response, Request, NextFunction } from "express";
import { Users, UserWithId } from "./user.model";

const router = Router();

router.get('/', async (req: Request, res: Response<UserWithId[]>, next: NextFunction) => {
    try {
        const users = await Users.find().toArray();
        res.json(users);
    } catch (error) {
        next(error);
    }
});

export default router;