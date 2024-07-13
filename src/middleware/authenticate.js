import createHttpError from "http-errors";
import { findSession } from "../services/session.js";
import { findUser } from "../services/auth.js";

const authenticate = async (req, res, next) => {
const authHeader = req.get('Authorization');
console.log(authHeader);
if(!authHeader) {
    return next(createHttpError(401, 'Authorization Header is missing'));
};

const [bearer, accessToken] = authHeader.split(' ');
if(bearer !== 'Bearer') {
return next(createHttpError(401, 'Authorization must be Bearer type'));
};

if(!accessToken) {
return next(createHttpError(401, 'accessToken is missing'));
};
const currentSession = findSession({accessToken});

if(!currentSession) {
    return next(createHttpError(401, 'Session not found'));
};

const accessTokenIsExpired = Date.now() > new Date(currentSession.accessTokenIsValidUntil);

if(accessTokenIsExpired) {
    return next(401, 'Access token is expired');
};

const user = findUser({_id: currentSession.userId});
if(!user) {
    return next(createHttpError(401, 'User not found'));
};

req.user = user;

next();

};

export default authenticate;
