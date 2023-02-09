import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { createShipment, getShipments } from "./Api/Shipments";
import Loader from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
const Shipments = ({ history }) => {
  const usequeryClient = new useQueryClient();

  const [name, setname] = useState("");
  const [fromdate, setfromdate] = useState("");
  const [todate, settodate] = useState("");
  // const [shipments, setshipments] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [status, setStatus] = useState("");
  const { isFetching, isLoading, data: shipments, status: prodstatus, refetch } = useQuery(
    ["shipments", page, perPage, from, to, status, searchString, sort],
    () => getShipments(page, perPage, from, to, status, searchString, sort),
    { keepPreviousData: true }
  );
  const { mutate, isLoading: createShippingLoading } = useMutation((data) => createShipment(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Shipment Created Successfully');
      usequeryClient.invalidateQueries(['shipments'])

      history.push("/Shipments");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  const addShipmentHandler = async () => {
    const body = { name, from: fromdate, to: todate }
    mutate(body)
    setname("");
    setfromdate("");
    settodate("");
  };

  return (
    <>
      <div>
        {isLoading ? <Loader /> :
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
                                <h1>Shipments</h1>
                              </div>
                              <div className="col-12 col-sm-6 col-lg-6 text-right">
                                <a
                                  href="#"
                                  className="btn btn-primary"
                                  data-toggle="modal"
                                  data-target="#addDocument"
                                >
                                  Add New
                                </a>
                              </div>
                            </div>
                          </div>
                          <div className="dataTables_wrapper">
                            <div className="user-listing-top">
                              <div className="row align-items-end d-flex mb-1">
                                <div className="col-xl-9">
                                  <div className="row align-items-center justify-content-start">
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                      <label>Show entries </label>
                                      <ShowEntries
                                        perPage={perPage}
                                        setPerPage={setPerPage}
                                        setPage={setPage}
                                      />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                      <label htmlFor className="d-block">
                                        Sort by:
                                      </label>
                                      <select
                                        name
                                        className="w-100 form-control sort-select"
                                        id
                                        value={sort}
                                        onChange={(e) => {
                                          setsort(e.target.value);
                                        }}
                                      >
                                        <option value={"asc"}>Latest</option>
                                        <option value={"des"}>Earlier</option>
                                      </select>
                                    </div>
                                    {/* <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                    <label htmlFor className="d-block">
                                      Filter by Status
                                    </label>
                                    <select
                                      name
                                      className="w-100 form-control"
                                      id
                                    >
                                      <option value>Filter</option>
                                      <option value>user</option>
                                    </select>
                                  </div> */}
                                  </div>
                                </div>
                                <div className="col-xl-3">
                                  <div className="row align-items-center justify-content-center">
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-12 mt-2">
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
                                      <table className="table table-borderless  dataTable">
                                        <thead>
                                          <tr>
                                            <th className="sorting_asc">ID</th>
                                            <th className="sorting">
                                              Shipment Name
                                            </th>
                                            <th className="sorting">From Date</th>
                                            <th className="sorting">To Date</th>
                                            {/* <th className="sorting">
                                            No Of Orders
                                          </th> */}
                                            <th className="sorting">Actions</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {shipments?.docs?.length > 0 &&
                                            shipments?.docs?.map(
                                              (ship, index) => (
                                                <tr>
                                                  <td className>{index + 1}</td>
                                                  <td>{ship?.name}</td>
                                                  <td>
                                                    {moment(
                                                      ship?.from
                                                    ).format("LL")}
                                                  </td>
                                                  <td>
                                                    {moment(ship?.to).format(
                                                      "LL"
                                                    )}
                                                  </td>

                                                  {/* <td>10</td> */}
                                                  <td>
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
                                                          className="dropdown-item"
                                                          to={`/ShipmentDetails/${ship?._id}`}
                                                        >
                                                          <i className="fa fa-eye" />
                                                          View Detail
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {shipments?.docs?.length > 0 && (
                                    <Pagination
                                      totalDocs={shipments?.totalDocs}
                                      totalPages={shipments?.totalPages}
                                      currentPage={shipments?.page}
                                      setPage={setPage}
                                      hasNextPage={shipments?.hasNextPage}
                                      hasPrevPage={shipments?.hasPrevPage}
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
        {/* Add Document Popup */}
        <div
          className="modal fade delete-product p-0"
          id="addDocument"
          tabIndex
          role
          aria-labelledby
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel" />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-10 mx-auto text-center">
                    <h3>Add Shipment</h3>
                    <form action id="addNewDoc">
                      <div className="row mb-2">
                        <div className="col-12 mb-2">
                          <label
                            htmlFor="shipmentName"
                            className="d-block text-left"
                          >
                            Shipment Name
                          </label>
                          <input
                            type="text"
                            name
                            id="shipmentName"
                            placeholder="Enter Name"
                            value={name}
                            onChange={(e) => {
                              setname(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label
                            htmlFor="dateFrom"
                            className="d-block text-left"
                          >
                            Date From
                          </label>
                          <DatePicker
                            placeholderText="Select a starting date"
                            selected={fromdate}
                            onChange={(fromdate) => setfromdate(fromdate)}
                            className="sort-date customdate form-control"
                          />{" "}
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label htmlFor="dateTo" className="d-block text-left">
                            Date to
                          </label>
                          <DatePicker
                            placeholderText="Select an ending date"
                            selected={todate}
                            onChange={(todate) => settodate(todate)}
                            className="sort-date customdate form-control"
                          />{" "}
                        </div>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() =>
                        name?.length > 0 && fromdate && todate
                          ? addShipmentHandler()
                          : Toasty(
                            "error",
                            `Please fill out all the required fields!`
                          )
                      }
                    >
                      Add
                    </button>
                    {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shipments;
