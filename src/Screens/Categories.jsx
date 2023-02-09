import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import { categoryLogs, changeStatus } from "./Api/Categories";
import SwalAlert from "../components/SwalAlert";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
const Categories = () => {
  const usequeryClient = new useQueryClient();
  const [sort, setsort] = useState();

  // const [categories, setcategories] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const { isFetching, isLoading, data: categories, status: prodstatus, refetch } = useQuery({
    queryKey: ["categorylogs", page, perPage, from, to, status, searchString, sort],
    queryFn: () => categoryLogs(page, perPage, from, to, status, searchString, sort,),
    keepPreviousData: true

  });

  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', res?.data?.message);

        usequeryClient.invalidateQueries(['categories'])
        usequeryClient.invalidateQueries(['categorylogs'])

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
                                                      to={`/EditCategory/${cat?._id}`}
                                                      className="dropdown-item"
                                                    >
                                                      <i className="fa fa-eye" />
                                                      Edit
                                                    </Link>
                                                    <Link
                                                      onClick={() =>
                                                        handleChangeStatus.mutate(
                                                          cat._id,
                                                        )
                                                      }
                                                      className="dropdown-item"
                                                      data-toggle="modal"
                                                      data-target=".inactive-category"
                                                    >
                                                      <i className={!cat.status
                                                        ? "fa fa-check-circle"
                                                        : "fa fa-ban"} />
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
        </div>}
    </div>
  );
};

export default Categories;
