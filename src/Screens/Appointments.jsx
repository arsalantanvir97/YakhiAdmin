import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import ShowEntries from "../components/ShowEntries";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { getAppointments } from "./Api/Appointments";
const Appointments = () => {
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // const [consultationlogs, setconsultationlogs] = useState([]);

  
  const { isFetching, isLoading, data: consultationlogs, status: prodstatus, refetch } = useQuery({
    queryKey: ["appointments", page, perPage, from, to, searchString, sort,],
    queryFn: () => getAppointments(page, perPage, from, to, searchString, sort,),
    keepPreviousData: true

  });

  return (
    <div>
      {isLoading?<Loader/>:
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
                            <h1>Appointments</h1>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-xl-9">
                              <div className="row align-items-center justify-content-start">
                                <div className="col-xl-3 col-md-6 mt-2">
                                  <label>Show entries </label>
                                  <ShowEntries
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    setPage={setPage}
                                  />
                                </div>
                                <div className="col-xl-3 col-md-6 mt-2">
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
                              <div className="row align-items-center justify-content-end">
                                <div className="col-12">
                                  <div className="search-filter w-100">
                                    <label>Search:</label>
                                    <SearchFilter
                                      searchString={searchString}
                                      setSearchString={setSearchString}
                                      setPage={setPage}
                                      // functionhandler={handleGetConsultations}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row row-table">
                          <div className="main-tabble table-responsive">
                            <div className="dataTables_wrapper container-fluid dt-bootstrap4">
                              <div className="row">
                                <div className="col-sm-12">
                                  <table className="table table-borderless  dataTable">
                                    <thead>
                                      <tr>
                                        <th className>S. No.</th>
                                        <th className>Full Name</th>
                                        <th className>Email</th>
                                        <th className>Appointment Date</th>
                                        <th className>Appointment Time</th>
                                        <th className>Status</th>
                                        <th className>ACTION</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {consultationlogs?.docs?.length > 0 &&
                                        consultationlogs?.docs?.map(
                                          (userr, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>
                                                {userr?.consultationaddress
                                                  ?.firstName +
                                                  " " +
                                                  userr?.consultationaddress
                                                    ?.lastName}
                                              </td>
                                              <td>
                                                {
                                                  userr?.consultationaddress
                                                    ?.email
                                                }
                                              </td>
                                              <td>{userr?.appointmentdate}</td>
                                              <td>{userr?.appointmenttime}</td>
                                              <td>{userr?.status}</td>
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
                                                      to={`/AppointmentDetails/${userr?._id}`}
                                                      className="dropdown-item"
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
                              {consultationlogs?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={consultationlogs?.totalDocs}
                                  totalPages={consultationlogs?.totalPages}
                                  currentPage={consultationlogs?.page}
                                  setPage={setPage}
                                  hasNextPage={consultationlogs?.hasNextPage}
                                  hasPrevPage={consultationlogs?.hasPrevPage}
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

export default Appointments;
