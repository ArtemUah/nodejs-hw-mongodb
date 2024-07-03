import { deleteContact, getAllContacts, getContactById, postContact, upsertContact } from "../services/contacts.js";
import createHttpError from 'http-errors';
import parsePaginationParams from "../utils/parsePaginationParams.js";
import calcPaginationData from "../utils/calcPaginationData.js";

export const getAllContactsController = async(req,res)=>{
  const {page, perPage} = parsePaginationParams(req.query);
  const {totalItems, totalPages, hasPreviousPage, hasNextPage} = calcPaginationData(page, perPage);

    const data = await getAllContacts({
      page,
      perPage
    });

    res.json({
      status:200,
      message:"Successfully found contacts!",
      data,
      page,
      perPage,
      totalItems,
      totalPages,
      hasPreviousPage,
      hasNextPage
    });
  };

  export const getContactByIdController = async(req, res)=>{

     const {id} = req.params;
     const data = await getContactById(id);
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
    const result = await postContact(req.body);

    res.status(201).json({
      status:201,
      message:'Successfully created a contact!',
      data: result,
    });
   };

   export const deleteContactController = async (req, res) => {
    const {id} = req.params;
    const result = await deleteContact({_id:id});

    if(!result) {
      throw (createHttpError(404, 'Contact not found'));
    };

    res.status(204).json({});
  };

  export const upsertContactController = async (req, res) => {
    const {id} = req.params;
    const result = await upsertContact({_id:id}, req.body, {upsert:true});

    const status = result.isNew ? 201 : 200;
    const message = result.isNew ? 'Contact successfully added' : 'Contact successfully updated';

    res.status(status).json({
      status,
      message,
      data: result.data.value,
    });

    };

    export const updateContactController = async (req, res) => {
      const {id} = req.params;
      const result = await upsertContact({_id:id}, req.body);

      if(!result) {
        throw createHttpError(404, 'Contact not found');
      };

      res.status(200).json({
        status: 200,
        message: 'Successfully patched a contact!',
        data: result.data.value
      });
    };
