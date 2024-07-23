import express from 'express';
import validateBody from '../utils/validateBody.js';
import { newPasswordSchema, resetEmailSchema, userLoginSchema, userRegisterSchema } from '../validation/user-schema.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {userRegisterController, userLoginController, userRefreshController, userLogoutController, resetEmailController, newPasswordController} from '../controllers/auth.js';


const authRouter = express.Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(userRegisterController) );

authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(userLoginController));

authRouter.post('/refresh', ctrlWrapper(userRefreshController));

authRouter.post('/logout', ctrlWrapper(userLogoutController));

authRouter.post('/send-reset-email', validateBody(resetEmailSchema), ctrlWrapper(resetEmailController));

authRouter.post('/reset-pwd', validateBody(newPasswordSchema), ctrlWrapper(newPasswordController));

export default authRouter;
