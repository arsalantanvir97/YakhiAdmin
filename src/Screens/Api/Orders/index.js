import api, { baseURL } from "../../../utils/api";

export const getOrders = async(page, perPage, from, to, searchString, sort, ) => {
   const {data}= await api({
      url: `${baseURL}/order/nogeoorderlogs`,
      method: "GET",
      params: {
        page,
          perPage,
          searchString,
          from,
          to,
          sort,
      },
    
    });
    console.log('getUsersdata',data?.order)
    return data?.order

  };
  export const getAllOrdersLogs = async(page, perPage, from, to, searchString, sort, ) => {
   const {data}= await api({
      url: `${baseURL}/order/logs`,
      method: "GET",
      params: {
        page,
          perPage,
          searchString,
          from,
          to,
          sort,
      },
    
    });
    console.log('getUsersdata',data?.order)
    return data?.order

  };
  export const getGeogeneticsOrders = async(page, perPage, from, to, searchString, sort, ) => {
    const {data}= await api({
       url: `${baseURL}/order/geoGeneticslogs`,
       method: "GET",
       params: {
         page,
           perPage,
           searchString,
           from,
           to,
           sort,
       },
     
     });
     console.log('getUsersdata',data)
     return data
    }
   
  
  export const getOrderDetails = async (id) => {
    const { data } = await api({
        url: `${baseURL}/order/getOrderById/${id}`,
        method: "GET",
    });
    return data
}
export const updateOrderStatusHandler = async (id) => {
  const { data } = await api({
      url: `${baseURL}/order/updateOrderToDelivered/${id?.id}`,
      method: "POST",
      data:{status:id?.status}
  });
  return data
}
export const editGeoGeneticsText = async (text) => {
  const { data } = await api({
      url: `${baseURL}/order/editgeogeneticstext`,
      method: "POST",
      data:{text}
  });
  return data
}
