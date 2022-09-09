import express from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import users from './user/user.routes';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/user', users);

export default router;
