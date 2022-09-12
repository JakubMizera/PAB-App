import { Router } from "express";
import * as UserHandlers from './user.handlers'

const router = Router();

router.get('/', UserHandlers.findAll);

export default router;