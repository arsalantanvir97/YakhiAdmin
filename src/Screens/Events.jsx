import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";

const Events = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [sort, setsort] = useState();

  const [events, setevents] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetEvents();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetEvents = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/event/eventslogs`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status,
          sort,
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });

      console.log("res", res);
      setevents(res.data?.event);
    } catch (err) {
      console.log("err", err);
    }
  };


  return (
    <>
      <div>
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
                              <h1>Events</h1>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 text-right">
                              <Link to="/AddEvent" className="btn btn-primary">
                                Add Event
                              </Link>
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
                                    <select className="w-100 form-control form-control-sm" value={perPage}
                                      onChange={(e) => {
                                        setPerPage(e.target.value);
                                        setPage(1);
                                      }}>
                                      <option value={10}>10</option>
                                      <option value={25}>25</option>
                                      <option value={50}>50</option>
                                      <option value={100}>100</option>
                                    </select>
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
                                  {/* <label htmlFor className="d-block">
                                      Filter by Status
                                    </label> */}
                                  {/* <select name="" class="w-100 form-control" id="">
                                                        <option value="">Filter</option>
                                                        <option value="">user</option>
                                                    </select> */}

                                  <Calender
                                    from={from}
                                    to={to}
                                    setFrom={setFrom}
                                    setTo={setTo}
                                  />                                </div>
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
                                        functionhandler={handleGetEvents}
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
                                            Event Name
                                          </th>
                                          <th className="sorting">Date</th>
                                          {/* <th className="sorting">
                                            Event Link
                                          </th> */}
                                          <th className="sorting">Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {events?.docs?.length > 0 &&
                                          events?.docs?.map(
                                            (event, index) => (
                                              <tr>
                                                <td className>{index + 1}</td>
                                                <td>{event?.title}</td>
                                                <td> {moment
                                                  .utc(event?.date)
                                                  .format("LL")}</td>
                                                {/* <td className="primary-text">
                                                  https://www.event.com/search?word=events
                                                </td> */}
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
                                                      {/* <a
                                                        className="dropdown-item"
                                                        href="#"
                                                        data-toggle="modal"
                                                        data-target="#employeeDetailActive"
                                                      >
                                                        <i className="fa fa-eye" />
                                                        View Detail
                                                      </a> */}
                                                      <Link
                                                        className="dropdown-item"
                                                        to={`/EditEventt/${event?._id}`}
                                                      >
                                                        <i className="fas fa-pen" />
                                                        View
                                                      </Link>
                                                    </div>
                                                  </div>
                                                </td>
                                              </tr>))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {events?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={events?.totalDocs}
                                    totalPages={events?.totalPages}
                                    currentPage={events?.page}
                                    setPage={setPage}
                                    hasNextPage={events?.hasNextPage}
                                    hasPrevPage={events?.hasPrevPage}
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
        </div>
        {/* Add Sub Employee Popup */}

        {/* Active Sub Employee Details Popup */}

        {/* In Active Sub Employee Details Popup */}
        {/* Remove Employee Popup */}

      </div>
    </>
  );
};

export default Events;
