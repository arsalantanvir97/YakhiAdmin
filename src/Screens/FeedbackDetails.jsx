import React, { useEffect } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import { getFeedbackDetails } from "./Api/Feedback";
const FeedbackDetails = ({ match,history }) => {

  const usequeryClient = new useQueryClient();

  const { isLoading: feedloading, data: feedback } = useQuery(["feedback", match.params.id], () =>
    getFeedbackDetails(match.params.id),
  );

  return (
    <div>
      {feedloading ? <Loader /> :
        <div className="app-content content uploadVideoMain">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration">
                <div className="row">
                  <div className="col-12">
                    <div className="card-content collapse show dashCard py-5 px-5">
                      <div className="row justify-content-center mb-3">
                        <div className="col-md-12">
                          <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                            <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                              history.goBack()
                            }} /> Feedback Detail</h3>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-2">
                          <div className="felid">
                            <label className="h_14 gray-colour">Name</label>
                            <p className="h_16 text-black fw-bold qanelas">{feedback?.firstName + ' ' + feedback?.lastName} </p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="felid">
                            <label className="h_14 gray-colour">Email Address</label>
                            <p className="h_16 text-black fw-bold qanelas">{feedback?.email}</p>
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="felid">
                            <label className="h_14 gray-colour">Date</label>
                            <p className="h_16 text-black fw-bold qanelas"> {moment.utc(feedback?.createdAt).format("LL")}</p>
                          </div>
                        </div>
                      </div>
                      {/* <div className="row mb-3">
                   <div className="col-md-2">
                     <div className="felid">
                       <label className="h_14 gray-colour">Ser Type</label>
                       <p className="h_16 text-black fw-bold qanelas">Abc</p>
                     </div>
                   </div>                               
                 </div>  */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <div className="felid">
                            <label className="h_14 gray-colour">Report</label>
                            <p className="h_16 text-black fw-bold qanelas">{feedback?.message}</p>
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
      }
    </div>
  );
};

export default FeedbackDetails;
