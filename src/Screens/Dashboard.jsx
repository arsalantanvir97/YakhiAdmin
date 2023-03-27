import axios from "axios";
import React, { useEffect, useState } from "react";
import api, { baseURL } from "../utils/api";
import Graph from "../components/Graph";
import moment from "moment";
import VecttorMap from "../components/VecttorMap";
import Toasty from "../utils/toast";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";
import { useQuery } from "react-query";
import { getLatestOrdersHandler, handleGetcategoriesummarydata, handleGetDashboarddata, handleGetordersummaryrevenuedata, handleGettopCategoriestemsSolddata } from "./Api/Dashboard";
import Loader from "../components/Loader";
import { getCategories } from "./Api/Categories";
const Dashboard = () => {
  const adminData = useRecoilValue(adminInfo);

  const [loading, setloading] = useState(false);
  const [categorytitle, setcategorytitle] = useState('');

  // const [dashboarddata, setdashboarddata] = useState();
  // const [latestorders, setlatestorders] = useState([]);
  const [year, setyear] = useState("2023");
  const [year2, setyear2] = useState("2023");
  const [year3, setyear3] = useState("2023");
  const [year4, setyear4] = useState("2023");
  const [year5, setyear5] = useState("2023");

  const [searchstring, setsearchstring] = useState("");
  const [category, setcategory] = useState("");

  const [searchedResult, setsearchedResult] = useState([]);
  const [orders, setorders] = useState([]);
  const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
    getCategories()
  );


  const { isLoading, data: dashboarddata } = useQuery(["dashboarddata", year,
    year3], () =>
    handleGetDashboarddata(year,
      year3),
    console.log('abc',)
  );

  const { data: ordersummaryrevenuedata } = useQuery(["ordersummaryrevenue", year2,
  ], () =>
    handleGetordersummaryrevenuedata(year2,
    ),
    console.log('abc',)
  );
  const { data: categoriesummarydata } = useQuery(["categoriesummary", year4, category
  ], () =>
  handleGetcategoriesummarydata(year4, category
    ),
    console.log('abc',)
  );
  const { data: topCategoriestemsSolddata } = useQuery(["topCategoriestemsSold", year5
], () =>
handleGettopCategoriestemsSolddata(year5
  ),
  console.log('abc',)
);

  

  const settingDataHandler = (data) => {
    const dataa = JSON.parse(data)
    console.log('data', dataa, dataa?._id)
    setcategory(dataa?._id)
    setcategorytitle(dataa?.categorytitle)

  }
  const getCatName = (id) => {
    let data = allofcategory.find(o => o?._id == id);
    return data?.categorytitle
  }
  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration" className>
                <div className="row">
                  <div className="col-12">
                    <div className="card rounded">
                      <div className="card-body p-md-2 p-lg-3 p-xl-4">
                        <div className="page-title mb-0">
                          <div className="row">
                            <div className="col-12 col-sm-12">
                              <h1>Dashboard</h1>
                            </div>
                          </div>
                        </div>
                        <div className="card-dashboard mt-3 mb-3">
                          <div className="row">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-2 d-flex align-items-stretch box-6">
                              <div className="card">
                                <div className="card-body d-flex align-items-center">
                                  <div className="media d-flex align-items-center w-100">
                                    <div className="media-body text-left">
                                      <div className="card-title">TOTAL Users</div>
                                      <h3>{dashboarddata?.user}</h3>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                              <div className="card">
                                <div className="card-body d-flex align-items-center">
                                  <div className="media d-flex align-items-center w-100">
                                    <div className="media-body text-left ">
                                      <div className="card-title">TOTAL ORDERS</div>
                                      <h3>{dashboarddata?.orderr}</h3>
                                    </div>

                                  </div>
                                </div>
                              </div>
                            </div>

                          </div>
                        </div>
                        {/* grap */}
                        <div className="dataTables_wrapper mb-3">
                          <div className="user-listing-top">
                            <div className="row align-items-end d-flex mb-1">
                              <div className="col-xl-12">
                                <div className="row align-items-center">
                                  {/* <div className="col-xl-2 col-md-6 col-12">
                                    <label htmlFor className="d-block">From</label>
                                    <input type="date" className="form-control form-control-sm" />
                                  </div>
                                  <div className="col-xl-2 col-md-6 col-12">
                                    <label htmlFor className="d-block">To</label>
                                    <input type="date" className="form-control form-control-sm" />
                                  </div> */}
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
                        <div className="row mb-5">
                          <div className="col-6 col-md-6">
                            <div className="totalMain">
                              <div className="row">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                  <h2>Total User</h2>
                                </div>
                              </div>
                              <div className="chart-main position-relative">
                                <div className="row">
                                  <div className="col-12 col-xl-12 text-center">
                                    <Graph
                                      graph_data={dashboarddata?.user_graph}
                                      label='Users'

                                    />                                    {/* <p class="text-dark mt-2">Months</p> */}
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
                                      graph_data={dashboarddata?.graph_data}
                                      label='Orders'

                                    />                                        {/* <p class="text-dark mt-2">Months</p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* grap */}
                        {/* Summary */}
                        <div className="row mb-5">
                          <div className="col-6 col-md-6">
                            <div className="summaryLeft">
                              <div className="row">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                  <h2>Overall Summary</h2>
                                </div>
                              </div>
                              <div className="summaryLeftBox">
                                <div className="row mb-2">
                                  <div className="col-12 col-xl-12">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <img src="images/summaryIcon1.png" alt="" />
                                      </div>
                                      <div className="ml-1">
                                        <h5>Net Sale This Month</h5>
                                        <h4>${dashboarddata?.netSalesMonth[0]?.total}</h4>
                                      </div>
                                    </div>
                                  </div>

                                </div>
                                <div className="row mb-1">
                                  <div className="col-12 col-xl-12">
                                    <div className="d-flex align-items-center">
                                      <div>
                                        <img src="images/summaryIcon2.png" alt="" />
                                      </div>
                                      <div className="ml-1">
                                        <h5>Top Seller This Month (Sold {dashboarddata?.topSeller[0]?.topSeller} )</h5>
                                        <h4>{dashboarddata?.topSeller[0]?._id}</h4>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-xl-6 px-0">
                                    <div className="summaryLeftBoxBott">
                                      <h5>Awaiting Processing</h5>
                                      <h4>750 Orders</h4>
                                    </div>
                                  </div>
                                  <div className="col-12 col-xl-6 px-0">
                                    <div className="summaryLeftBoxBott">
                                      <h5>Low In Stock</h5>
                                      <h4>04 Products</h4>
                                    </div>
                                  </div>
                                  <div className="col-12 col-xl-6 px-0">
                                    <div className="summaryLeftBoxBott">
                                      <h5>On Hold</h5>
                                      <h4>150 Orders</h4>
                                    </div>
                                  </div>
                                  <div className="col-12 col-xl-6 px-0">
                                    <div className="summaryLeftBoxBott">
                                      <h5>Out Of Stock</h5>
                                      <h4>03 Products</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-6 col-md-6">
                            <div className="summaryRight">
                              <div className="row">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-1">
                                  <h2>Products Summary</h2>
                                </div>
                              </div>
                              <div className="summaryLeftBox">
                                <div className="row">
                                  <div className="col-12 col-xl-12">
                                    <h5>Top Products- Items Sold</h5>
                                  </div>
                                  <div className="col-12 col-xl-12">
                                    <div className="main-tabble table-responsive">
                                      <div className="dataTables_wrapper dt-bootstrap4 no-footer">
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
                                                {dashboarddata?.overallTopSeller?.length > 0 && dashboarddata?.overallTopSeller?.map((top) => (
                                                  <tr>
                                                    <td>{top?._id}</td>
                                                    <td>{top?.topSeller}</td>
                                                    <td>${top?.netSales}</td>
                                                  </tr>))}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Summary */}
                        {/* Order Summary */}
                        <div className="row mt-5 pt-5">
                          <div className="col-12 col-md-12">
                            <div className>
                              <div className="row mb-2">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                  <h2>Order Summary</h2>
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
                                        {/* <div className="col-xl-2 col-md-6 col-12">
                                          <label htmlFor className="d-block">Select Order</label>
                                          <select name className="w-100 form-control sort-select" id>
                                            <option value>All</option>
                                            <option value>1</option>
                                            <option value>2</option>
                                            <option value>3</option>
                                          </select>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-dashboard mb-3">
                                <div className="row">
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-left">
                                            <div className="card-title">Orders</div>
                                            <h3>{ordersummaryrevenuedata?.ordersummarydata?.length > 0 && ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length > 0 ? ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-left ">
                                            <div className="card-title">Net Sales</div>
                                            <h3>${ordersummaryrevenuedata?.ordersummarydata?.length > 0 && ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-left ">
                                            <div className="card-title">Average Order Value</div>
                                            <h3>${ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count / ordersummaryrevenuedata?.ordersummarydata[0]?.data?.length : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-left ">
                                            <div className="card-title">Average Item Per Order</div>
                                            <h3>${(ordersummaryrevenuedata?.ordersummarydata[0]?.count ? ordersummaryrevenuedata?.ordersummarydata[0]?.count / ordersummaryrevenuedata?.allitems?.length : 0).toFixed(2)}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chart-main position-relative">
                                <div className="row">
                                  <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                    <h2>Orders Revenue</h2>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12 col-xl-12 text-center">
                                    <Graph
                                      graph_data={ordersummaryrevenuedata?.ordergraph}
                                      label='Revenue'
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Order Summary */}
                        {/* Order Summary */}
                        <div className="row mt-5 pt-5">
                          <div className="col-12 col-md-12">
                            <div className>
                              <div className="row mb-2">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                  <h2>Order Summary</h2>
                                </div>
                              </div>
                              <div className="dataTables_wrapper">
                                <div className="user-listing-top">
                                  <div className="row align-items-end d-flex">
                                    <div className="col-xl-12">
                                      <div className="row align-items-center">

                                        <div className="select-input">
                                          <label htmlFor className="d-block">Select Year</label>

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
                                        {/* <div className="col-xl-2 col-md-6 col-12">
                                          <label htmlFor className="d-block">Select  Status</label>
                                          <select name className="w-100 form-control sort-select" id>
                                            <option value>Processing</option>
                                          </select>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="main-tabble table-responsive">
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <table className="table table-borderless dataTable">
                                        <thead>
                                          <tr>
                                            <th>Orders</th>
                                            <th>Status</th>
                                            <th>Total</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {dashboarddata?.limitedOrders?.length > 0 && dashboarddata?.limitedOrders?.map(lim => (
                                            <tr>
                                              <td>#{lim?._id} {lim?.user?.firstname + ' ' + lim?.user?.lastname} </td>
                                              <td>{lim?.status}</td>
                                              <td>${lim?.totalPrice}</td>
                                            </tr>))}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Order Summary */}
                        {/* Categories Summary */}
                        <div className="row mt-2">
                          <div className="col-12 col-md-12">
                            <div className>
                              <div className="row mb-2">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                  <h2>Categories Summary</h2>
                                </div>
                              </div>
                              <div className="dataTables_wrapper mb-3">
                                <div className="user-listing-top">
                                  <div className="row align-items-end d-flex mb-1">
                                    <div className="col-xl-12">
                                      <div className="row align-items-center">
                                        <div className="select-input">
                                          <label htmlFor className="d-block">Select Year</label>

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
                                        <div className="col-xl-2 col-md-6 col-12">
                                          <label htmlFor className="d-block">Select Category </label>
                                          <select value={category}
                                            onChange={(e) => {
                                              settingDataHandler(e.target.value)
                                              // setcategorytitle(JSON.parse(e.target.value?._id))
                                              // setcategory(JSON.parse(e.target.value?.categorytitle))

                                            }} name className="w-100 form-control sort-select" id>
                                            <option value>Select Categories </option>
                                            {allofcategory?.length > 0 && allofcategory?.map(allcat => (
                                              <option value={JSON.stringify(allcat)}>
                                                {allcat?.categorytitle}
                                              </option>

                                            ))}
                                          </select>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="card-dashboard mb-3">
                                <div className="row">
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-center py-2">
                                            <div className="card-title">Items Sold</div>
                                            <h3>{categoriesummarydata?.categoryOrders[0]?.topSeller ? categoriesummarydata?.categoryOrders[0]?.topSeller : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-center py-2">
                                            <div className="card-title">Net Sales</div>
                                            <h3>${categoriesummarydata?.categoryOrders[0]?.netSales ? categoriesummarydata?.categoryOrders[0]?.netSales : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-4 mb-2 d-flex align-items-stretch box-6">
                                    <div className="card">
                                      <div className="card-body d-flex align-items-center">
                                        <div className="media d-flex align-items-center w-100">
                                          <div className="media-body text-center py-2">
                                            <div className="card-title">Orders</div>
                                            <h3>{categoriesummarydata?.totalorders?.length > 0 ? categoriesummarydata?.totalorders?.length : 0}</h3>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="chart-main position-relative">
                                <div className="row">
                                  <div className="col-12 col-xl-12 text-center">
                                    <Graph
                                      graph_data={categoriesummarydata?.categorygraph}
                                      label='Items Sold'
                                    />
                                    <p className="text-dark mt-2">{categorytitle}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Categories Summary */}
                        {/* Top Categories Items Sold */}
                        <div className="row mt-5 pt-5">
                          <div className="col-12 col-md-12">
                            <div className>
                              <div className="row mb-2">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                  <h2>Top Categories Items Sold</h2>
                                </div>
                              </div>
                              <div className="dataTables_wrapper">
                                <div className="user-listing-top">
                                  <div className="row align-items-end d-flex">
                                    <div className="col-xl-12">
                                      <div className="row align-items-center">
                                        <div className="select-input">
                                          <label htmlFor className="d-block">Select Year</label>

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
                                        {/* <div className="col-xl-2 col-md-6 col-12">
                                          <label htmlFor className="d-block">Select Order Status</label>
                                          <select name className="w-100 form-control sort-select" id>
                                            <option value>Processing</option>
                                          </select>
                                        </div> */}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="main-tabble table-responsive">
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                  <div className="row">
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
                                          {topCategoriestemsSolddata?.topCategoiresItemsSoldbyyear?.length > 0 && topCategoriestemsSolddata?.topCategoiresItemsSoldbyyear?.map(dash => (
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
                            </div>
                          </div>
                        </div>
                        {/* Top Categories Items Sold */}
                        {/* Post Summary */}
                        <div className="row postSummary">
                          <div className="col-md-6">
                            <div className="postSummaryLeft">
                              <div className="row mb-2">
                                <div className="col-12 d-flex justify-content-between tckt-srch-row text-left">
                                  <h2>Post Summary</h2>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-md-6">
                                  <div className="postSummaryLeftMain">
                                    <h4 className="text-danger">Top Posts</h4>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className>Homepage</a>
                                      <h5>2110 views</h5>
                                    </div>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className>Eat To Live</a>
                                      <h5>2110 views</h5>
                                    </div>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className>Shop With Us</a>
                                      <h5>2110 views</h5>
                                    </div>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className>Herbal Store</a>
                                      <h5>2110 views</h5>
                                    </div>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className>My Shop Account</a>
                                      <h5>2110 views</h5>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="postSummaryLeftMain">
                                    <h4 className="text-danger">Top Searchers</h4>
                                    <div className="postSummaryLeftBox mb-2">
                                      <a href="#" className="text-dark">Yakhi Awakened</a>
                                      <a href="#" className="text-dark">Yakhi Awakened 3 Bitters</a>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-md-12">
                                  <div className="postSummaryMain">
                                    <a href="#" className="btn btn-primary">View All Stats</a>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Post Summary */}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      }
    </div>
  );
};

export default Dashboard;
