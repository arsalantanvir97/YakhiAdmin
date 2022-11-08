import React from "react";
import { Link } from "react-router-dom";

const Events = () => {
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
                                Add New Events
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
                                    <select className="w-100 form-control form-control-sm">
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
                                    >
                                      <option value>Latest</option>
                                      <option value>Earlier</option>
                                    </select>
                                  </div>
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                    <label htmlFor className="d-block">
                                      Filter by Status
                                    </label>
                                    {/* <select name="" class="w-100 form-control" id="">
                                                        <option value="">Filter</option>
                                                        <option value="">user</option>
                                                    </select> */}
                                    <input
                                      type="date"
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-3">
                                <div className="row align-items-center justify-content-center">
                                  <div className="col-12 col-md-6 col-lg-6 col-xl-12 mt-2">
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
                                          <th className="sorting">
                                            Event Link
                                          </th>
                                          <th className="sorting">Actions</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td className>01</td>
                                          <td>Event a</td>
                                          <td>mm/dd/yyyy</td>
                                          <td className="primary-text">
                                            https://www.event.com/search?word=events
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
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  data-toggle="modal"
                                                  data-target="#employeeDetailActive"
                                                >
                                                  <i className="fa fa-eye" />
                                                  View Detail
                                                </a>
                                                <Link
                                                  className="dropdown-item"
                                                  to="/EditEventt"
                                                >
                                                  <i className="fas fa-pen" />
                                                  Edit
                                                </Link>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td className>02</td>
                                          <td>Event a</td>
                                          <td>mm/dd/yyyy</td>
                                          <td className="primary-text">
                                            https://www.event.com/search?word=events
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
                                                <a
                                                  className="dropdown-item"
                                                  href="#"
                                                  data-toggle="modal"
                                                  data-target="#employeeDetailActive"
                                                >
                                                  <i className="fa fa-eye" />
                                                  View Detail
                                                </a>
                                                <Link
                                                  className="dropdown-item"
                                                  to="/EditEventt"
                                                >
                                                  <i className="fas fa-pen" />
                                                  Edit
                                                </Link>
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
                            User Name
                          </label>
                          <input
                            type="text"
                            name
                            id="subEmployeeName"
                            placeholder="Enter Name"
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
                          />
                        </div>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
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
                            <h5 className="user__name">Mark Carson</h5>
                            <p className="user__email">MarkCarson@abc.com</p>
                          </div>
                          <div className="col-lg-3">
                            <span className="coupon__applied">In Active</span>
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
                <form action>
                  <div className="row">
                    <div className="col-12 text-center">
                      <i className="fa fa-question red" />
                      <h3>Are You Sure You Want To Remove this Employee?</h3>
                      <button type="submit" className="btn btn-secondary mr-1">
                        yes
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary ml-1"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Events;
