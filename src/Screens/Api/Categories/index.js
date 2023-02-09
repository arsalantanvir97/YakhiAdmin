import api, { baseURL } from "../../../utils/api";
export const categoryLogs = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/category/CategoryLogs`,
        method: "GET",
        params: {
            page,
            perPage,
            searchString,
            from,
            to,
            status,
            sort,

        },

    });
    return data?.category

};

export const changeStatus = (id) =>
    //   console.log('id',id)
    api({
        url: `${baseURL}/category/toggle-active/${id}`,
        method: "GET",
    });
export const getCategories = async () => {
    const { data } = await api({
        url: `${baseURL}/category/allOfCategories`,
        method: "GET",
    });
    console.log('getCategories', data)
    return data?.getAllCategories
};
export const getGeoGeneticsCategories = async () => {
    const { data } = await api({
        url: `${baseURL}/category/getGeoGeneticsCategory`,
        method: "GET",
    });
    return data?.getAllCategories
};
export const createCategory = (data) =>
    api({
        url: `${baseURL}/category/createCategory`,
        method: "POST",
        data,
    });
export const getCategoryDetails = (id) =>
    api({
        url: `${baseURL}/category/getCategoryDetails/${id}`,
        method: "GET",
    });
    export const EditingCategory = (data) =>
    api({
      url: `${baseURL}/category/editCategory`,
      method: "POST",
      data,
    });