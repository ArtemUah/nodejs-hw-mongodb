import express from 'express';
import { getAllContactsController, getContactByIdController, postContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(postContactController));

export default contactsRouter;
