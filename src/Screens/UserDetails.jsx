import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import SearchFilter from "../components/SearchFilter";
import Calender from "../components/Calender";
import ShowEntries from "../components/ShowEntries";
import Pagination from "../components/Padgination";
import { getUserDetails, getUserOrders } from "./Api/Users";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { getUserAppointments } from "./Api/Appointments";
const UserDetails = ({ match,history }) => {
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort2, setsort2] = useState();
  const [page2, setPage2] = useState(1);
  const [perPage2, setPerPage2] = useState(3);
  const [searchString2, setSearchString2] = useState("");
  const [from2, setFrom2] = useState("");
  const [to2, setTo2] = useState("");


  const { isLoading: catloading, data: userdetails } = useQuery(["user", match.params.id], () =>
    getUserDetails(match.params.id)
  );

  const { isFetching, isLoading, data: orders, ordstatus, refetch } = useQuery({
    enabled: userdetails?._id?.length > 0,
    queryKey: ["userorders", page, perPage, from, to, searchString, sort, match?.params?.id],

    queryFn: () => getUserOrders(page, perPage, from, to, searchString, sort, match?.params?.id),
    keepPreviousData: true

  });

  const {   data: consultationlogs, status: prodstatus } = useQuery({
    queryKey: ["appointments", page2, perPage2, from2, to2, searchString2, sort2,],
    queryFn: () => getUserAppointments(page2, perPage2, from2, to2, searchString2, sort2,match?.params?.id),
    keepPreviousData: true

  });


  

  return (
    <div>
      {catloading ? <Loader /> :
       <div className="app-content content dashboard">
       <div className="content-wrapper">
         <div className="content-body">
           <section className="myprofile " id="configuration">
             <div className="box py-5">
               <div className="row justify-content-center">
                 <div className="col-md-12">
                   <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                     <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                                            history.goBack()
                                        }} /> User Details</h3>
                   </div>
                 </div> 
               </div>
               <div className="row justify-content-center">
                 <div className="col-md-9">
                   <form className="myprofile_main">
                     <div className="row">
                       <div className="col-md-12">
                         <div className="mb-4 text-center">
                           <div className="attached">
                             <img src="images/myprofile_pic.png" className="img-fluid ml-0" alt="" />
                           </div>
                         </div>
                       </div>
                     </div>
                     <div className="row justify-content-center">
                       <div className="col-md-2">
                         <div className="felid">
                           <label className="h_14 gray-colour">Name</label>
                           <p className="h_16 text-black fw-bold">{userdetails?.fistName +' ' +userdetails?.lastName}</p>
                         </div>
                       </div>
                       <div className="col-md-2">
                         <div className="felid">
                           <label className="h_14 gray-colour">Email Address</label>
                           <p className="h_16 text-black fw-bold">{userdetails?.email}</p>
                         </div>
                       </div>
                     </div>
                   </form>
                 </div>
               </div>
             </div>
          







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
                                  searchString={searchString2}
                                  setSearchString={setSearchString2}
                                  setPage={setPage2}
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
                                          from={from2}
                                          to={to2}
                                          setFrom={setFrom2}
                                          setTo={setTo2}
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
                      setPage={setPage2}
                      hasNextPage={consultationlogs?.hasNextPage}
                      hasPrevPage={consultationlogs?.hasPrevPage}
                    />
                  )}
                </div>
              







             <div className="box py-5">
               <div className="row mb-4">
                 <div className="col-md-12">
                   <h3 className="pageTitle"> Orders Logs</h3>                                
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
           </section>            
         </div>
       </div>
     </div>
     }
    </div>
  );
};

export default UserDetails;
