import api, { baseURL } from "../../../utils/api";

export const getProducts = async(page, perPage, from, to, status, searchString, sort, category) => {
   const {data}= await api({
      url: `${baseURL}/product/productlogsofAdmin`,
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
    return data?.product

  };
  export const getGeogenticsProducts = async(page, perPage, from, to, status, searchString, sort, id) => {
    const {data}= await api({
       url: `${baseURL}/product/geoGeneticslogs`,
       method: "GET",
       params: {
         page,
           perPage,
           searchString,
           from,
           to,
           status,
           sort,
           id,
       },
     
     });
     return data?.product
 
   };
export const changeStatus = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/product/toggle-active/${id}`,
    method: "GET",
  });
  export const deleteProduct = (id) =>
  //   console.log('id',id)
    api({
      url: `${baseURL}/product/deleteProduct/${id}`,
      method: "GET",
    });
    export const createProduct = (data) =>
    api({
      url: `${baseURL}/product/createProduct`,
      method: "POST",
      data,
    });
  
    export const getProductDetails = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/product/getProductDetails/${id}`,
    method: "GET",
  });
  export const editProduct = (data) =>
  api({
    url: `${baseURL}/product/editProduct`,
    method: "POST",
    data,
  });