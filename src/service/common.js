export const mapEntity = (entity) => {
    return {
        id: entity._id,
        name: entity.name
    }
};
export const addPagination = (collection, size, current) => {
    collection.pagination = {
        size: size,
        current: current,
        pages: [...Array(size)].map((v, i) => i + 1)
    };
    return collection;
};