import path from 'node:path';

export const accessTokenLifetime = 15 * 60 * 1000;
export const refreshTokenLifetime = 30 * 24 * 3600 * 1000;
export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'src', 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'src', 'uploads');
export const SWAGGER_PATH = path.resolve('docs', 'swagger.json');
