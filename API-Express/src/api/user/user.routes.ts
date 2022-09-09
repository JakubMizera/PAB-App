import { Router, Response, Request } from "express";
import { User } from "./user.model";

const router = Router();

router.get('/', (req: Request, res: Response<User[]>) => {
    res.json([{
        userName: 'fakeUsername',
        firstName: 'Jakub',
        surName: 'Mizera',
        email: 'fakemail@gmail.com',
        phoneNumber: 555777999,
        country: 'Poland'
    }])
});

export default router;