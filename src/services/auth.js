import User from '../db/User.js';

export const updateUser = (filter, data) => User.findOneAndUpdate(filter, data);
export const findUser = (filter) => User.findOne(filter);
export const registerNewUser = (data) => User.create(data);
