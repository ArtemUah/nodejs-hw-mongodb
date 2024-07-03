import { sortByParams, sortOrderParams } from "../constants/constants.js";


const parseSortParams = ({sortBy, sortOrder}) => {

const parsedSortBy = sortByParams.includes(sortBy) ? sortBy : sortByParams[0];
const parsedSortOrder = sortOrderParams.includes(sortOrder) ? sortOrder : sortOrderParams[0];

return {
    sortBy: parsedSortBy,
    sortOrder: parsedSortOrder
};
};

export default parseSortParams;
