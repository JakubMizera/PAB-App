import { Router } from "express";
import * as UserHandlers from './user.handlers'
import { User } from "./user.model";
import { validateRequest } from "../../middlewares";
import { ParamsWithId } from "../../interfaces/ParamsWithId";

const router = Router();

router.get('/', UserHandlers.findAll);
//validateRequest will check incoming body, if it passes it will call UserHandlers.createOne function
router.post('/', validateRequest({ body: User, }), UserHandlers.createOne);
router.get('/:id', validateRequest({ params: ParamsWithId }), UserHandlers.findOne);
router.put('/:id', validateRequest({ params: ParamsWithId, body: User }), UserHandlers.updateOne);
router.delete('/:id', validateRequest({ params: ParamsWithId }), UserHandlers.deleteOne);

export default router;