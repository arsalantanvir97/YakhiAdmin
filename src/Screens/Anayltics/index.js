import api, { baseURL } from "../../utils/api";

export const handleGetOverviewdata = async (year,year2,year3) => {
    const { data } = await api({
        url: `${baseURL}/order/overviewdata`,
        method: "GET",
        params: {
            year,year2,year3 
        }
    });
    console.log('getCategories', data)
    return data
};
export const getRevenueSales = async (year,year2) => {
    const { data } = await api({
        url: `${baseURL}/order/revenuedata`,
        method: "GET",
        params: {
            year,year2 
        }
    });
    console.log('getCategories', data)
    return data
};

