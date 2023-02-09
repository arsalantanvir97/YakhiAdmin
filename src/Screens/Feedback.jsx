import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import moment from "moment";
import DatePicker from "react-datepicker";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import { changeStatus, deleteFeedback, feedbackLogs } from "./Api/Feedback";
import SwalAlert from "../components/SwalAlert";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
const Feedback = () => {
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // const [feedbacklogs, setfeedbacklogs] = useState([]);
  const usequeryClient = new useQueryClient();

  const { isFetching, isLoading, data: feedbacklogs, status: prodstatus, refetch } = useQuery({
    queryKey: ["feedbacks", page,
      perPage,
      searchString,
      from,
      to,
      sort],
    queryFn: () => feedbackLogs(page,
      perPage,
      searchString,
      from,
      to,
      sort,),
    keepPreviousData: true

  });

  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', res?.data?.message);

        usequeryClient.invalidateQueries(['feedbacks'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );
  const deleteFeedbackHandler = useMutation(
    {
      mutationFn: (data) => deleteFeedback(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', 'Feedback Deleted Successfully');

        usequeryClient.invalidateQueries(['feedbacks'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );


  return (
    <>
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
                              <div className="col-12">
                                <h1>Feedback</h1>
                              </div>
                            </div>
                          </div>
                          <div className="dataTables_wrapper">
                            <div className="user-listing-top">
                              <div className="row align-items-end d-flex mb-1">
                                <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
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
                                <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
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
                                <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                                  <label htmlFor className="d-block">
                                    From
                                  </label>
                                  <DatePicker
                                    placeholderText="Select a starting date"
                                    selected={from}
                                    onChange={(from) => setFrom(from)}
                                    className="sort-date customdate form-control"
                                  />{" "}
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                                  <label htmlFor className="d-block">
                                    To
                                  </label>
                                  <DatePicker
                                    selected={to}
                                    placeholderText="Select an ending date"
                                    onChange={(to) => setTo(to)}
                                    className="sort-date customdate form-control"
                                  />{" "}
                                </div>
                                <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2 offset-xl-1 offset-0">
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
                                <div className="dataTables_wrapper container-fluid dt-bootstrap4">
                                  <div className="row">
                                    <div className="col-sm-12">
                                      <table className="table table-borderless  dataTable">
                                        <thead>
                                          <tr>
                                            <th className="sorting_asc">
                                              S. No.
                                            </th>
                                            <th className="sorting">
                                              First Name
                                            </th>
                                            <th className="sorting">Last Name</th>
                                            <th className="sorting">Email</th>
                                            <th className="sorting">Date</th>
                                            <th className="sorting">ACTION</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {feedbacklogs?.docs?.length > 0 &&
                                            feedbacklogs?.docs?.map(
                                              (feed, index) => (
                                                <tr>
                                                  <td className>{index + 1}</td>
                                                  <td>{feed?.firstName}</td>
                                                  <td>{feed?.lastName}</td>
                                                  <td>{feed?.email}</td>
                                                  <td>
                                                    {moment
                                                      .utc(feed?.createdAt)
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
                                                          className="dropdown-item"
                                                          to={`/FeedbackDetails${feed?._id}`}
                                                        >
                                                          <i className="fa fa-eye" />
                                                          View Detail
                                                        </Link>
                                                        <Link
                                                          className="dropdown-item"
                                                          to="#"
                                                          onClick={() => {
                                                            deleteFeedbackHandler.mutate(
                                                              feed?._id
                                                            );
                                                          }}
                                                          data-toggle="modal"
                                                          data-target=".delete-feedback"
                                                        >
                                                          <i className="fa fa-trash-alt" />
                                                          Delete
                                                        </Link>
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )
                                            )}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  {feedbacklogs?.docs?.length > 0 && (
                                    <Pagination
                                      totalDocs={feedbacklogs?.totalDocs}
                                      totalPages={feedbacklogs?.totalPages}
                                      currentPage={feedbacklogs?.page}
                                      setPage={setPage}
                                      hasNextPage={feedbacklogs?.hasNextPage}
                                      hasPrevPage={feedbacklogs?.hasPrevPage}
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
    </>
  );
};

export default Feedback;
