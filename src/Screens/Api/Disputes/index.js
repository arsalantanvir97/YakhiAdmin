import api, { baseURL } from "../../../utils/api";

export const disputeLogs = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/dispute/DisputeLogs`,
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


    export const getDisputeDetails =async (id) =>{
   const {data}=await api({
        url: `${baseURL}/dispute/getDisputeDetails/${id}`,
        method: "GET",
    })
    console.log('data',data)
return data?.dispute
}
    