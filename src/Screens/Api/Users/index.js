import api, { baseURL } from "../../../utils/api";

export const getUsers = async (page, perPage, from, to, searchString, sort,) => {
    const { data } = await api({
        url: `${baseURL}/user/logs`,
        method: "GET",
        params: {
            page,
            perPage,
            searchString,
            from,
            to,
            sort,
        },

    });
    console.log('getUsersdata', data?.user)
    return data?.user

};

export const changeStatus = (id) =>
    api({
        url: `${baseURL}/user/toggle-active/${id}`,
        method: "GET",
    });

export const getUserDetails = async (id) => {
    const { data } = await api({
        url: `${baseURL}/user/user-details/${id}`,
        method: "GET",
    });
    return data?.user
}
export const getUserOrders = async (page, perPage, from, to, searchString, sort, id) => {
    const { data } = await api({
        url: `${baseURL}/order/orderlogs/${id}`,
        method: "GET",
        params: {
            page,
            perPage,
            searchString,
            from,
            to,
            sort,
            id
        },

    });
    console.log('getUsersdata', data?.order)
    return data?.order

};
export const editUser = (data) =>
api({
  url: `${baseURL}/user/editProfile`,
  method: "POST",
  data,
});