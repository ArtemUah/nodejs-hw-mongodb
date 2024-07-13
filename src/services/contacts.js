import Contact from "../db/Contact.js";
import calcPaginationData from '../utils/calcPaginationData.js';

export const getAllContacts = async ({page, perPage, sortBy, sortOrder, isFavourite, contactType, userId}) => {
    const skip = (page - 1)* perPage;
    const dataBaseQuery = Contact.find();

    if(userId) {
        dataBaseQuery.where('userId').equals(userId);
    }
    if(isFavourite) {
        dataBaseQuery.where('isFavourite').equals(isFavourite);
    };
    if(contactType) {
        dataBaseQuery.where('contactType').equals(contactType);
    };

    const items = await dataBaseQuery.skip(skip).limit(perPage).sort({[sortBy]:sortOrder});
    const totalItems = await Contact.find().countDocuments();
    const {totalPages, hasPreviousPage, hasNextPage} = calcPaginationData(page, perPage, totalItems);


    return {
        items,
        page,
        perPage,
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage
    };
};

export const getContactById = (filter) => Contact.findOne(filter);

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

