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