import createHttpError from "http-errors";
import { findUser, registerNewUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';
import { createSession } from "../services/session.js";

export const userRegisterController = async (req, res) => {
    const {email, password} = req.body;
    const user =  await findUser({email});
    if(user) {
        throw createHttpError(409, 'Email in use');
    };
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const newUser = await registerNewUser({...req.body, password: hashedPassword});
    const data = {
        name: newUser.name,
        email: newUser.email,
    };

    res.status(200).json({
        status: 200,
        message: "Successfully registered a user!",
        data
    });
};

export const userLoginController = async (req, res) => {
    const {email, password} = req.body;
    const user = await findUser({email});
    if(!user) {
        throw createHttpError(401, 'User not found');
    };
    
    const isEqual = await bcrypt.compare(password, user.password);
    if(!isEqual) {
        throw createHttpError(401, 'Password is invalid');
    };

    const newSession = await createSession(user._id);

    res.cookie('refreshToken', newSession.refreshToken, {
        httpOnly: true,
        expires: newSession.refreshTokenValidUntil,
    });

    res.cookie('sessionId', newSession.userId, {
        httpOnly: true,
        expired: newSession.refreshTokenValidUntil,
    });

    res.status(200).json({
        status:200,
        message: "Successfully logged in an user!",
        data: newSession.accessToken,
    });
};
