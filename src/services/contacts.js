import Contact from "../db/Contact.js";


export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);
