import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { joinBattleController } from '../controllers/room.js';

const gameRouter = Router();

gameRouter.post('/join', ctrlWrapper(joinBattleController));

export default gameRouter;
