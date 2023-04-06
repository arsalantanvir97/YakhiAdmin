import api, { baseURL } from "../../../utils/api";

export const getTags = async (page, perPage, from, to, searchString, sort) => {
    console.log('searchString', searchString)
    const { data } = await api({
        url: `${baseURL}/tag/taglogs`,
        method: "GET",
        params: {
            page, perPage, from, to, searchString, sort
        },
    });
    return data?.tag

};
export const addTag = (data) =>
    api({
        url: `${baseURL}/tag/createtag`,
        method: "POST",
        data,
    });
export const editTag = (data) =>
    api({
        url: `${baseURL}/tag/edittag`,
        method: "POST",
        data,
    });

export const getTagDetails = async (id) => 
    api({
        url: `${baseURL}/tag/gettagdetails/${id}`,
        method: "GET",
    });


    export const getAllTags = async () => {
        const { data } = await api({
            url: `${baseURL}/tag/gettalltags`,
            method: "GET",
        });
        console.log('getCategories', data)
        return data?.getAllTags
    };
    