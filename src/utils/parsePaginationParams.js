const toNumber = (value, defaultValue) => {
    if(typeof value !== "string") return defaultValue;
    if(Number.isNaN(value)) return defaultValue;

    return parseInt(value);
};

const parsePaginationParams = ({page, perPage}) => {
    const parsedPage = toNumber(page, 1);
    const parsedPerPage = toNumber(perPage, 10);
    return {
        page: parsedPage,
        perPage: parsedPerPage
    };
};

export default parsePaginationParams;
