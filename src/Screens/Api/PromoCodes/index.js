import api, { baseURL } from "../../../utils/api";

export const getPromoCodes = async(page, perPage, from, to, status, searchString, sort, category) => {
    const {data}= await api({
       url: `${baseURL}/promo/PromoCodeLogs`,
       method: "GET",
       params: {
         page,
           perPage,
           searchString,
           from,
           to,
           status,
           sort,
           category,
       },
     
     });
     return data?.promocode
 
   };
   export const createAPromoCode = (data) =>
    api({
        url: `${baseURL}/promo/createPromoCode`,
        method: "POST",
        data,
    });
    export const changeStatus = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/promo/toggle-active/${id}`,
    method: "GET",
  });
  export const getPromoCOdeDetails = (id) =>
    api({
        url: `${baseURL}/promo/promoCodeDetails/${id}`,
        method: "GET",
    });
    export const editPromoCode = (data) =>
    api({
      url: `${baseURL}/promo/editPromoCOde`,
      method: "POST",
      data,
    });