import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const UserDetails = ({ match }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [userdetails, setuserdetails] = useState("");

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/user/user-details/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setuserdetails(res?.data?.user);
    
    } catch (err) {
      console.log(err);
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
                          <div className="col-12">
                            <h1>
                              <Link to="/Users">
                                <i className="fa fa-angle-left" />
                              </Link>
                              User Details
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row mb-2">
                          <div className="col-12 col-sm-3 mb-1 mb-sm-0">
                            <div className="profile-img">
                              <img
                              src={
                                userdetails?.userImage &&
                                userdetails?.userImage !== null
                                  ? `${imageURL}${userdetails?.userImage}`
                                  : "images/avatar.jpg"
                              }
                                className="img-fluid ml-0"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-9 d-sm-flex d-block justify-content-sm-end justify-content-center align-items-center text-center">
                            <Link
                              to={`/EditUser${userdetails?._id}`}
                              className="btn btn-primary"
                            >
                              Edit Profile
                            </Link>
                          </div>
                        </div>
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>First Name</label>
                          </div>
                          <div className="col-12">{userdetails?.firstName}</div>
                        </div>
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>Last Name</label>
                          </div>
                          <div className="col-12">{userdetails?.lastName}</div>
                        </div>
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>Email</label>
                          </div>
                          <div className="col-12">{userdetails?.email}</div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="page-title mb-2">
                          <div className="row">
                            <div className="col-12">
                              <h1>Order History</h1>
                            </div>
                          </div>
                        </div>
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                              <label>Show entries </label>
                              <select className="w-100 form-control form-control-sm">
                                <option value={10}>10</option>
                                <option value={25}>25</option>
                                <option value={50}>50</option>
                                <option value={100}>100</option>
                              </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                              <label htmlFor className="d-block">
                                Sort by:
                              </label>
                              <select
                                name
                                className="w-100 form-control sort-select"
                                id
                              >
                                <option value>Latest</option>
                                <option value>Earlier</option>
                              </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                              <label htmlFor className="d-block">
                                From
                              </label>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                              />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                              <label htmlFor className="d-block">
                                To
                              </label>
                              <input
                                type="date"
                                className="form-control form-control-sm"
                              />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2 offset-xl-1 offset-0">
                              <div className="search-filter w-100">
                                <label>Search:</label>
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                />
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
                                        <th className="sorting_asc">S. No.</th>
                                        <th className="sorting">Total</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">Date</th>
                                        <th className="sorting">ACTION</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td className>01</td>
                                        <td>$123</td>
                                        <td>I nprocess</td>
                                        <td>mm/dd/yyyy</td>
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
                                              <a
                                                className="dropdown-item"
                                                href="orders-details.php"
                                              >
                                                <i className="fa fa-eye" />
                                                View Detail
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className>01</td>
                                        <td>$123</td>
                                        <td>Delivered</td>
                                        <td>mm/dd/yyyy</td>
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
                                              <a
                                                className="dropdown-item"
                                                href="orders-details.php"
                                              >
                                                <i className="fa fa-eye" />
                                                View Detail
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td className>01</td>
                                        <td>$123</td>
                                        <td>In Process</td>
                                        <td>mm/dd/yyyy</td>
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
                                              <a
                                                className="dropdown-item"
                                                href="orders-details.php"
                                              >
                                                <i className="fa fa-eye" />
                                                View Detail
                                              </a>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col-sm-12 col-md-5">
                                  <div
                                    className="dataTables_info"
                                    id="DataTables_Table_0_info"
                                    role="status"
                                    aria-live="polite"
                                  >
                                    Showing 1 to 3 of 3 entries
                                  </div>
                                </div>
                                <div className="col-sm-12 col-md-7">
                                  <div
                                    className="dataTables_paginate paging_simple_numbers"
                                    id="DataTables_Table_0_paginate"
                                  >
                                    <ul className="pagination">
                                      <li className="paginate_button page-item previous disabled">
                                        <a href="#" className="page-link">
                                          <i className="fa fa-chevron-left red" />
                                        </a>
                                      </li>
                                      <li className="paginate_button page-item active">
                                        <a href="#" className="page-link">
                                          1
                                        </a>
                                      </li>
                                      <li className="paginate_button page-item">
                                        <a href="#" className="page-link">
                                          2
                                        </a>
                                      </li>
                                      <li className="paginate_button page-item">
                                        <a href="#" className="page-link">
                                          3
                                        </a>
                                      </li>
                                      <li
                                        className="paginate_button page-item next disabled"
                                        i
                                      >
                                        <a href="#" className="page-link">
                                          <i className="fa fa-chevron-right red" />
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
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

export default UserDetails;
