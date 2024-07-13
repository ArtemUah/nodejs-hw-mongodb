import User from '../db/User.js';


export const findUser = (filter) => User.findOne(filter);
export const registerNewUser = (data) => User.create(data);
