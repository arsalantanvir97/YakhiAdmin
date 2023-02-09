import api, { baseURL } from "../../../utils/api";

export const getNotifications = async () => {
    const { data } = await api({
        url: `${baseURL}/notification/notifications`,
        method: "GET",
    });
    console.log('getCategories', data)
    return data?.notification
};