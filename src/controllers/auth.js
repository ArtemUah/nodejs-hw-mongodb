import createHttpError from "http-errors";
import { findUser, registerNewUser } from "../services/auth.js";
import bcrypt from 'bcryptjs';

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
