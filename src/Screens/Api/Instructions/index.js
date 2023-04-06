import api, { baseURL } from "../../../utils/api";

export const getInstruction = async (page, perPage, from, to, status, searchString, sort) => {
    const { data } = await api({
        url: `${baseURL}/instruction/instructionlogs`,
        method: "GET",
        params: {
            page, perPage, from, to, status, searchString, sort
        },

    });
    return data

};
export const getInstructionDetails =async (id) =>{
    const {data}=await api({
         url: `${baseURL}/instruction/getInstructionDetails/${id}`,
         method: "GET",
     })
     console.log('data',data)
 return data?.instruction
 }
     
export const addInstruction = (data) =>
    api({
        url: `${baseURL}/instruction/createinstruction`,
        method: "POST",
        data,
    });
export const editInstruction = (data) =>
    api({
        url: `${baseURL}/instruction/editinstruction`,
        method: "POST",
        data,
    });
export const deleteInstruction = (id) =>
    //   console.log('id',id)
    api({
        url: `${baseURL}/document/deleteDocument/${id}`,
        method: "GET",
    });
    export const editInstructionTextHandler = (data) =>
    api({
        url: `${baseURL}/instruction/editinstructiontext`,
        method: "POST",
        data,
    });
    export const editEattoliveTextHandler = (data) =>
    api({
        url: `${baseURL}/instruction/editinstructiontext`,
        method: "POST",
        data,
    });
    