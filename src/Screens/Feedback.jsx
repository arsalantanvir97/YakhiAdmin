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
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
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
          <div className="app-content content dashboard">
            <div className="content-wrapper">
              <div className="content-body">
                {/* Basic form layout section start */}
                <section id="configuration">
                  <div className="row">
                    <div className="col-12">
                      <div className="card-content collapse show dashCard py-5 px-5">
                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                              <h3 className="pageTitle"> Feedbacks</h3>
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
                                    <th>Name</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {feedbacklogs?.docs?.length > 0 &&
                                    feedbacklogs?.docs?.map(
                                      (feed, index) => (
                                        <tr>
                                          <td className>{index + 1}</td>
                                          <td>{feed?.firstName + ' ' + feed?.lastName}</td>
                                          <td>
                                            {moment
                                              .utc(feed?.createdAt)
                                              .format("LL")}
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
                                                  </li>
                                                </ul>
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
                </section>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  );
};

export default Feedback;
