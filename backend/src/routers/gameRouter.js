import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { joinBattleController } from '../controllers/room.js';
import { authenticate } from '../middlewares/authenticate.js';

const gameRouter = Router();

gameRouter.use(authenticate);

gameRouter.post('/join', ctrlWrapper(joinBattleController));

export default gameRouter;
