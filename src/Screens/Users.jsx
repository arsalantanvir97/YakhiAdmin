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

  const { isFetching, isLoading, data: userslogs, status: prodstatus, refetch } = useQuery({
    queryKey: ["users", page, perPage, from, to, searchString, sort,],
    queryFn: () => getUsers(page, perPage, from, to, searchString, sort,),
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
                              <h1>Users</h1>
                            </div>
                            {/* <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link to="/NewUser" className="btn btn-primary">
                              New User
                            </Link>
                          </div> */}
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
                                          <th className>Name</th>
                                          <th className>Email</th>
                                          <th className>Status</th>
                                          <th className>Registration Date</th>
                                          <th className>ACTION</th>
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
                                                  <button
                                                    type="button"
                                                    className="btn btn-drop-table btn-sm"
                                                    data-toggle="dropdown"
                                                  >
                                                    <i className="fa fa-ellipsis-v" />
                                                  </button>
                                                  <div className="dropdown-menu">
                                                    <Link
                                                      to={`/UserDetails/${userr?._id}`}
                                                      className="dropdown-item"
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </Link>
                                                    <Link
                                                      to="#"
                                                      className="dropdown-item"
                                                      onClick={() =>
                                                        handleChangeStatus.mutate(
                                                          userr?._id,
                                                        )
                                                      }
                                                      data-toggle="modal"
                                                      data-target=".active-user"
                                                    >
                                                      <i
                                                        className={
                                                          !userr.status
                                                            ? "fa fa-check-circle"
                                                            : "fa fa-ban"
                                                        }
                                                      />
                                                      {!userr.status
                                                        ? "Active"
                                                        : "Inactive"}
                                                    </Link>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
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

export default Users;
