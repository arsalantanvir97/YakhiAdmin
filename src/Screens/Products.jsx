import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";

const Products = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [sort, setsort] = useState();

  const [products, setproducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [allofcategory, setallofcategory] = useState([]);
  const [geogeneticscategory, setgeogeneticscategory] = useState([]);

  const [category, setcategory] = useState();

  const gettingallCategoriesHandler = async () => {
    const res = await axios.get(`${baseURL}/category/allOfCategories`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    });
    console.log("res", res);
    setallofcategory(res?.data?.getAllCategories);
    const ress = await axios.get(`${baseURL}/category/getGeoGeneticsCategory`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    });
    console.log("res", res);
    setgeogeneticscategory(ress?.data?.getAllCategories);
  };
  useEffect(() => {
    gettingallCategoriesHandler();
  }, []);

  useEffect(() => {
    handleGetProducts();
  }, [page, perPage, from, to, status, searchString, sort, category]);

  const handleGetProducts = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/product/productlogsofAdmin`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status,
          sort,
          category,
          geogeneticscategory:geogeneticscategory?._id
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);
      setproducts(res.data?.product);
    } catch (err) {
      console.log("err", err);
    }
  };

  const handleChangeStatus = async (id, status) => {
    console.log("id", id);
    try {
      const res = await axios({
        url: `${baseURL}/product/toggle-active/${id}`,
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
  const deleteProductHandler = async (id) => {
    console.log("id", id);
    try {
      const res = await axios({
        url: `${baseURL}/product/deleteProduct/${id}`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "",
        text: "Product Deleted Successfully",
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
            <section id="configuration" className="product-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Products</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link
                              to="/AddProduct"
                              className="btn btn-primary"
                            >
                              Add Product
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper custom-filter">
                        <div className="user-listing-top">
                          <div className="row align-items-center justify-content-between mb-1">
                            <div className="col-xl-9">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label>Show entries </label>
                                  <select
                                    className="form-control"
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
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label htmlFor className="d-block">
                                    Sort by:
                                  </label>
                                  <select
                                    name
                                    className="form-control sort-select"
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
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label htmlFor className="d-block">
                                    Filter by Category
                                  </label>
                                  <select
                                    name
                                    className="form-control"
                                    id
                                    value={category}
                                    onChange={(e) => {
                                      setcategory(e.target.value);
                                    }}
                                  >
                                    <option value="">All</option>
                                    {allofcategory?.length > 0 &&
                                      allofcategory?.map((allcat) => (
                                        <option value={allcat?._id}>
                                          {allcat?.categorytitle}
                                        </option>
                                      ))}
                                  </select>
                                </div>
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label htmlFor className="d-block">
                                    Filter by Status
                                  </label>
                                  <select
                                    name
                                    className="form-control"
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
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="row">
                                <div className="col-12 mt-2">
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
                                          handleGetProducts();
                                        }
                                      }}
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
                                  <table className="table table-borderless dataTable">
                                    <thead>
                                      <tr>
                                        <th className>ID</th>
                                        <th className>SKU</th>
                                        <th className>Name</th>
                                        <th className>Category</th>
                                        <th className>Status</th>
                                        <th className>Action</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {products?.docs?.length > 0 &&
                                        products?.docs?.map((prod, index) => (
                                          <tr>
                                            <td className>{index + 1}</td>
                                            <td>{prod?._id}</td>
                                            <td>{prod?.name}</td>
                                            <td>
                                              {prod?.category?.categorytitle}
                                            </td>
                                            <td>
                                              {" "}
                                              {prod?.status
                                                ? "Active"
                                                : "Inactive"}
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
                                                    className="dropdown-item"
                                                    to={`/ProductEdit${prod?._id}`}
                                                  >
                                                    <i className="fa fa-eye" />
                                                    View Detail
                                                  </Link>

                                                  <Link
                                                    to="#"
                                                    onClick={() => {
                                                      deleteProductHandler(
                                                        prod?._id
                                                      );
                                                    }}
                                                    className="dropdown-item"
                                                    data-toggle="modal"
                                                    data-target=".delete-product"
                                                  >
                                                    <i className="fa fa-trash-alt" />
                                                    Remove
                                                  </Link>
                                                  <Link
                                                    onClick={() =>
                                                      handleChangeStatus(
                                                        prod?._id,
                                                        !prod?.status
                                                      )
                                                    }
                                                    className="dropdown-item"
                                                    data-toggle="modal"
                                                    data-target=".inactive-product"
                                                  >
                                                      <i className= {!prod.status
                                                      ? "fa fa-check-circle"
                                                      : "fa fa-ban"}  />
                                                    {!prod.status
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
                              {products?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={products?.totalDocs}
                                  totalPages={products?.totalPages}
                                  currentPage={products?.page}
                                  setPage={setPage}
                                  hasNextPage={products?.hasNextPage}
                                  hasPrevPage={products?.hasPrevPage}
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

export default Products;
