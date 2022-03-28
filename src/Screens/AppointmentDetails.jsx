import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const AppointmentDetails = ({ match }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [appointment, setappointment] = useState("");

  useEffect(() => {
    handleGetAppointment();
  }, []);

  const handleGetAppointment = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/consultationRoutes/getConsultationDetails/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setappointment(res?.data?.consultation);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
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
                            <h1>Appointment</h1>
                          </div>
                          <div className="col-12">
                            <h3>Appointment Information </h3>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label>Full name</label>
                          </div>
                          <div className="col-12">
                            {" "}
                            {appointment?.consultationaddress?.firstName +
                              " " +
                              appointment?.consultationaddress?.lastName}
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label>Email</label>
                          </div>
                          <div className="col-12">
                            {appointment?.consultationaddress?.email}
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Appointment Date</label>
                          </div>
                          <div className="col-12">
                            {appointment?.appointmentdate}
                          </div>
                        </div>
                        {/* <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Subject</label>
                          </div>
                          <div className="col-12">Abc</div>
                        </div> */}
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Appointment Time</label>
                          </div>
                          <div className="col-12">
                            {appointment?.appointmenttime}
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Valid Government Issued ID</label>
                          </div>
                          <div className="col-12 col-md-5">
                            <button
                              type="button"
                              className="btn btn-primary btn-login"
                              onClick={() =>
                                window.open(
                                  `${imageURL}${appointment?.governmentid}`,
                                  "_blank"
                                )
                              }
                            >
                              View
                            </button>
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
      </div>
    </div>
  );
};

export default AppointmentDetails;
