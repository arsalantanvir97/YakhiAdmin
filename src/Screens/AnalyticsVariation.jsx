import moment from 'moment/moment';
import React, { useRef, useState } from 'react'
import { useMutation, useQuery } from 'react-query';
import Graph from '../components/Graph';
import { getRevenueSales } from './Anayltics';
import { getCategories } from './Api/Categories';
import { Link } from 'react-router-dom';
import { handleGetanalysisproductsdata, handleGetordersummaryrevenuedata } from './Api/Dashboard';
import { getAllOrdersLogs, getOrders } from './Api/Orders';
import SearchFilter from '../components/SearchFilter';
import Calender from '../components/Calender';
import Pagination from '../components/Padgination';
import Loader from '../components/Loader';

const AnalyticsVariation = ({ history }) => {
    const [sort, setsort] = useState();

    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [searchString, setSearchString] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [status, setStatus] = useState("");
    const inputRef = useRef(null);



    // const [hideDownload, sethideDownload] = useState(false);


    const [year4, setyear4] = useState("2023");

    const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
        getCategories()
    );


    const getCatName = (id) => {
        let data = allofcategory?.find(o => o?._id == id);
        return data?.categorytitle
    }
    const { data: analysisproductdata } = useQuery(["analysisproducts", year4,
    ], () =>
        handleGetanalysisproductsdata(year4,
        ),
        console.log('abc',)
    );



    // const addHandler=()=>{

    // }
    return (
        <div>
                            {catloading ?  <Loader/> :

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
                                            <li onClick={() => {
                                                history?.push('/Revenue')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link " id="revenue-tab" data-bs-toggle="tab" data-bs-target="#revenue" type="button" role="tab" aria-controls="revenue" aria-selected="false">Revenue</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalyticsOrder')
                                            }} className="nav-item" role="presentation">
                                                <button className="nav-link " id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="false">Orders</button>
                                            </li>
                                            <li onClick={() => {
                                                history?.push('/AnalysisProducts')
                                            }} className="nav-item " role="presentation">
                                                <button className="nav-link " id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                                            </li>
                                            <li onClick={() => {
                        history?.push('/AnalysisCategories')
                      }}  className="nav-item" role="presentation">
                                                <button className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                                            </li>
                                            <li  className="nav-item" role="presentation">
                                                <button className="nav-link active" id="variations-tab" data-bs-toggle="tab" data-bs-target="#variations" type="button" role="tab" aria-controls="variations" aria-selected="true">Variations</button>
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
                                                            <div className="card-dashboard p-0 mb-3">
                                                                <div className="row">
                                                                    <div className="py-3 col mb-2 d-flex align-items-stretch box-6">
                                                                        <div className="card">
                                                                            <div className="card-body d-flex align-items-center">
                                                                                <div className="media w-100">
                                                                                    <div className="media-body text-center">
                                                                                        <div className="card-title">Items Sold</div>
                                                                                        <h3>{analysisproductdata?.totalitemssold}</h3>
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
                                                                                        <div className="card-title">Net Sales</div>
                                                                                        <h3>${analysisproductdata?.netsales}</h3>
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
                                                                                        <div className="card-title">Orders</div>
                                                                                        <h3>{analysisproductdata?.totalorders?.length > 0 ? analysisproductdata?.totalorders?.length : 0}</h3>
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
                                                                            graph_data={analysisproductdata?.categorygraph}
                                                                            label='Items Sold'
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="bg-gray p-3 mb-3">
                                                                {/* <div className="row mb-2">
                                                                    <div className="col-12 d-flex align-content-center justify-content-between tckt-srch-row">
                                                                        <h3 className="pageTitle mb-0 text-red">Products</h3>

                                                                    </div>
                                                                </div> */}
                                                                {/* Top Categories Items Sold */}
                                                               
                                                                {/* <div className="col-md-12 mb-5 mt-5">
                            <div className="col-12 col-md-12">
                              <div className=" bg-white rounded-10 p-5">
                              

                                <div className="card-dashboard p-0 mb-3">
                                  <div className="row">
                                    <div className="col-12 col-xl-12">
                                      <div className="main-tabble table-responsive">
                                        <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                                          <div className="row">
                                            <div className="col-sm-12 maain-tabble">
                                              <table className="table table-borderless dataTable">
                                                <thead>
                                                  <tr>
                                                    <th>Products Title</th>
                                                    <th>Items Sold</th>
                                                    <th>Net Sales</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {analysisproductdata?.categoryOrders?.length > 0 && analysisproductdata?.categoryOrders?.map(dash => (
                                                    <tr>
                                                      <td>{dash?.data[0]?.orderItems?.name}</td>
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
                              </div>
                            </div>

                          </div> */}
                                                                {/* Top Categories Items Sold */}

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

export default AnalyticsVariation