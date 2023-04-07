import api, { baseURL } from "../../../utils/api";

export const getAppointments = async(page, perPage, from, to, searchString, sort) => {
    const {data}= await api({
       url: `${baseURL}/consultationRoutes/logs`,
       method: "GET",
       params: {
        page, perPage, from, to, searchString, sort
       },
     
     });
     return data?.consultation
 
   };
   export const getUserAppointments = async(page, perPage, from, to, searchString, sort,id) => {
    const {data}= await api({
       url: `${baseURL}/consultationRoutes/userlogs`,
       method: "GET",
       params: {
        page, perPage, from, to, searchString, sort,id
       },
     
     });
     return data?.consultation
 
   };
   
   export const changeStatus = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/consultationRoutes/toggle-active/${id}`,
    method: "GET",
  });
  export const getAppointmentDetails = async (id) => {
    const { data } = await api({
        url: `${baseURL}/consultationRoutes/getConsultationDetails/${id}`,
        method: "GET",
    });
    return data?.consultation
}