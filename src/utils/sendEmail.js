import nodemailer from 'nodemailer';

import env from '../utils/env.js';

const host = env('SMTP_HOST');
const port = env('SMTP_PORT');
const user = env('SMTP_USER');
const pass = env('SMTP_PASSWORD');

const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
        user,
        pass,
    }
});

const sendMail = async (options) => {
    const sendMail = await transporter.sendMail(options);
    return sendMail;
};

export default sendMail;
