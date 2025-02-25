import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.js";
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { getUserController } from "../controllers/user.js";

const usersRouter = Router();

usersRouter.use(authenticate);

usersRouter.get("/current", ctrlWrapper(getUserController));

