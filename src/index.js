import setupServer from "./server.js";
import initMongoConnection from '../src/db/initMongoConnection.js';
import createDirIfNotExists from '../src/utils/createDirIfNotExists.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

const bootstrat = async () => {
    await initMongoConnection();
    createDirIfNotExists(TEMP_UPLOAD_DIR);
    createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrat();

