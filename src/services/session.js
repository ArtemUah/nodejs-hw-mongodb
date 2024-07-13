import { randomBytes} from 'crypto';
import Session from '../db/Session.js';
import { accessTokenLifetime, refreshTokenLifetime } from '../constants/index.js';

export const createSession = async(userId) => {
    await Session.deleteOne({userId});
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    const accessTokenValidUntil = new Date( Date.now()+accessTokenLifetime);
    const refreshTokenValidUntil = new Date ( Date.now() + refreshTokenLifetime);

    return await Session.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil,
        refreshTokenValidUntil
    });
};
