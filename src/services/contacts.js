import Contact from "../db/Contact.js";


export const getAllContacts = ({page, perPage, sortBy, sortOrder}) => {
    const skip = (page - 1)* perPage;

    return Contact.find().skip(skip).limit(perPage).sort({[sortBy]:sortOrder});
};

export const getContactById = (id) => Contact.findById(id);

export const postContact = (data) => Contact.create(data);

export const deleteContact = (filter) => Contact.findOneAndDelete(filter);

export const upsertContact = async(filter, data, options={}) => {
const result = await Contact.findOneAndUpdate(filter, data, {new: true,
    includeResultMetadata: true,
    ...options,});

    if(!result || !result.value) return null;

    return ({
        data: result,
        isNew:Boolean(result?.lastErrorObject?.upserted)
    });
};

