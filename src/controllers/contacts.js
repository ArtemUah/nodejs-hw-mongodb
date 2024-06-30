import { getAllContacts, getContactById, postContact } from "../services/contacts.js";
import createHttpError from 'http-errors';

export const getAllContactsController = async(req,res)=>{
    const data = await getAllContacts();
    res.json({
      status:200,
      message:"Successfully found contacts!",
      data
    });
  };

  export const getContactByIdController = async(req, res, next)=>{

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
    console.log(req.body);
    res.status(201).json({
      status:201,
      message:'Successfully created a contact!',
      data: result,
    });
   };
