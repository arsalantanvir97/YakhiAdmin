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