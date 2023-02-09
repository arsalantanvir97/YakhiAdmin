import api, { baseURL } from "../../../utils/api";

export const getAdmins = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/auth/adminlogs`,
        method: "GET",
        params: {
            page, perPage, from, to, status, searchString, sort
        },
    });
    return data?.admin

};
export const addAdmin = (data) =>
    api({
        url: `${baseURL}/auth/registerAdminbyAdmin`,
        method: "POST",
        data,
    });
export const getAdminDetails = async (id) => {
    const { data } = await api({
        url: `${baseURL}/auth/admin-details/${id}`,
        method: "GET",
    })
    return data?.admin

}
export const deleteAdmin = (id) =>
    //   console.log('id',id)
    api({
        url: `${baseURL}/auth/deleteAdmin/${id}`,
        method: "GET",
    });