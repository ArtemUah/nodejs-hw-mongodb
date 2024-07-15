import createHttpError from "http-errors";
import { findUser, registerNewUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';
import { createSession, deleteSession, findSession } from "../services/session.js";

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

    res.status(201).json({
        status: 201,
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

export const userRefreshController = async (req, res) => {
    const {refreshToken, sessionId} = req.cookies;

    const currentSession = await findSession({refreshToken, userId: sessionId});

    if(!currentSession) {
        throw createHttpError(401, 'Session not found');
    };

    const refreshTokenExpired = Date.now() > new Date(currentSession.refreshTokenValidUntil);
    if(refreshTokenExpired) {
        throw createHttpError(401, 'Refreshtoke is expired');
    };

    const newSession = await createSession(currentSession.userId);

    res.cookie('refreshToken', newSession.refreshToken, {
        httpOnly: true,
        expires: newSession.refreshTokenValidUntil,
    });

    res.cookie('sessionId', newSession.userId, {
        httpOnly: true,
        expired: newSession.refreshTokenValidUntil,
    });

    res.status(200).json({
        status: 200,
        message: "Successfully refreshed a session!",
        data: newSession.accessToken
    });

};

export const userLogoutController = async (req, res) => {
    const {sessionId} = req.cookies;
if(!sessionId) {
    throw createHttpError(401, 'Session not found');
};

await deleteSession({userId: sessionId});
res.clearCookie('sessionId');
res.clearCookie('refreshToken');

res.status(204).send();
};
