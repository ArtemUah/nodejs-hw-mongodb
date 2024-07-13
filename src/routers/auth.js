import express from 'express';
import validateBody from '../utils/validateBody.js';
import { userLoginSchema, userRegisterSchema } from '../validation/user-schema.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {userRegisterController, userLoginController} from '../controllers/auth.js';


const authRouter = express.Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(userRegisterController) );

authRouter.post('/login', validateBody(userLoginSchema), ctrlWrapper(userLoginController));

export default authRouter;
