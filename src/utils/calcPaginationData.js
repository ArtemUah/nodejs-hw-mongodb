
const calcPaginationData = (page, perPage, totalItems) => {
    const totalPages = Math.ceil(totalItems/perPage);
    const hasPreviousPage = page !== 1;
    const hasNextPage = page !== totalPages;

    return {
        totalItems,
        totalPages,
        hasPreviousPage,
        hasNextPage
    };
};

export default calcPaginationData;
