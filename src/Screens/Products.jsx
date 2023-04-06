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
import SearchFilter from "../components/SearchFilter";
import Calender from "../components/Calender";

const Products = ({ history }) => {
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
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              <section className="myprofile " id="configuration">
                <div className="box py-5">
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                      <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                        <h3 className="pageTitle"> Products</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <ul className="nav nav-tabs tabTop justify-content-center" id="myTab" role="tablist">
                      <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                        <button onClick={() => {
                          history?.push('/Categories')
                        }} className="nav-link" id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="false">Categories</button>
                      </li>
                      <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                        <button  className="nav-link active" id="products-tab" data-bs-toggle="tab" data-bs-target="#products" type="button" role="tab" aria-controls="products" aria-selected="true">Products</button>
                      </li>
                      <li className="nav-item flex-grow-0 flex-fill" role="presentation">
                        <button  onClick={() => {
                          history?.push('/Tags')
                        }} className="nav-link" id="tags-tab" data-bs-toggle="tab" data-bs-target="#tags" type="button" role="tab" aria-controls="tags" aria-selected="false">Tags</button>
                      </li>
                    </ul>
                    <div className="tab-content" id="myTabContent">
                      <div className="tab-pane fade show active" id="categories" role="tabpanel" aria-labelledby="categories-tab">
                        <div className="col-md-12">
                          <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                            <h3 className="pageTitle"> Products</h3>
                            <div>
                              <Link to='/AddProduct' className="btn_darkbluep">Add Products</Link>
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
                                        <Calender
                                          from={from}
                                          to={to}
                                          setFrom={setFrom}
                                          setTo={setTo}
                                        />
                                      </div>
                                      <div className="userInput mb-3">
                                        <label htmlFor className="mainLabel">Filter by Status:</label>
                                        <div className="mb-2">
                                          <select name id className="mainInput filterInput" value={status}
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
                                    <th>Product  Name</th>
                                    <th>Saller</th>
                                    <th>Price</th>
                                    <th>Added On</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {data?.docs?.length > 0 &&
                                    data?.docs?.map((prod, index) => (
                                      <tr>
                                        <td className>{index + 1}</td>
                                        <td>{prod?.name}</td>
                                        <td>{prod?.name}</td>
                                        <td>{prod?.price}</td>
                                        <td>
                                          {moment
                                            .utc(prod?.createdAt)
                                            .format("LL")}
                                        </td>
                                        <td>
                                          {" "}
                                          {prod?.status
                                            ? "Active"
                                            : "Inactive"}
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

                                                    to={`/ProductEdit/${prod?._id}`}
                                                    className="dropdown-item" ><i className="fa fa-eye" /> View</Link>
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
              </section>
            </div>
          </div>
        </div>

      }
    </div>
  );
};

export default Products;
