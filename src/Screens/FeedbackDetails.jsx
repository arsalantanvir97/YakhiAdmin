import React, { useEffect } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import { getFeedbackDetails } from "./Api/Feedback";
const FeedbackDetails = ({ match }) => {

  const usequeryClient = new useQueryClient();

  const { isLoading: feedloading, data: feedback } = useQuery(["feedback", match.params.id], () =>
    getFeedbackDetails(match.params.id),
  );

  return (
    <div>
      {feedloading ? <Loader /> :
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
                            <div className="col-12">
                              <h3>Feedback Information </h3>
                            </div>
                          </div>
                        </div>
                        <div className="user-block">
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label>First Name</label>
                            </div>
                            <div className="col-12">{feedback?.firstName}</div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label>Last Name</label>
                            </div>
                            <div className="col-12">{feedback?.lastName}</div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label htmlFor>Email</label>
                            </div>
                            <div className="col-12">{feedback?.email}</div>
                          </div>
                          {/* <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Subject</label>
                          </div>
                          <div className="col-12">Abc</div>
                        </div> */}
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label htmlFor>Date</label>
                            </div>
                            <div className="col-12">
                              {" "}
                              {moment.utc(feedback?.createdAt).format("LL")}
                            </div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label htmlFor>Message</label>
                            </div>
                            <div className="col-12 col-md-5">
                              <p>{feedback?.message}</p>
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

export default FeedbackDetails;
