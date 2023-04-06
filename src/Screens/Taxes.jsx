import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { closeModals } from "../utils/closeModals";
import { addTax, deleteTax, editTax, getTaxes } from "./Api/Auth/Taxes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";

const Taxes = ({ history }) => {

  const usequeryClient = new useQueryClient();

  const [state, setstate] = useState("");
  const [percent, setpercent] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [taxid, settaxid] = useState();
  const [status, setStatus] = useState("");


  const { isFetching, isLoading, data: taxes, status: prodstatus, refetch } = useQuery({
    queryKey: ["taxes", page, perPage, from, to, status, searchString, sort],
    queryFn: () => getTaxes(page, perPage, from, to, status, searchString, sort),
    keepPreviousData: true

  });
  // const addHandler=()=>{

  // }
  return (
    <div>
                                                      {isLoading ? <Loader /> :
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
                      <li className="nav-item " role="presentation">
                        <button className="nav-link " id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="false">Products</button>
                      </li>
                      <li onClick={() => {
                        history?.push('/AnalysisCategories')
                      }} className="nav-item" role="presentation">
                        <button className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                      </li>
                      <li onClick={() => {
                        history?.push('/AnalyticsVariation')
                      }} className="nav-item" role="presentation">
                        <button className="nav-link" id="variations-tab" data-bs-toggle="tab" data-bs-target="#variations" type="button" role="tab" aria-controls="variations" aria-selected="false">Variations</button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="taxes-tab" data-bs-toggle="tab" data-bs-target="#taxes" type="button" role="tab" aria-controls="taxes" aria-selected="true">Taxes</button>
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
                              <div className="p-3 mb-3">
                                <div className="row mb-2">
                                  <div className="col-12 d-flex align-content-center justify-content-between tckt-srch-row">
                                  <SearchFilter
                                  searchString={searchString}
                                  setSearchString={setSearchString}
                                  setPage={setPage}
                                />
                                    <div className="d-flex">
                                      {/* <a href="edit-tax.php" className="btn_orangebor mt-0 d-inline-block px-5 me-2">Edit Tax</a> */}
                                      <Link to='/AddTax' className="btn_darkbluep mt-0 d-inline-block px-5 me-2">Add Tax</Link>
                                      {/* <button className="filterIcon redBg rounded-circle"><i className="far fa-filter" /></button> */}
                                    </div>
                                  </div>
                                </div>
                                {/* Top Categories Items Sold */}
                                <div className="row mb-3">
                                  <div className="col-12 col-md-12">
                                    <div className>
                                      <div className="main-tabble table-responsive bg-transparent">
                                        <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer px-0">
                                          <div className="row">
                                            <div className="col-sm-12">
                                              <table className="table table-borderless dataTable">
                                                <thead>
                                                  <tr>
                                                    <th>S. No</th>
                                                    <th>State</th>
                                                    <th>Tax %</th>
                                                    <th>Last Update On</th>
                                                    <th>Action</th>
                                                  </tr>
                                                </thead>
                                                <tbody>
                                                  {taxes?.docs?.length > 0 &&
                                                    taxes?.docs?.map((taxx, index) => (

                                                      <tr>
                                                        <td className>{index + 1}</td>
                                                        <td>{taxx?.state}</td>
                                                        <td>{taxx?.percent}%</td>
                                                        <td>
                                                          {moment(taxx?.createdAt).format(
                                                            "LL"
                                                          )}</td>
                                                        <td>
                                                          <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                              <i className="fa fa-ellipsis-v" />
                                                            </button>
                                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                              <li>
                                                                <Link className="dropdown-item" to={`/EditTax/${taxx?._id}`}
                                                                ><i className="fa fa-eye" /> View</Link>
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
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {taxes?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={taxes?.totalDocs}
                                    totalPages={taxes?.totalPages}
                                    currentPage={taxes?.page}
                                    setPage={setPage}
                                    hasNextPage={taxes?.hasNextPage}
                                    hasPrevPage={taxes?.hasPrevPage}
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

export default Taxes