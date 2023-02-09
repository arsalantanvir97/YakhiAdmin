import api, { baseURL } from "../../../utils/api";

export const getDocuments = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/document/documentlogs`,
        method: "GET",
        params: {
            page, perPage, from, to, status, searchString, sort
        },

    });
    return data?.document

};
export const addDocument = (data) =>
    api({
        url: `${baseURL}/document/createDocument`,
        method: "POST",
        data,
    });
export const editDocument = (data) =>
    api({
        url: `${baseURL}/document/editDocument`,
        method: "POST",
        data,
    });
export const deleteDocument = (id) =>
    //   console.log('id',id)
    api({
        url: `${baseURL}/document/deleteDocument/${id}`,
        method: "GET",
    });