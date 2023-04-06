import api, { baseURL } from "../../../utils/api";

export const getNotifications = async () => {
    const { data } = await api({
        url: `${baseURL}/notification/notifications`,
        method: "GET",
    });
    console.log('getCategories', data)
    return data?.notification
};
export const notificationLogs = async (page, perPage, from, to, ) => {
    const { data } = await api({
        url: `${baseURL}/notification/notificationlogs`,
        method: "GET",
        params: {
            page,
            perPage,
            from,
            to,

        },

    });
    return data?.notification

};
