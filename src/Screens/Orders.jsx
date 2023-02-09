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

const Orders = () => {
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
      pdf.save("invoice.pdf");
    });
    sethideDownload(false);
  };

  return (
    <div>
      {isLoading? <Loader/>:
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="user-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Orders</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link to="#" onClick={printDocument} className="btn btn-primary">
                              Print
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-xl-9">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label>Show entries </label>
                                  <ShowEntries
                                    printDocument={printDocument}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    setPage={setPage}
                                  />
                                </div>
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label htmlFor className="d-block">
                                    Sort by:
                                  </label>
                                  <select
                                    name
                                    className="w-100 form-control sort-select"
                                    value={sort}
                                    onChange={(e) => {
                                      setsort(e.target.value);
                                    }}
                                  >
                                    <option value={"asc"}>Latest</option>
                                    <option value={"des"}>Earlier</option>
                                  </select>
                                </div>
                                <Calender
                                  from={from}
                                  to={to}
                                  setFrom={setFrom}
                                  setTo={setTo}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-12 mt-2">
                                  <div className="search-filter w-100">
                                    <label>Search:</label>
                                    <SearchFilter
                                      searchString={searchString}
                                      setSearchString={setSearchString}
                                      setPage={setPage}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row row-table">
                          <div className="main-tabble table-responsive">
                            <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                              <div className="row">
                                <div className="col-sm-12">
                                  <table
                                    id="divToPrint"
                                    ref={inputRef}
                                    className="table table-borderless dataTable"
                                  >
                                    <thead>
                                      <tr>
                                        <th className="sorting_asc">S. No.</th>
                                        <th className="sorting">Order ID</th>
                                        <th className="sorting">Total</th>
                                        <th className="sorting">Billed to</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">Date</th>
                                        {!hideDownload && (
                                          <th className="sorting">ACTION</th>
                                        )}
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {orders?.docs?.length > 0 &&
                                        orders?.docs?.map((orderr, index) => (
                                          <tr>
                                            <td className>{index + 1}</td>
                                            <td>${orderr?._id}</td>

                                            <td>${orderr?.totalPrice}</td>
                                            <td>
                                              {
                                                orderr?.shippingAddress
                                                  ?.billingname
                                              }
                                            </td>
                                            <td>{orderr?.status}</td>
                                            <td>
                                              {moment
                                                .utc(orderr?.createdAt)
                                                .format("LL")}
                                            </td>
                                            <td>
                                              {!hideDownload && (
                                                <div className="btn-group ml-1">
                                                  <button
                                                    type="button"
                                                    className="btn btn-drop-table btn-sm"
                                                    data-toggle="dropdown"
                                                  >
                                                    <i className="fa fa-ellipsis-v" />
                                                  </button>
                                                  <div className="dropdown-menu">
                                                    <Link
                                                      to={`/OrderDetails/${orderr?._id}`}
                                                      className="dropdown-item"
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </Link>
                                                  </div>
                                                </div>
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
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
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Orders;
