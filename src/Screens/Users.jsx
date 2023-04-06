import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import ShowEntries from "../components/ShowEntries";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUsers, changeStatus } from "./Api/Users";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";
const Users = () => {
  const usequeryClient = new useQueryClient();


  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userstatus, setuserstatus] = useState("");

  const { isFetching, isLoading, data: userslogs, status: prodstatus, refetch } = useQuery({
    queryKey: ["users", page, perPage, from, to, searchString, sort, userstatus],
    queryFn: () => getUsers(page, perPage, from, to, searchString, sort, userstatus),
    keepPreviousData: true

  });

  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', res?.data?.message);

        usequeryClient.invalidateQueries(['users'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration">
                <div className="row">
                  <div className="col-12">
                    <div className="card-content collapse show dashCard py-5 px-5">
                      <div className="row justify-content-center">
                        <div className="col-md-12">
                          <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                            <h3 className="pageTitle"> Users Management</h3>
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
                                      <div className="mb-2">
                                        <input className="mainInput filterInput" type="date" />
                                      </div>
                                      <div className="mb-2">
                                        <input className="mainInput filterInput" type="date" />
                                      </div>
                                    </div>
                                    <div className="userInput mb-3">
                                      <label htmlFor className="mainLabel">Filter by Status:</label>
                                      <div className="mb-2">
                                        <select name id className="mainInput filterInput" value={userstatus}
                                          onChange={(e) => {
                                            setuserstatus(e.target.value);
                                            setPage(1);
                                          }}
                                        >
                                          <option value="">All</option>

                                          <option value={true}>Active</option>
                                          <option value={false}>Inactive</option>

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
                                  <th>Email Address</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              <tbody>
                                {userslogs?.docs?.length > 0 &&
                                  userslogs?.docs?.map((userr, index) => (
                                    <tr>
                                      <td className>{index + 1}</td>
                                      <td>{userr?.firstName}</td>
                                      <td>{userr?.email}</td>
                                      <td>
                                        {" "}
                                        {userr?.status
                                          ? "Active"
                                          : "Inactive"}
                                      </td>
                                      <td>
                                        {moment
                                          .utc(userr?.createdAt)
                                          .format("LL")}
                                      </td>
                                      <td>
                                        <div className="btn-group ml-1">
                                          <div className="dropdown">
                                            <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                              <i className="fa fa-ellipsis-v" />
                                            </button>
                                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                              <li>
                                                <Link
                                                  to={`/UserDetails/${userr?._id}`} className="dropdown-item" ><i className="fa fa-eye" /> View</Link>
                                                <Link className="dropdown-item" to="#"  onClick={() =>
                                                handleChangeStatus.mutate(
                                                  userr?._id,
                                                )
                                              } data-bs-toggle="modal" data-bs-target=".active_popup">   <i
                                              className={
                                                !userr.status
                                                  ? "fa fa-check-circle"
                                                  : "fa fa-ban"
                                              }
                                            /> {!userr.status
                                                ? "Active"
                                                : "Inactive"}</Link>
                                              </li>
                                            </ul>
                                          </div>

                                        
                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                      {userslogs?.docs?.length > 0 && (
                        <Pagination
                          totalDocs={userslogs?.totalDocs}
                          totalPages={userslogs?.totalPages}
                          currentPage={userslogs?.page}
                          setPage={setPage}
                          hasNextPage={userslogs?.hasNextPage}
                          hasPrevPage={userslogs?.hasPrevPage}
                        />
                      )}
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

export default Users;
