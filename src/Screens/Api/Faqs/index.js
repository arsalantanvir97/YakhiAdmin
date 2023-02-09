import api, { baseURL } from "../../../utils/api";

export const getFaqs = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/faq/faqslogs`,
        method: "GET",
        params: {
            page, perPage, from, to, status, searchString, sort
        },

    });
    return data

};
export const addFaq = (data) =>
    api({
        url: `${baseURL}/faq/createfaqs`,
        method: "POST",
        data,
    });
export const editFaq = (data) =>
    api({
        url: `${baseURL}/faq/editfaqs`,
        method: "POST",
        data,
    });
    export const uploadVideo = (data) =>
    api({
        url: `${baseURL}/faq/faqvideo`,
        method: "POST",
        data,
    });