import axios from "axios";
import api, { baseURL } from "../../../utils/api";

export const login = (data) =>
  axios({
    url: `${baseURL}/auth/adminAuth`,
    method: "POST",
    data,
  });

  export const editAdminProfile = (data) =>
  api({
    url: `${baseURL}/auth/editProfile`,
    method: "POST",
    data,
  });
  export const resetPasswordAction = (data) =>
  axios({
    url: `${baseURL}/auth/adminresetPassword`,
    method: "POST",
    data,
  });
 
  export const verfyadnresetpasword = (data) =>
  axios({
    url: `${baseURL}/auth/verifyAndREsetPassword`,
    method: "POST",
    data,
  });
  export const manageFees = (data) =>
  api({
    url: `${baseURL}/auth/updateAppointmentFees`,
    method: "POST",
    data,
  });
  export const getDetails =async (id) =>{
    const {data}=await api({
         url: `${baseURL}/auth/getDetails`,
         method: "GET",
     })
     console.log('data',data)
 return data?.setting
 }
 
 export const timeslotAdmin = (data) =>
 api({
     url: `${baseURL}/auth/timeslotAdmin`,
     method: "POST",
     data,
 });
