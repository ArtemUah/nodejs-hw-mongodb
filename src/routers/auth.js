import express from 'express';
import validateBody from '../utils/validateBody.js';
import { userRegisterSchema } from '../validation/user-schema.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import {userRegisterController} from '../controllers/auth.js';


const authRouter = express.Router();

authRouter.post('/register', validateBody(userRegisterSchema), ctrlWrapper(userRegisterController) );

export default authRouter;
