import React, { useState, useRef } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import ShowEntries from "../components/ShowEntries";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { getOrders } from "./Api/Orders";
import { useQuery } from "react-query";
import Loader from "../components/Loader";

const Orders = ({history}) => {
  const [sort, setsort] = useState();
  const [hideDownload, sethideDownload] = useState(false);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const inputRef = useRef(null);


  const { isFetching, isLoading, data: orders, status: ordstatus, refetch } = useQuery({
    queryKey: ["orders", page, perPage, from, to, status, searchString, sort,],
    queryFn: () => getOrders(page, perPage, from, status, to, searchString, sort,),
    keepPreviousData: true

  });
  const printDocument = async () => {
    await sethideDownload(true);

    html2canvas(inputRef.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape"
      });
      const imgProps = pdf.getImageProperties(imgData);
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("order.pdf");
    });
    sethideDownload(false);
  };

  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              <section className="myprofile " id="configuration">
                <div className="box py-5">
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                      <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                        <h3 className="pageTitle"> Order</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <ul className="nav nav-tabs tabTop justify-content-center" id="myTab" role="tablist">
                      <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                        <button className="nav-link active" id="orders-tab" data-bs-toggle="tab" data-bs-target="#orders" type="button" role="tab" aria-controls="orders" aria-selected="true">Orders</button>
                      </li>
                      <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                        <button onClick={()=>{
                          history?.push('/GeoGeneticsOrders')
                        }}  className="nav-link" id="genetics-tab" data-bs-toggle="tab" data-bs-target="#genetics" type="button" role="tab" aria-controls="genetics" aria-selected="false">GEO Genetics</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="orders" role="tabpanel" aria-labelledby="orders-tab">
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
              </section>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Orders;
