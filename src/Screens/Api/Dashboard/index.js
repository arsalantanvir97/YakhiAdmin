import api, { baseURL } from "../../../utils/api";

export const handleGetDashboarddata = async (year,
    year3 ) => {
    const { data } = await api({
        url: `${baseURL}/order/getCountofallCollection`,
        method: "GET",
        params: {
            year,
            year3
        }
    });
    console.log('getCategories', data)
    return data
};
export const handleGetordersummaryrevenuedata = async (year2,
    ) => {
    const { data } = await api({
        url: `${baseURL}/order/ordersummaryrevenue`,
        method: "GET",
        params: {
            year2,
            
        }
    });
    console.log('getCategories', data)
    return data
};
export const handleGettopCategoriestemsSolddata = async (year5,
    ) => {
    const { data } = await api({
        url: `${baseURL}/order/topCategoriestemsSold`,
        method: "GET",
        params: {
            year5,
            
        }
    });
    console.log('getCategories', data)
    return data
};


export const handleGetcategoriesummarydata = async (year4,category) => {
    const { data } = await api({
        url: `${baseURL}/order/categoriesummary`,
        method: "GET",
        params: {
            year4,category,
            
        }
    });
    console.log('getCategories', data)
    return data
};
export const handleGetanalysisproductsdata = async (year4) => {
    const { data } = await api({
        url: `${baseURL}/order/analysisproducts`,
        method: "GET",
        params: {
            year4,
            
        }
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
