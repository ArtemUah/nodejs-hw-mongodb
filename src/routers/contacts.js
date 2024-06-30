import express from 'express';
import { deleteContactController, getAllContactsController, getContactByIdController, postContactController, upsertContactController } from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = express.Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));

contactsRouter.get('/:id', ctrlWrapper(getContactByIdController));

contactsRouter.post('/', ctrlWrapper(postContactController));

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController));

contactsRouter.put('/:id', ctrlWrapper(upsertContactController));

export default contactsRouter;
