import { ObjectId } from 'mongodb';
import * as z from 'zod';

export const ParamsWithId = z.object({
    // Validating zod objectId
    id: z.string().min(1).refine((val) => {
        try {
            return new ObjectId(val);
        } catch (error) {
            //refine should not throw, should return false
            return false;
        }
    }, {
        message: 'Invalid Object ID',
    })
});

export type ParamsWithId = z.infer<typeof ParamsWithId>;