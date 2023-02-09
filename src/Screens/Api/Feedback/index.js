import api, { baseURL } from "../../../utils/api";

export const feedbackLogs = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/feedback/FeedbackLogs`,
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
    return data?.feedback

};
export const changeStatus = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/feedback/toggle-active/${id}`,
    method: "GET",
  });
  export const deleteFeedback = (id) =>
  //   console.log('id',id)
    api({
      url: `${baseURL}/feedback/deleteFeedback/${id}`,
      method: "GET",
    });


    export const getFeedbackDetails =async (id) =>{
   const {data}=await api({
        url: `${baseURL}/feedback/getFeedbackDetails/${id}`,
        method: "GET",
    })
    console.log('data',data)
return data?.feedback
}
    