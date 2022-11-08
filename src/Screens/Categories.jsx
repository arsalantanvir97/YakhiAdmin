import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
const Categories = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [sort, setsort] = useState();

  const [categories, setcategories] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetCategories();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetCategories = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/category/CategoryLogs`,
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
      setcategories(res.data?.category);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleChangeStatus = async (id, status) => {
    console.log("id", id);
    try {
      const res = await axios({
        url: `${baseURL}/category/toggle-active/${id}`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: res.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
      handleGetCategories();
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: err?.response?.data?.message
          ? err?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500,
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
                            <h1>Categories</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link to="/AddCategory" className="btn btn-primary">
                              Add New
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                              <label>Show entries </label>
                              <select
                                className="w-100 form-control form-control-sm"
                                value={perPage}
                                onChange={(e) => {
                                  setPerPage(e.target.value);
                                  setPage(1);
                                }}
                              >
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
                                value={sort}
                                onChange={(e) => {
                                  setsort(e.target.value);
                                }}
                              >
                                <option value={"asc"}>Latest</option>
                                <option value={"des"}>Earlier</option>
                              </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                              <label htmlFor className="d-block">
                                Filter by Status
                              </label>
                              <select
                                name
                                className="w-100 form-control"
                                id
                                value={status}
                                onChange={(e) => {
                                  setStatus(e.target.value);
                                  setPage(1);
                                }}
                              >
                                <option value="">All</option>

                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                              </select>
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                              <div className="search-filter w-100">
                                <label>Search:</label>
                                <input
                                  type="search"
                                  className="form-control form-control-sm"
                                  placeholder="Search"
                                  value={searchString}
                                  onChange={(e) => {
                                    setSearchString(e.target.value);
                                    setPage(1);
                                  }}
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleGetCategories();
                                    }
                                  }}
                                />
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
                                        <th className="sorting_asc">
                                          Position
                                        </th>
                                        <th className="sorting">ID</th>
                                        <th className="sorting">Category</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">
                                          Number of Products
                                        </th>
                                        <th className="sorting">Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {categories?.docs?.length > 0 &&
                                        categories?.docs?.map((cat, index) => (
                                          <tr>
                                            <td className>{index + 1}</td>
                                            <td>{cat?._id}</td>
                                            <td>{cat?.categorytitle}</td>
                                            <td>
                                              {" "}
                                              {cat?.status
                                                ? "Active"
                                                : "Inactive"}
                                            </td>
                                            <td>{cat?.coursecount}</td>
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
                                                    to={`/EditCategory${cat?._id}`}
                                                    className="dropdown-item"
                                                  >
                                                    <i className="fa fa-eye" />
                                                    Edit
                                                  </Link>
                                                  <Link
                                                    onClick={() =>
                                                      handleChangeStatus(
                                                        cat._id,
                                                        !cat.status
                                                      )
                                                    }
                                                    className="dropdown-item"
                                                    data-toggle="modal"
                                                    data-target=".inactive-category"
                                                  >
                                                   <i className= {!cat.status
                                                      ? "fa fa-check-circle"
                                                      : "fa fa-ban"}  />
                                                    {!cat.status
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
                              {categories?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={categories?.totalDocs}
                                  totalPages={categories?.totalPages}
                                  currentPage={categories?.page}
                                  setPage={setPage}
                                  hasNextPage={categories?.hasNextPage}
                                  hasPrevPage={categories?.hasPrevPage}
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

export default Categories;
