import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeStatus, deleteProduct, getProducts } from "./Api/Products";
import { getCategories } from "./Api/Categories";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";

const Products = () => {
  const [sort, setsort] = useState();

  const [products, setproducts] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [category, setcategory] = useState();
  // const [allofcategory, setallofcategory] = useState([]);
  // const [geogeneticscategory, setgeogeneticscategory] = useState([]);

  const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
    getCategories()
  );
  const usequeryClient = new useQueryClient();



  const { isFetching, isLoading, data, status: prodstatus, refetch } = useQuery({
    enabled: allofcategory?.length > 0,
    queryKey: ["products", page, perPage, from, to, status, searchString, sort, category],
    queryFn: () => getProducts(page, perPage, from, to, status, searchString, sort, category),
    keepPreviousData: true

  });

  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', res?.data?.message);

        usequeryClient.invalidateQueries(['products'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );
  const deleteProductHandler = useMutation(
    {
      mutationFn: (data) => deleteProduct(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', 'Product Deleted Successfully');

        usequeryClient.invalidateQueries(['products'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <div>
      {prodstatus == 'loading' ? <Loader /> :
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
                                            console.log('object');

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
                                        {data?.docs?.length > 0 &&
                                          data?.docs?.map((prod, index) => (
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
                                                      to={`/ProductEdit/${prod?._id}`}
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </Link>

                                                    <Link
                                                      to="#"
                                                      onClick={() => {
                                                        deleteProductHandler.mutate(
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
                                                        handleChangeStatus.mutate(
                                                          prod?._id,
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                      data-toggle="modal"
                                                      data-target=".inactive-product"
                                                    >
                                                      <i className={!prod.status
                                                        ? "fa fa-check-circle"
                                                        : "fa fa-ban"} />
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
                                {data?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={data?.totalDocs}
                                    totalPages={data?.totalPages}
                                    currentPage={data?.page}
                                    setPage={setPage}
                                    hasNextPage={data?.hasNextPage}
                                    hasPrevPage={data?.hasPrevPage}
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

export default Products;
