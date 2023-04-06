import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Pagination from "../components/Padgination";
import { baseURL } from "../utils/api";
import { getNotifications, notificationLogs } from "./Api/Notifications";

const Notification = () => {
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // const [feedbacklogs, setfeedbacklogs] = useState([]);
  const usequeryClient = new useQueryClient();

  const { isFetching, isLoading, data: noifligs,  refetch } = useQuery({
    queryKey: ["notification", page,
      perPage,
      from,
      to,
   ],
    queryFn: () => notificationLogs(page,
      perPage,
      from,
      to,
    ),
    keepPreviousData: true

  });



  return (
    <div>
      {isLoading ? <Loader /> :
      <div className="app-content content dashboard">
      <div className="content-wrapper">
        <div className="content-body">
          <section className="sec_noti" id="configuration">
            <div className="box py-4">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                    <h3 className="pageTitle">Notifications</h3>
                  </div>
                </div>
              </div>
              {/* <div className="row mb-4">
                <div className="col-md-2 d-lg-flex align-items-center">
                  <select>
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </div>                 */}
              <div className="row">
                <div className="col-md-12">
                  <div className="noti_boxm">
                    <ul className="noti_box">
                    {noifligs?.docs?.length > 0 &&
                                    noifligs?.docs?.map(
                                      (not, index) => (
                      <li className="mb-5">
                        <div className="d-flex align-items-center justify-content-between">
                          <div className="d-flex align-items-center">
                            <div className="noti_boxl mr-5">
                              <i className="fas fa-bell" />
                            </div>
                            <div className="noti_boxr">
                              <p className="mb-2">                                              {not?.body}{" "}
</p>
                              <h6><strong> {moment(not?.createdAt).fromNow()}</strong></h6>
                            </div>
                          </div>
                          {/* <div className="noti_boxe">
                            <a href="#" className="btn_orangebor">mark as read</a>
                          </div> */}
                        </div>
                      </li>  )
                                    )}
                    </ul>
                  </div>
                </div>
              </div>
              {noifligs?.docs?.length > 0 && (
                          <Pagination
                            totalDocs={noifligs?.totalDocs}
                            totalPages={noifligs?.totalPages}
                            currentPage={noifligs?.page}
                            setPage={setPage}
                            hasNextPage={noifligs?.hasNextPage}
                            hasPrevPage={noifligs?.hasPrevPage}
                          />
                        )}             
            </div>
          </section>
        </div>
      </div>
    </div>
    }
    </div>
  );
};

export default Notification;
