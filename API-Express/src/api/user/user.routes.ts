import { Router } from "express";
import * as UserHandlers from './user.handlers'
import { User } from "./user.model";
import { validateRequest } from "../../middlewares";

const router = Router();

router.get('/', UserHandlers.findAll);
//validateRequest will check incoming body, if it passes it will call UserHandlers.createOne function
router.post('/', validateRequest({ body: User, }), UserHandlers.createOne);

export default router;