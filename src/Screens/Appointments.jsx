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
import moment from "moment";
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
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              <section className="myprofile " id="configuration">
                <div className="box py-5">
                  <div className="row mb-4">
                    <div className="col-md-12">
                      <h3 className="pageTitle"> Appointment Logs</h3>
                    </div>
                  </div>
                  <div className="row">
                    <ul className="nav nav-tabs tabTop justify-content-center" id="myTab" role="tablist">
                      {/* <li className="nav-item flex-grow-0" role="presentation">
                        <button className="nav-link active" id="appoi-tab" data-bs-toggle="tab" data-bs-target="#appoi" type="button" role="tab" aria-controls="appoi" aria-selected="true">Appointments</button>
                      </li> */}
                      {/* <li className="nav-item flex-grow-0" role="presentation">
                        <button className="nav-link" id="con-tab" data-bs-toggle="tab" data-bs-target="#con" type="button" role="tab" aria-controls="con" aria-selected="false">Consultation</button>
                      </li> */}
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="appoi" role="tabpanel" aria-labelledby="appoi-tab">

                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                              <h3 className="pageTitle">Consultation</h3>
                              <div>
                                <Link to='/ManageAppointmentFees' className="btn_orangebor">Manage Appointment Fees</Link>
                                <Link to='/ManageAvailibilty' className="btn_darkbluep">Manage Availability</Link>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-xl-12 col-md-12">
                            <div className="row">
                              <div className="col d-lg-flex align-items-center justify-content-between">
                                <SearchFilter
                                  searchString={searchString}
                                  setSearchString={setSearchString}
                                  setPage={setPage}
                                />
                                <div className="dropFilter">
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
                                        />
                                      </div>
                                      {/* <div className="userInput mb-3">
                                        <label htmlFor className="mainLabel">Filter by Status:</label>
                                        <div className="mb-2">
                                          <select name id className="mainInput filterInput">
                                            <option value="s">Select Status</option>
                                            <option value={1}>Active</option>
                                            <option value={2}>Inactive</option>
                                          </select>
                                        </div>
                                      </div> */}
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
                                    <th>Booking ID</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    {/* <th>Status</th> */}
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {consultationlogs?.docs?.length > 0 &&
                                    consultationlogs?.docs?.map(
                                      (feed, index) => (
                                        <tr>
                                          <td className>{index + 1}</td>
                                          <td>{feed?.consultationaddress?.firstName + ' ' + feed?.consultationaddress?.lastName}</td>
                                          <td>{feed?._id} </td>
                                          <td> {moment
                                            .utc(feed?.appointmentdate)
                                            .format("LL")}  </td>
                                          <td>${feed?.consultationaddress?.amount}</td>
                                          {/* <td>Reported</td> */}
                                          <td>
                                            <div className="dropdown">
                                              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa fa-ellipsis-v" />
                                              </button>
                                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                  <Link to={`/AppointmentDetails/${feed?._id}`} className="dropdown-item" ><i className="fa fa-eye" /> View</Link>
                                                  {/* <a className="dropdown-item" href="appointment-details.php"><i className="fa fa-eye" /> Detail</a> */}
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>)
                                    )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
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
              </section>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Appointments;
