import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import ShowEntries from "../components/ShowEntries";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
const Users = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userslogs, setuserslogs] = useState([]);

  useEffect(() => {
    handleGetProducts();
  }, [page, perPage, from, to, searchString, sort]);

  const handleGetProducts = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/user/logs`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          sort
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);
      setuserslogs(res.data?.user);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleChangeStatus = async (id, status) => {
    console.log("id", id);
    try {
      const res = await axios({
        url: `${baseURL}/user/toggle-active/${id}`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: res.data.message,
        showConfirmButton: false,
        timer: 1500
      });
      handleGetProducts();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
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
                                      functionhandler={handleGetProducts}
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
                                                    to={`/UserDetails${userr?._id}`}
                                                    className="dropdown-item"
                                                  >
                                                    <i className="fa fa-eye" />
                                                    View Detail
                                                  </Link>
                                                  <Link
                                                    to="#"
                                                    className="dropdown-item"
                                                    onClick={() =>
                                                      handleChangeStatus(
                                                        userr?._id,
                                                        !userr?.status
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
      </div>
    </div>
  );
};

export default Users;
