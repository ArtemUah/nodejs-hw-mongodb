import setupServer from "./server.js";
import initMongoConnection from "./db/initMongoConnection.js";
import createDirIfNotExists from "./utils/createDirIfNotExists.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

const bootstrat = async () => {
    await initMongoConnection();
    createDirIfNotExists(TEMP_UPLOAD_DIR);
    createDirIfNotExists(UPLOAD_DIR);
    setupServer();
};

bootstrat();
