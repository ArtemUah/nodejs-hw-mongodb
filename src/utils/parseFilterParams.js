import { typesForScheme } from "../constants/constants.js";

const isBoolean = value => {
    if(typeof value !== 'string') return;
    if(!['true', 'false'].includes(value)) return;

    return Boolean(value);
};

const parseFilterParams = ({isFavourite, contactType}) => {
    const parsedIsFavourite = isBoolean(isFavourite);
    const parsedContactType = typesForScheme.includes(contactType) ? contactType : null;

    return {
        isFavourite: parsedIsFavourite,
        contactType: parsedContactType
    };
};

export default parseFilterParams;
