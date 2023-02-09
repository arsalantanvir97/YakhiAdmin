import api, { baseURL } from "../../../utils/api";

export const handleGetDashboarddata = async () => {
    const { data } = await api({
        url: `${baseURL}/order/getCountofallCollection`,
        method: "GET",
    });
    console.log('getCategories', data)
    return data
};
export const getLatestOrdersHandler = async () => {
    const { data } = await api({
        url: `${baseURL}/order/getLatestOrders`,
        method: "GET",
    });
    console.log('getCategories', data)
    return data?.order
};
export const addDocument = (searchstring) =>
    api({
        url: `${baseURL}/product/searchProductlogs`,
        method: "POST",
        data: { searchString: searchstring ? searchstring : "tea" }
    });
