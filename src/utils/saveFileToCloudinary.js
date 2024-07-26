import cloudinary from 'cloudinary';
import env from '../utils/env.js';
import fs from 'node:fs/promises';

cloudinary.v2.config({
secure: true,
cloud_name: env('CLOUD_NAME'),
api_key: env('API_KEY'),
api_secret: env('API_SECRET_KEY')
});


const saveFileToCloudinary = async (file) => {
        const response = await cloudinary.v2.uploader.upload(file.path);

        await fs.unlink(file.path);
        
        return response.secure_url;

};

export default saveFileToCloudinary;
