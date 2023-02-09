import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { baseURL } from "../utils/api";
import { getNotifications } from "./Api/Notifications";

const Notification = () => {
  const { isLoading, data: notifications } = useQuery(["notifications"], () =>
  getNotifications(),
    console.log('abc')
  );



  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration" className="all-notifications">
                <div className="row">
                  <div className="col-12">
                    <div className="card rounded">
                      <div className="card-body p-md-2 p-lg-3 p-xl-4">
                        <div className="page-title">
                          <div className="row">
                            <div className="col-12">
                              <h1>Notifications</h1>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-12 col-lg-11">
                            {notifications?.length > 0 && notifications?.map(not => (
                              <div className="noti-inner-cards">
                                <div className="card">
                                  <div className="noti-content">
                                    <div className="row">
                                      <div className="col-sm-12">
                                        <div className="media">
                                          <i
                                            className="fa fa-bell"
                                            aria-hidden="true"
                                          />
                                          <div className="media-body">
                                            <p>
                                              {not?.body}{" "}
                                            </p>
                                            <div className="meta mt-2">
                                              <time className="time-meta" dateTime>
                                                {moment(not?.createdAt).fromNow()}
                                              </time>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>))}
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

export default Notification;
