import api, { baseURL } from "../../../../utils/api";

export const getTaxes = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/tax/taxlogs`,
        method: "GET",
        params: {
            page, perPage, from, to, status, searchString, sort
        },

    });
    return data?.tax

};
export const addTax = (data) =>
    api({
        url: `${baseURL}/tax/createTax`,
        method: "POST",
        data,
    });
    export const editTax = (data) =>
    api({
        url: `${baseURL}/tax/editTax`,
        method: "POST",
        data,
    });
    export const deleteTax = (id) =>
    //   console.log('id',id)
      api({
        url: `${baseURL}/tax/deleteTax/${id}`,
        method: "GET",
      });
      export const getTaxDetails =async (id) =>
        api({
            url: `${baseURL}/tax/taxDetails/${id}`,
            method: "GET",
        });
       
     