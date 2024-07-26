import { deleteContact, getAllContacts, getContactById, postContact, upsertContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import parsePaginationParams from "../utils/parsePaginationParams.js";
import parseSortParams from '../utils/parsSortParams.js';
import parseFilterParams from '../utils/parseFilterParams.js';

import saveFileToCloudinary from "../utils/saveFileToCloudinary.js";
import saveFileToUploadDir from '../utils/saveFileToUploadDir.js';

import env from '../utils/env.js';

export const getAllContactsController = async(req,res)=>{
  const {_id:userId} = req.user;

  const {page, perPage} = parsePaginationParams(req.query);
  const {sortBy, sortOrder} = parseSortParams(req.query);
  const {isFavourite, contactType} = parseFilterParams(req.query);

    const data = await getAllContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      isFavourite,
      contactType,
      userId,
    });

    res.json({
      status:200,
      message:"Successfully found contacts!",
      data
    });
  };

  export const getContactByIdController = async(req, res)=>{
    const {_id: userId} = req.user;
     const {id} = req.params;

     const data = await getContactById({_id:id, userId});
     if(!data) {
    throw createHttpError(404, 'Contact not found');
     }
     res.json({
       status: 200,
       message:`Successfully found contact with id ${id}!`,
       data
     });

   };

   export const postContactController = async (req, res) => {
    const {_id:userId} = req.user;

    const photo = req.file;

    let photoUrl;

    if(photo) {
      if(env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    };

    const result = await postContact({...req.body, userId, photo: photoUrl});

    if (!result) {
    throw createHttpError(404, 'User not found');
    }

    res.status(201).json({
      status:201,
      message:'Successfully created a contact!',
      data: result,
    });
   };

   export const deleteContactController = async (req, res) => {
    const {_id: userId} = req.user;

    const {id} = req.params;
    const result = await deleteContact({_id:id, userId});

    if(!result) {
      throw (createHttpError(404, 'Contact not found'));
    };

    res.status(204).json({});
  };

  export const upsertContactController = async (req, res) => {
    const {_id: userId} = req.user;

    const {id} = req.params;
    const result = await upsertContact({_id:id, userId}, req.body, {upsert:true});

    const status = result.isNew ? 201 : 200;
    const message = result.isNew ? 'Contact successfully added' : 'Contact successfully updated';

    res.status(status).json({
      status,
      message,
      data: result.data.value,
    });

    };

    export const updateContactController = async (req, res) => {
      const {_id: userId} = req.user;

      const photo = req.file;

      let photoUrl = '';

    if(photo) {
      if(env('ENABLE_CLOUDINARY') === 'true') {
        photoUrl = await saveFileToCloudinary(photo);
      } else {
        photoUrl = await saveFileToUploadDir(photo);
      }
    };

      const {id} = req.params;
      const result = await upsertContact({_id:id, userId}, {...req.body, photo: photoUrl});

      if(!result) {
        throw createHttpError(404, 'Contact not found');
      };

      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.data.value
      });
    };


