import React, { useEffect, useState } from "react";
import { baseURL, imageURL } from "../utils/api";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeStatus, getAppointmentDetails } from "./Api/Appointments";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";
const AppointmentDetails = ({ match, history }) => {
  // const [appointment, setappointment] = useState("");
  const usequeryClient = new useQueryClient();

  const { isLoading: apploading, data: appointment } = useQuery(["appointment", match.params.id], () =>
    getAppointmentDetails(match.params.id),
    console.log('abc')
  );




  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', 'Appointment status updated successfully');

        usequeryClient.invalidateQueries(['appointments'])
        usequeryClient.invalidateQueries(['appointment', match.params.id])

      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );

  return (
    <div>
      {apploading ? <Loader /> :
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
                          <div className="row detail-row">
                            <div className="col-12 lablename">
                              <label htmlFor>Appointment Status</label>
                            </div>
                            <div className="col-12 col-md-5">
                              {appointment?.status == "Pending" ? (
                                <>
                                  <button
                                    type="button"
                                    className="btn btn-secondary mr-1"
                                    onClick={() => {
                                      handleChangeStatus.mutate(
                                        'Accepted'
                                      )
                                    }}
                                  >
                                    Accept
                                  </button>
                                  <button
                                    type="button"
                                    className="btn btn-primary ml-2"
                                    onClick={() => {
                                      handleChangeStatus.mutate(
                                        'Rejected'
                                      )
                                    }}
                                  >
                                    Reject
                                  </button>
                                </>
                              ) : (
                                <div className="col-12">
                                  {appointment?.status}
                                </div>
                              )}
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

export default AppointmentDetails;
