import api, { baseURL } from "../../../utils/api";

export const getShipments = async (page, perPage, from, to, searchString, sort,) => {
    const { data } = await api({
        url: `${baseURL}/shipment/shipmentlogs`,
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
    console.log('getUsersdata', data?.user)
    return data?.shipment

};
export const createShipment = (data) =>
    api({
        url: `${baseURL}/shipment/createShipment`,
        method: "POST",
        data,
    });
    export const getShipmentDetails = (id) =>
//   console.log('id',id)
  api({
    url: `${baseURL}/shipment/getshipmentdetails/${id}`,
    method: "GET",
  });