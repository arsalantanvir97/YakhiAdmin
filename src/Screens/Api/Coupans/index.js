import api, { baseURL } from "../../../utils/api";

export const getCoupans = async(page, perPage, from, to, status, searchString, sort, category) => {
    const {data}= await api({
       url: `${baseURL}/coupan/CoupanLogs`,
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
     return data?.couppan
 
   };
   export const createACoupan = (data) =>
    api({
        url: `${baseURL}/coupan/createCoupan`,
        method: "POST",
        data,
    });
    
    