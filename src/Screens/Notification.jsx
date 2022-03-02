import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseURL } from "../utils/api";

const Notification = () => {
  const [notifications, setnotifications] = useState([]);
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  useEffect(() => {
    getAllNotification();
  }, []);

  const getAllNotification = async () => {
    try {
      // dispatch({
      //   type: ADMIN_LOGIN_REQUEST,
      // })

      console.log("getallNotification");
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      };

      const res = await axios.get(
        `${baseURL}/notification/notifications`,
        config
      );
      console.log("res", res);
      if (res?.status == 201) {
        setnotifications(res?.data?.notification);
      }
    } catch (error) {}
  };
  return (
    <div>
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
                        {notifications?.length>0 &&notifications?.map(not=>(
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
      </div>
    </div>
  );
};

export default Notification;
