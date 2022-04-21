import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { closeModals } from "../utils/closeModals";
const Subemployees = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [admins, setadmins] = useState([]);
  const [admindetails, setadmindetails] = useState();
  const [deladminid, setdeladminid] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetAdmins();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetAdmins = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/auth/adminlogs`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status,
          sort
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);
      setadmins(res.data?.admin);
    } catch (err) {
      console.log("err", err);
    }
  };

  const createAdminHandler = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/auth/registerAdminbyAdmin`,
        { firstName, lastName, email },
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        }
      );
      Swal.fire({
        icon: "success",
        title: "",
        text: "Subemplyee Created Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetAdmins();
    } catch (error) {
      console.log("error", error, error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }

    setfirstName("");
    setlastName("");
    setemail("");
  };
  const getDetailsHadnler = async (id) => {
    setadmindetails({});
    try {
      const res = await axios({
        url: `${baseURL}/auth/admin-details/${id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setadmindetails(res?.data?.admin);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteHadnler = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/auth/deleteAdmin/${deladminid}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "",
        text: "Subemployee Deleted Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetAdmins();
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
                              <h1>Sub Employee</h1>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 text-right">
                              <a
                                href="#"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#addSubEmployee"
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
                                        functionhandler={handleGetAdmins}
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
                                          <th className="sorting">User ID</th>
                                          <th className="sorting">
                                            Employee Name
                                          </th>
                                          <th className="sorting">
                                            Date Added
                                          </th>
                                          <th className="sorting">Status</th>
                                          <th className="sorting">Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {admins?.docs?.length > 0 &&
                                          admins?.docs?.map((adm, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>{adm?._id}</td>
                                              <td>
                                                {adm?.firstName +
                                                  " " +
                                                  adm?.lastName}
                                              </td>
                                              <td>
                                                {" "}
                                                {moment(adm?.createdAt).format(
                                                  "LL"
                                                )}
                                              </td>
                                              <td>Active</td>
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
                                                      to="#"
                                                      onClick={() => {
                                                        getDetailsHadnler(
                                                          adm?._id
                                                        );
                                                      }}
                                                      data-toggle="modal"
                                                      data-target="#employeeDetail"
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </Link>
                                                    <Link
                                                      className="dropdown-item"
                                                      to="#"
                                                      data-toggle="modal"
                                                      data-target="#removeEmployee"
                                                      onClick={() => {
                                                        setdeladminid(adm?._id);
                                                      }}
                                                    >
                                                      <i className="fa fa-trash" />
                                                      Remove
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
                                {admins?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={admins?.totalDocs}
                                    totalPages={admins?.totalPages}
                                    currentPage={admins?.page}
                                    setPage={setPage}
                                    hasNextPage={admins?.hasNextPage}
                                    hasPrevPage={admins?.hasPrevPage}
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
        <div
          className="modal fade delete-product p-0"
          id="addSubEmployee"
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
                    <h3>Add Sub Employee</h3>
                    <form action id="addNewDoc">
                      <div className="row mb-2">
                        <div className="col-12 mb-2">
                          <label
                            htmlFor="subEmployeeName"
                            className="d-block text-left"
                          >
                            First Name
                          </label>
                          <input
                            type="text"
                            name
                            id="subEmployeeName"
                            placeholder="Enter First Name"
                            value={firstName}
                            onChange={(e) => {
                              setfirstName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-12 mb-2">
                          <label
                            htmlFor="subEmployeeName"
                            className="d-block text-left"
                          >
                            Last Name
                          </label>
                          <input
                            type="text"
                            name
                            id="subEmployeeName"
                            placeholder="Enter Last Name"
                            value={lastName}
                            onChange={(e) => {
                              setlastName(e.target.value);
                            }}
                          />
                        </div>
                        <div className="col-12 mb-2">
                          <label
                            htmlFor="subEmployeeEmail"
                            className="d-block text-left"
                          >
                            Email Address
                          </label>
                          <input
                            type="email"
                            name
                            id="subEmployeeEmail"
                            placeholder="Enter Email Address"
                            value={email}
                            onChange={(e) => {
                              setemail(e.target.value);
                            }}
                          />
                        </div>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() =>
                        firstName?.length > 0 &&
                        lastName?.length > 0 &&
                        email?.length > 0
                          ? createAdminHandler()
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
        {/* Active Sub Employee Details Popup */}
        <div
          className="modal fade delete-product p-0"
          id="employeeDetailActive"
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
                <form action="login.php" method="post">
                  <div className="row">
                    <div className="col-12 text-center">
                      <h3>Sub Employee Detail</h3>
                      <div className="appointment-details">
                        <div className="row text-left justify-content-center mx-2">
                          <div className="col-lg-9">
                            <h5 className="user__name">Mark Carson</h5>
                            <p className="user__email">MarkCarson@abc.com</p>
                          </div>
                          <div className="col-lg-3">
                            <span className="coupon__applied">Active</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-1 mt-5 px-0"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Okay
                      </button>
                      {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* In Active Sub Employee Details Popup */}
        <div
          className="modal fade delete-product p-0"
          id="employeeDetail"
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
                <form action="login.php" method="post">
                  <div className="row">
                    <div className="col-12 text-center">
                      <h3>Sub Employee Detail</h3>
                      <div className="appointment-details">
                        <div className="row text-left justify-content-center mx-2">
                          <div className="col-lg-9">
                            <h5 className="user__name">
                              {admindetails?.firstName +
                                " " +
                                admindetails?.lastName}
                            </h5>
                            <p className="user__email">{admindetails?.email}</p>
                          </div>
                          <div className="col-lg-3">
                            <span className="coupon__applied">Active</span>
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-1 mt-5 px-0"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        Okay
                      </button>
                      {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* Remove Employee Popup */}
        <div
          className="modal fade p-0"
          id="removeEmployee"
          tabIndex
          role
          aria-labelledby
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered">
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
                  <div className="col-12 text-center">
                    <i className="fa fa-question red" />
                    <h3>Are You Sure You Want To Remove this Employee?</h3>
                    <button
                      type="button"
                      className="btn btn-secondary mr-1"
                      onClick={deleteHadnler}
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      yes
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary ml-1"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button>
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

export default Subemployees;
