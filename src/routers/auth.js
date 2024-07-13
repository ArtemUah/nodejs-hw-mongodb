import express from 'express';
import validateBody from '../utils/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/user-schema.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {userRegisterController, userLoginController, userRefreshController, userLogoutController} from '../controllers/auth.js';


const authRouter = express.Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(userRegisterController) );

authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(userLoginController));

authRouter.post('/refresh', ctrlWrapper(userRefreshController));

authRouter.post('/logout', ctrlWrapper(userLogoutController));

export default authRouter;
