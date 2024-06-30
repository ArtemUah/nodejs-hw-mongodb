import Contact from "../db/Contact.js";


export const getAllContacts = () => Contact.find();

export const getContactById = (id) => Contact.findById(id);

export const postContact = (data) => Contact.create(data);

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);

