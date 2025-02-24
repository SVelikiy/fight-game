import { Router } from 'express';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { authRegisterSchema, authLoginSchema } from '../validations/auth.js';
import { registerController,loginController,logoutController,refreshSessionController } from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const authRouter = Router();

authRouter.post('/register', validateBody(authRegisterSchema), ctrlWrapper(registerController));
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(loginController),
);
authRouter.post('/logout', ctrlWrapper(logoutController));
authRouter.post(
  '/refresh',
  ctrlWrapper(refreshSessionController),
);

export default authRouter;
