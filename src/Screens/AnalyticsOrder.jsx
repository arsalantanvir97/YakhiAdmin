import moment from 'moment/moment';
import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import Graph from '../components/Graph';
import { getRevenueSales } from './Anayltics';
import { getCategories } from './Api/Categories';
import { Link } from 'react-router-dom';
import { handleGetordersummaryrevenuedata } from './Api/Dashboard';
import { getAllOrdersLogs, getOrders } from './Api/Orders';
import SearchFilter from '../components/SearchFilter';
import Calender from '../components/Calender';
import Pagination from '../components/Padgination';
import Loader from '../components/Loader';

const AnalyticsOrder = ({ history }) => {
    const [sort, setsort] = useState();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchString, setSearchString] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [status, setStatus] = useState("");
    const inputRef = useRef(null);


    const { isFetching, isLoading, data: orders, status: ordstatus, refetch } = useQuery({
        queryKey: ["allorderslogs", page, perPage, from, to, status, searchString, sort,],
        queryFn: () => getAllOrdersLogs(page, perPage, from, status, to, searchString, sort,),
        keepPreviousData: true

    });

    // const [hideDownload, sethideDownload] = useState(false);


    const [year2, setyear2] = useState("2023");

    const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
        getCategories()
    );


    const getCatName = (id) => {
        let data = allofcategory?.find(o => o?._id == id);
        return data?.categorytitle
    }
    const { data: ordersummaryrevenuedata } = useQuery(["ordersummaryrevenue", year2,
    ], () =>
        handleGetordersummaryrevenuedata(year2,
        ),
        console.log('abc',)
    );



    // const addHandler=()=>{

    // }
    return (
        <div>
                {isLoading ?  <Loader/> :

             <div className="app-content content dashboard">
            <div className="content-wrapper">
                <div className="content-body dashCard">
                    {/* Basic form layout section start */}
                    <section id="configuration">
                        <div className="row dashboardMain">
                            <div className="col-12">
                                <div className="py-5 px-5 mb-5">
                                    <div className="row justify-content-center mb-3">
                                        <div className="col-md-12">
                                            <div className="d-block d-md-flex justify-content-between align-items-center">
                                                <h3 className="pageTitle"> Analytics</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <ul className="nav nav-tabs tabTop" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button onClick={() => {
                                                    history?.push('/Analytics')
                                                }} className="nav-link " id="overview-tab" data-bs-toggle="tab" data-bs-target="#overview" type="button" role="tab" aria-controls="overview" aria-selected="false">Overview</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link " id="revenue-tab" data-bs-toggle="tab" data-bs-target="#revenue" type="button" role="tab" aria-controls="revenue" aria-selected="false">Revenue</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalyticsOrder')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link active" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="true">Orders</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalysisProducts')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                                            </li>
                                            <li onClick={() => {
                        history?.push('/AnalysisCategories')
                      }}  className="nav-item" role="presentation">
                                                <button className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalyticsVariation')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="variations-tab" data-bs-toggle="tab" data-bs-target="#variations" type="button" role="tab" aria-controls="variations" aria-selected="false">Variations</button>
                                            </li>
                                            <li onClick={() => {
                                                    history?.push('/Taxes')
                                                }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="taxes-tab" data-bs-toggle="tab" data-bs-target="#taxes" type="button" role="tab" aria-controls="taxes" aria-selected="false">Taxes</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/Coupans')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link" id="coupons-tab" data-bs-toggle="tab" data-bs-target="#coupons" type="button" role="tab" aria-controls="coupons" aria-selected="false">Coupons</button>
                                            </li>
                                        </ul>
                                        <div className="tab-content" id="myTabContent">

                                            <div className="tab-pane fade show active" id="overview" role="tabpanel" aria-labelledby="overview-tab">
                                                {/* Order Summary */}
                                                <div className="row mb-5">
                                                    <div className="col-12 col-md-12">
                                                        <div className>
                                                            <div className="dataTables_wrapper mb-3">
                                                                <div className="user-listing-top">
                                                                    <div className="row align-items-end d-flex mb-1">
                                                                        <div className="col-xl-12">
                                                                            <div className="row align-items-center">
                                                                                <select className="w-100 form-control sort-select"
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
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="card-dashboard p-0 mb-3">
                                                                <div className="row">
                                                                    <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center">
                                                                                        <div className="card-title">Orders</div>
                                                                                        <h3>{ordersummaryrevenuedata?.ordersummarydata?.length > 0 && ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length > 0 ? ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length : 0}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Net Sales</div>
                                                                                        <h3>${ordersummaryrevenuedata?.ordersummarydata?.length > 0 && ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count : 0}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Average Order Value</div>
                                                                                        <h3>${(ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count / ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length : 0).toFixed(2)}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="py-3 col pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center ">
                                                                                        <div className="card-title">Average Items Per Oders</div>
                                                                                        <h3>${(ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count / ordersummaryrevenuedata?.allitems?.length : 0).toFixed(2)}</h3>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="chart-main position-relative mb-5">
                                                                <div className="row">
                                                                    <div className="col-12 col-xl-12 text-center py-3">
                                                                        <Graph
                                                                            graph_data={ordersummaryrevenuedata?.ordergraph}
                                                                            label='Revenue'
                                                                        />                                                                      </div>
                                                                </div>
                                                            </div>

                                                            <div className="bg-gray p-3 mb-3">
                                                                <div className="row mb-2">
                                                                    <div className="col-12 d-flex align-content-center justify-content-between tckt-srch-row">
                                                                        <h3 className="pageTitle mb-0 text-red">Orders</h3>
                                                                        
                                                                    </div>
                                                                </div>
                                                                {/* Top Categories Items Sold */}
                                                                <div className="row mb-4">
                                                                    <div className="col-xl-12 col-md-12">
                                                                        <div className="row">
                                                                            <div className="col d-lg-flex align-items-center justify-content-between">
                                                                                <SearchFilter
                                                                                    searchString={searchString}
                                                                                    setSearchString={setSearchString}
                                                                                    setPage={setPage}
                                                                                />                                <div className="dropFilter">
                                                                                    <button className="filterIcon redBg rounded-circle ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                        <i className="fas fa-filter" />
                                                                                    </button>
                                                                                    <div className="dropdown-menu filterDropdown">
                                                                                        <div className="filterDropdownHeader">
                                                                                            <p className="mainLabel m-0">Filter</p>
                                                                                        </div>
                                                                                        <div className="dropdown-divider" />
                                                                                        <div className="filterDropdownBody">
                                                                                            <div className="userInput mb-3">
                                                                                                <label htmlFor className="mainLabel">Creation Date:</label>
                                                                                                <Calender
                                                                                                    from={from}
                                                                                                    to={to}
                                                                                                    setFrom={setFrom}
                                                                                                    setTo={setTo}
                                                                                                />                                      </div>
                                                                                            <div className="userInput mb-3">
                                                                                                <label htmlFor className="mainLabel">Filter by Status:</label>
                                                                                                <div className="mb-2">
                                                                                                    <select name id className="mainInput filterInput">
                                                                                                        <option value="s">Select Status</option>
                                                                                                        <option value={1}>Active</option>
                                                                                                        <option value={2}>Inactive</option>
                                                                                                    </select>
                                                                                                </div>
                                                                                            </div>
                                                                                            <div className="filterAction">
                                                                                                <button type="button" className="btn_darkbluep">Apply</button>
                                                                                            </div>
                                                                                            <div className="filterAction">
                                                                                                <button type="button" className="btn_orangebor">Clear All</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {/* Top Categories Items Sold */}
                                                                <div className="row mb-3">
                                                                    <div className="col-12">
                                                                        <div className="maain-tabble table-responsive">
                                                                            <table className="table table-bordered zero-configuration">
                                                                                <thead>
                                                                                    <tr>
                                                                                        <th>S No.</th>
                                                                                        <th>User Name</th>
                                                                                        <th>Order ID</th>
                                                                                        <th>Date</th>
                                                                                        <th>Price</th>
                                                                                        <th>Status</th>
                                                                                        <th>Action</th>
                                                                                    </tr>
                                                                                </thead>
                                                                                <tbody>
                                                                                    {orders?.docs?.length > 0 &&
                                                                                        orders?.docs?.map((orderr, index) => (
                                                                                            <tr>
                                                                                                <td>{index + 1}</td>
                                                                                                <td>{orderr?.user?.firstname + ' ' + orderr?.user?.lastname}</td>
                                                                                                <td>{orderr?._id}</td>
                                                                                                <td> {moment
                                                                                                    .utc(orderr?.createdAt)
                                                                                                    .format("LL")}</td>
                                                                                                <td>${orderr?.totalPrice}</td>
                                                                                                <td>{orderr?.status}</td>
                                                                                                <td>
                                                                                                    <div className="dropdown">
                                                                                                        <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                            <i className="fa fa-ellipsis-v" />
                                                                                                        </button>
                                                                                                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                                                                            <li>
                                                                                                                <Link
                                                                                                                    to={`/OrderDetails/${orderr?._id}`} className="dropdown-item" ><i className="fa fa-eye" /> View</Link>
                                                                                                            </li>
                                                                                                        </ul>
                                                                                                    </div>
                                                                                                </td>
                                                                                            </tr>))}
                                                                                </tbody>
                                                                            </table>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {orders?.docs?.length > 0 && (
                                                                    <Pagination
                                                                        totalDocs={orders?.totalDocs}
                                                                        totalPages={orders?.totalPages}
                                                                        currentPage={orders?.page}
                                                                        setPage={setPage}
                                                                        hasNextPage={orders?.hasNextPage}
                                                                        hasPrevPage={orders?.hasPrevPage}
                                                                    />
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Order Summary */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>}</div>
    )
}

export default AnalyticsOrder