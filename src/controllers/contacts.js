import { getAllContacts, getContactById } from "../services/contacts.js";

export const getAllContactsController = async(req,res)=>{
    const data = await getAllContacts();
    res.json({
      status:200,
      message:"Successfully found contacts!",
      data
    });
  };

  export const getContactByIdController = async(req, res)=>{
    try {
     const {id} = req.params;
     const data = await getContactById(id);
     if(!data) {
      return res.status(404).json({
         message: `Error 404.Contact with ID ${id} is not found.`
       });
     }
     res.json({
       status: 200,
       message:`Successfully found contact with id ${id}!`,
       data
     });
    } catch (error) {
     res.status(400).json({
       message: `Contact is not found`,
     });
    }
   }
