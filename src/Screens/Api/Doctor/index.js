import api, { baseURL } from "../../../utils/api";

export const AddDoctorr = (data) =>
    api({
        url: `${baseURL}/doctor/createdoctor`,
        method: "POST",
        data,
    });
export const getdoctor = async (page, perPage, from, to, searchString, sort) => {
    console.log('searchString', searchString)
    const { data } = await api({
        url: `${baseURL}/doctor/doctorlogs`,
        method: "GET",
        params: {
            page, perPage, from, to, searchString, sort
        },
    });
    return data?.doctor

};
export const changeStatus = (id) =>
    //   console.log('id',id)
    api({
        url: `${baseURL}/doctor/toggle-active/${id}`,
        method: "GET",
    });
export const getDoctorDetails = async (id) =>
    api({
        url: `${baseURL}/doctor/getdoctordetails/${id}`,
        method: "GET",
    });

export const editDoctor = (data) =>
    api({
        url: `${baseURL}/doctor/editdoctor`,
        method: "POST",
        data,
    });
    export const timeslotDoctor = (data) =>
    api({
        url: `${baseURL}/doctor/managetimeslot`,
        method: "POST",
        data,
    });
    export const verfyandresetpasword = (data) =>
    api({
      url: `${baseURL}/doctor/verifyAndREsetPassword`,
      method: "POST",
    });