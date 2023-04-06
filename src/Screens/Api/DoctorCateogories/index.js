import api, { baseURL } from "../../../utils/api";

export const getdoctorcategory = async (page, perPage, from, to, searchString, sort) => {
    console.log('searchString', searchString)
    const { data } = await api({
        url: `${baseURL}/doctorcategory/doctorcategorylogs`,
        method: "GET",
        params: {
            page, perPage, from, to, searchString, sort
        },
    });
    return data?.doctorCategory

};
export const adddoctorcategory = (data) =>
    api({
        url: `${baseURL}/doctorcategory/createdoctorcategory`,
        method: "POST",
        data,
    });
export const editdoctorcategory = (data) =>
    api({
        url: `${baseURL}/doctorcategory/editdoctorcategory`,
        method: "POST",
        data,
    });

export const getdoctorcategoryDetails = async (id) => 
    api({
        url: `${baseURL}/doctorcategory/getdoctorcategorydetails/${id}`,
        method: "GET",
    });


    export const getAlldoctorcategory = async () => {
        const { data } = await api({
            url: `${baseURL}/doctorcategory/gettalldoctorcategorys`,
            method: "GET",
        });
        console.log('getCategories', data)
        return data?.getAlldoctorCategory
    };
    