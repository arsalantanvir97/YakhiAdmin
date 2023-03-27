import React, { useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import Graph from '../components/Graph';
import { getRevenueSales, handleGetOverviewdata } from './Anayltics';
import { getCategories } from './Api/Categories';

const Analytics = () => {
    const [year, setyear] = useState("2023");
    const [year2, setyear2] = useState("2023");
    const [year3, setyear3] = useState("2023");
    const [year4, setyear4] = useState("2023");
    const [year5, setyear5] = useState("2023");

    const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
        getCategories()
    );

    const { isLoading, data: overview } = useQuery(["overview", year, year2, year3
    ], () =>
        handleGetOverviewdata(year, year2, year3
        ),
        console.log('abc',)
    );
    const { data: analyticsdata } = useQuery(["revenue", year4, year5
    ], () =>
        getRevenueSales(year4, year5
        ),
        console.log('abc',)
    );


    const getCatName = (id) => {
        let data = allofcategory?.find(o => o?._id == id);
        return data?.categorytitle
    }
    return (
        <div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body">
                    {/* Basic form layout section start */}
                    <section id="configuration" className>
                        <div className="row">
                            <div className="col-12">
                                <div className="card rounded">
                                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                                        <div className="page-title mb-3">
                                            <div className="row">
                                                <div className="col-12 col-sm-12">
                                                    <h1>Analytics</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row analyticsTabs">
                                            <div className="col-md-12 ">
                                                <nav>
                                                    <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                                        <a className="nav-item nav-link active" id="nav-overview-tab" data-toggle="tab" href="#nav-overview" role="tab" aria-controls="nav-overview" aria-selected="true">overview</a>
                                                        <a className="nav-item nav-link" id="nav-revenue-tab" data-toggle="tab" href="#nav-revenue" role="tab" aria-controls="nav-revenue" aria-selected="false" >revenue</a>
                                                        <a className="nav-item nav-link" id="nav-orders-tab" data-toggle="tab" href="#nav-orders" role="tab" aria-controls="nav-orders" aria-selected="false">orders</a>
                                                        <a className="nav-item nav-link" id="nav-products-tab" data-toggle="tab" href="#nav-products" role="tab" aria-controls="nav-products" aria-selected="false">products</a>
                                                        <a className="nav-item nav-link" id="nav-categories-tab" data-toggle="tab" href="#nav-categories" role="tab" aria-controls="nav-categories" aria-selected="false">Categories</a>
                                                    </div>
                                                </nav>
                                                <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                                    <div className="tab-pane fade show active" id="nav-overview" role="tabpanel" aria-labelledby="nav-overview-tab">
                                                        {/* overview */}
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                                                            <h2>Date Range</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dataTables_wrapper mb-3">
                                                                        <div className="user-listing-top">
                                                                            <div className="row align-items-end d-flex mb-1">
                                                                                <div className="col-xl-12">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="select-input">
                                                                                            <select
                                                                                                name
                                                                                                id
                                                                                                value={year}
                                                                                                onChange={(e) => {
                                                                                                    setyear(e.target.value);
                                                                                                }}
                                                                                            >
                                                                                                <option>Year</option>
                                                                                                <option value={"2020"}>2020</option>
                                                                                                <option value={"2021"}>2021</option>
                                                                                                <option value={"2022"}>2022</option>
                                                                                                <option value={"2023"}>2023</option>
                                                                                                <option value={"2024"}>2024</option>
                                                                                                <option value={"2025"}>2025</option>
                                                                                                <option value={"2026"}>2026</option>
                                                                                                <option value={"2027"}>2027</option>
                                                                                            </select>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Performance</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-dashboard mb-3">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">TOTAL SALE</div>
                                                                                                <h3>${overview?.overvieworders[0]?.count ? overview?.overvieworders[0]?.count : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">net SALE</div>
                                                                                                <h3>${overview?.overvieworders[0]?.count ? overview?.overvieworders[0]?.count : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">ORDER</div>
                                                                                                <h3>{overview?.overvieworders[0]?.data?.length > 0 ? overview?.overvieworders[0]?.data?.length : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">products solds</div>
                                                                                                <h3>{overview?.allproducts?.length}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">Visitors</div>
                                                                                                <h3>12045</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">views</div>
                                                                                                <h3>14870</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Chart</h2>
                                                                            <div className="d-flex width-15-per">
                                                                                <select
                                                                                    name
                                                                                    id
                                                                                    value={year2}
                                                                                    onChange={(e) => {
                                                                                        setyear2(e.target.value);
                                                                                    }}
                                                                                >
                                                                                    <option>Year</option>
                                                                                    <option value={"2020"}>2020</option>
                                                                                    <option value={"2021"}>2021</option>
                                                                                    <option value={"2022"}>2022</option>
                                                                                    <option value={"2023"}>2023</option>
                                                                                    <option value={"2024"}>2024</option>
                                                                                    <option value={"2025"}>2025</option>
                                                                                    <option value={"2026"}>2026</option>
                                                                                    <option value={"2027"}>2027</option>
                                                                                </select>
                                                                                <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                    <div className="row mb-5">
                                                                        <div className="col-6 col-md-6">
                                                                            <div className="totalMain">
                                                                                <div className="row">
                                                                                    <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                                                                        <h2>Net Sales</h2>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="chart-main position-relative">
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-xl-12 text-center">
                                                                                            <Graph
                                                                                                graph_data={overview?.orderbysalesgraph}
                                                                                                label='Net Sales'
                                                                                            />                                                                                            {/* <p class="text-dark mt-2">Months</p> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6 col-md-6">
                                                                            <div className="totalMain">
                                                                                <div className="row">
                                                                                    <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                                                                        <h2>Total Orders</h2>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="chart-main position-relative">
                                                                                    <div className="row">
                                                                                        <div className="col-12 col-xl-12 text-center">
                                                                                            <Graph
                                                                                                graph_data={overview?.totalordergraph}
                                                                                                label='Orders'

                                                                                            />                                                                                                     {/* <p class="text-dark mt-2">Months</p> */}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Leaderboards</h2>
                                                                            {/* <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button> */}
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-5">

                                                                        <div className="col-6 col-md-6">
                                                                            <div className="select-input">
                                                                                <select
                                                                                    name
                                                                                    id
                                                                                    value={year3}
                                                                                    onChange={(e) => {
                                                                                        setyear3(e.target.value);
                                                                                    }}
                                                                                >
                                                                                    <option>Year</option>
                                                                                    <option value={"2020"}>2020</option>
                                                                                    <option value={"2021"}>2021</option>
                                                                                    <option value={"2022"}>2022</option>
                                                                                    <option value={"2023"}>2023</option>
                                                                                    <option value={"2024"}>2024</option>
                                                                                    <option value={"2025"}>2025</option>
                                                                                    <option value={"2026"}>2026</option>
                                                                                    <option value={"2027"}>2027</option>
                                                                                </select>
                                                                            </div>
                                                                            <div className="">
                                                                                <div className="row">

                                                                                    {/* <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3 border-bottom pb-1">
                                                                                        <h2>Top Categories - Items Sold</h2>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <p className="py-5 text-center">No Date Ecoreded For The Selected Time Period</p>
                                                                                    </div> */}
                                                                                    <div className="col-sm-12">
                                                                                        <table className="table table-borderless dataTable">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Orders</th>
                                                                                                    <th>Items Sold</th>
                                                                                                    <th>Net Sales</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {overview?.topCategoiresItemsSoldbyyear?.length > 0 && overview?.topCategoiresItemsSoldbyyear?.map(dash => (
                                                                                                    <tr>
                                                                                                        <td>{getCatName(dash?._id[0])}</td>
                                                                                                        <td>{dash?.topSeller}</td>
                                                                                                        <td>${dash?.netSales}</td>
                                                                                                    </tr>))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-6 col-md-6">
                                                                            <div className="">
                                                                                <div className="row">
                                                                                    <div className="col-sm-12">
                                                                                        <table className="table table-borderless dataTable">
                                                                                            <thead>
                                                                                                <tr>
                                                                                                    <th>Products</th>
                                                                                                    <th>Items Sold</th>
                                                                                                    <th>Net Sales</th>
                                                                                                </tr>
                                                                                            </thead>
                                                                                            <tbody>
                                                                                                {overview?.overallTopSeller?.length > 0 && overview?.overallTopSeller?.map((top) => (
                                                                                                    <tr>
                                                                                                        <td>{top?._id}</td>
                                                                                                        <td>{top?.topSeller}</td>
                                                                                                        <td>${top?.netSales}</td>
                                                                                                    </tr>))}
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </div>
                                                                                    {/* <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3 border-bottom pb-1">
                                                                                        <h2>Top Orders - Items Sold</h2>
                                                                                    </div>
                                                                                    <div className="col-md-12">
                                                                                        <p className="py-5 text-center">No Date Ecoreded For The Selected Time Period</p>
                                                                                    </div> */}
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* overview */}
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-revenue" role="tabpanel" aria-labelledby="nav-revenue-tab">
                                                        {/* revenue */}
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                                                            <h2>Date Range</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dataTables_wrapper mb-3">
                                                                        <div className="user-listing-top">
                                                                            <div className="row align-items-end d-flex mb-1">
                                                                                <div className="col-xl-12">
                                                                                    <div className="select-input">
                                                                                        <select
                                                                                            name
                                                                                            id
                                                                                            value={year4}
                                                                                            onChange={(e) => {
                                                                                                setyear4(e.target.value);
                                                                                            }}
                                                                                        >
                                                                                            <option>Year</option>
                                                                                            <option value={"2020"}>2020</option>
                                                                                            <option value={"2021"}>2021</option>
                                                                                            <option value={"2022"}>2022</option>
                                                                                            <option value={"2023"}>2023</option>
                                                                                            <option value={"2024"}>2024</option>
                                                                                            <option value={"2025"}>2025</option>
                                                                                            <option value={"2026"}>2026</option>
                                                                                            <option value={"2027"}>2027</option>
                                                                                        </select>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Performance</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-dashboard mb-3">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">gross SALE</div>
                                                                                                <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">net SALE</div>
                                                                                                <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">promocodes</div>
                                                                                                <h3>0</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">total sales</div>
                                                                                                <h3>${analyticsdata?.overvieworders[0]?.count ? analyticsdata?.overvieworders[0]?.count : 0}</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">taxes</div>
                                                                                                <h3>0</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Gross Sales</h2>
                                                                            <div className="select-input">
                                                                                <select
                                                                                    name
                                                                                    id
                                                                                    value={year5}
                                                                                    onChange={(e) => {
                                                                                        setyear5(e.target.value);
                                                                                    }}
                                                                                >
                                                                                    <option>Year</option>
                                                                                    <option value={"2020"}>2020</option>
                                                                                    <option value={"2021"}>2021</option>
                                                                                    <option value={"2022"}>2022</option>
                                                                                    <option value={"2023"}>2023</option>
                                                                                    <option value={"2024"}>2024</option>
                                                                                    <option value={"2025"}>2025</option>
                                                                                    <option value={"2026"}>2026</option>
                                                                                    <option value={"2027"}>2027</option>
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                    <div className="chart-main position-relative">
                                                                        <div className="row">
                                                                            <div className="col-12 col-xl-12 text-center">
                                                                                <Graph
                                                                                    graph_data={analyticsdata?.orderbysalesgraph}
                                                                                    label='Gross Sales'
                                                                                />                                                                                     <p className="text-dark mt-2">Months</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Leaderboards</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-12 col-md-12">
                                                                            <div className>
                                                                                <div className="main-tabble table-responsive">
                                                                                    <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                                                                        <div className="row">
                                                                                            <div className="col-sm-12">
                                                                                                <table className="table table-borderless dataTable">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Date</th>
                                                                                                            <th>Orders</th>
                                                                                                            <th>Gross sales</th>
                                                                                                            <th>Promocodes</th>
                                                                                                            <th>Net sales</th>
                                                                                                            <th>Taxes</th>
                                                                                                            <th>Total sales</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="d-flex">
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Days:</h5>
                                                                                    <p>07</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">orders:</h5>
                                                                                    <p>07</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Gross sales:</h5>
                                                                                    <p>$200</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Promocodes:</h5>
                                                                                    <p>$20</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Net sales:</h5>
                                                                                    <p>07</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">taxes:</h5>
                                                                                    <p>$200</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Total sales:</h5>
                                                                                    <p>$200</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* revenue */}
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab">
                                                        {/* orders */}
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                                                            <h2>Date Range</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dataTables_wrapper mb-3">
                                                                        <div className="user-listing-top">
                                                                            <div className="row align-items-end d-flex mb-1">
                                                                                <div className="col-xl-12">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">From</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">To</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Performance</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-dashboard mb-3">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">orders</div>
                                                                                                <h3>7000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">net SALE</div>
                                                                                                <h3>1200.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">average order value</div>
                                                                                                <h3>10,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">average items per oders</div>
                                                                                                <h3>2,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Orders</h2>
                                                                            <div className="d-flex width-15-per">
                                                                                <select name className="w-100 form-control sort-select mr-1" id>
                                                                                    <option value>By Week</option>
                                                                                </select>
                                                                                <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                    <div className="chart-main position-relative">
                                                                        <div className="row">
                                                                            <div className="col-12 col-xl-12 text-center">
                                                                                <img src="images/sales-stats.png" alt="" />
                                                                                <p className="text-dark mt-2">Months</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Leaderboards</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-12 col-md-12">
                                                                            <div className>
                                                                                <div className="main-tabble table-responsive">
                                                                                    <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                                                                        <div className="row">
                                                                                            <div className="col-sm-12">
                                                                                                <table className="table table-borderless dataTable">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Date</th>
                                                                                                            <th>Orders</th>
                                                                                                            <th>Gross sales</th>
                                                                                                            <th>Promocodes</th>
                                                                                                            <th>Net sales</th>
                                                                                                            <th>Taxes</th>
                                                                                                            <th>Total sales</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>No Data Display</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="d-flex">
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Days:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">orders:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Gross sales:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Promocodes:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Net sales:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">taxes:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Total sales:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* orders */}
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-products" role="tabpanel" aria-labelledby="nav-products-tab">
                                                        {/* products */}
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                                                            <h2>Date Range</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dataTables_wrapper mb-3">
                                                                        <div className="user-listing-top">
                                                                            <div className="row align-items-end d-flex mb-1">
                                                                                <div className="col-xl-12">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">From</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">To</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Performance</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-dashboard mb-3">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">items solds</div>
                                                                                                <h3>7000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">net SALE</div>
                                                                                                <h3>1200.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">orders</div>
                                                                                                <h3>10,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">average items per oders</div>
                                                                                                <h3>2,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Products</h2>
                                                                            <div className="d-flex width-15-per">
                                                                                <select name className="w-100 form-control sort-select mr-1" id>
                                                                                    <option value>By Week</option>
                                                                                </select>
                                                                                <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                    <div className="chart-main position-relative">
                                                                        <div className="row">
                                                                            <div className="col-12 col-xl-12 text-center">
                                                                                <img src="images/sales-stats.png" alt="" />
                                                                                <p className="text-dark mt-2">Months</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Leaderboards</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-12 col-md-12">
                                                                            <div className>
                                                                                <div className="main-tabble table-responsive">
                                                                                    <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                                                                        <div className="row">
                                                                                            <div className="col-sm-12">
                                                                                                <table className="table table-borderless dataTable">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Products Title</th>
                                                                                                            <th>Items Solds</th>
                                                                                                            <th>Net Sales</th>
                                                                                                            <th>Orders</th>
                                                                                                            <th>Categories</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>No Data Display</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="d-flex">
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Products:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Items Solds::</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Net Sales:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">orders:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* products */}
                                                    </div>
                                                    <div className="tab-pane fade" id="nav-categories" role="tabpanel" aria-labelledby="nav-categories-tab">
                                                        {/* revenue */}
                                                        <div className="row">
                                                            <div className="col-12 col-md-12">
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                                                            <h2>Date Range</h2>
                                                                        </div>
                                                                    </div>
                                                                    <div className="dataTables_wrapper mb-3">
                                                                        <div className="user-listing-top">
                                                                            <div className="row align-items-end d-flex mb-1">
                                                                                <div className="col-xl-12">
                                                                                    <div className="row align-items-center">
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">From</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                        <div className="col-xl-2 col-md-6 col-12">
                                                                                            <label htmlFor className="d-block">To</label>
                                                                                            <input type="date" className="form-control form-control-sm" />
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Performance</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    <div className="card-dashboard mb-3">
                                                                        <div className="row">
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">items solds</div>
                                                                                                <h3>7000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">net SALE</div>
                                                                                                <h3>1200.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">orders</div>
                                                                                                <h3>10,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                                <div className="card">
                                                                                    <div className="card-body d-flex align-items-center">
                                                                                        <div className="media d-flex align-items-center w-100">
                                                                                            <div className="media-body text-left py-1">
                                                                                                <div className="card-title">average items per oders</div>
                                                                                                <h3>2,000.00</h3>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Categories</h2>
                                                                            <div className="d-flex width-15-per">
                                                                                <select name className="w-100 form-control sort-select mr-1" id>
                                                                                    <option value>By Week</option>
                                                                                </select>
                                                                                <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                    <div className="chart-main position-relative">
                                                                        <div className="row">
                                                                            <div className="col-12 col-xl-12 text-center">
                                                                                <img src="images/sales-stats.png" alt="" />
                                                                                <p className="text-dark mt-2">Months</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* grap */}
                                                                </div>
                                                                <div className="bg-gray p-3 mb-3">
                                                                    <div className="row mb-2">
                                                                        <div className="col-12 d-flex justify-content-between tckt-srch-row text-left border-bottom pb-1">
                                                                            <h2>Leaderboards</h2>
                                                                            <button className="performanceEllipsisIcon"><i className="fas fa-ellipsis-v" /></button>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-12 col-md-12">
                                                                            <div className>
                                                                                <div className="main-tabble table-responsive">
                                                                                    <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                                                                        <div className="row">
                                                                                            <div className="col-sm-12">
                                                                                                <table className="table table-borderless dataTable">
                                                                                                    <thead>
                                                                                                        <tr>
                                                                                                            <th>Category</th>
                                                                                                            <th>Items Solds</th>
                                                                                                            <th>Net Sales</th>
                                                                                                            <th>Products</th>
                                                                                                            <th>Orders</th>
                                                                                                        </tr>
                                                                                                    </thead>
                                                                                                    <tbody>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                        <tr>
                                                                                                            <td>dd\mm\yyyy</td>
                                                                                                            <td>10</td>
                                                                                                            <td>$100</td>
                                                                                                            <td>$10</td>
                                                                                                            <td>$100</td>
                                                                                                        </tr>
                                                                                                    </tbody>
                                                                                                </table>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    {/* Top Categories Items Sold */}
                                                                    <div className="row">
                                                                        <div className="col-md-12">
                                                                            <div className="d-flex">
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Categories:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Items Solds:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">Net Sales:</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                                <div className="d-flex mr-2">
                                                                                    <h5 className="mr-1">orders::</h5>
                                                                                    <p>0</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* revenue */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>

    )
}

export default Analytics