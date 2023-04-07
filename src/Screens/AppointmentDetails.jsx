import React, { useEffect, useState } from "react";
import { baseURL, imageURL } from "../utils/api";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { changeStatus, getAppointmentDetails } from "./Api/Appointments";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";
import moment from "moment";
import { Link } from "react-router-dom";
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
      <div className="app-content content dashboard">
      <div className="content-wrapper">
        <div className="content-body">
          <section className="myprofile " id="configuration">
            <div className="box py-5">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                    <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onclick="javascript:history.go(-1)" /> Chat Details</h3>
                    <div className="div">
                      {/* <button className="greenBg selectStatus">Completed</button> */}
                    </div>
                  </div>
                </div> 
              </div>
              <div className="row">
                <div className="col-md-8">
                  <form className="myprofile_main px-5">
                    <div className="row border-bottom-1 mb-3">
                      <div className="col-md-4">
                        <div className="felid d-flex">
                          <label className="h_20 text-black fw-semibold">Booking ID:</label>
                          <p className="h_20 gray-colour fw-semibold ps-3">{appointment?._id}</p>
                        </div>
                      </div>
                      {/* <div className="col-md-4">
                        <div className="felid d-flex">
                          <label className="h_20 text-black fw-semibold">Doctor:</label>
                          <p className="h_20 gray-colour fw-semibold ps-3">Mark Henry</p>
                        </div>
                      </div> */}
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="felid">
                          <h3 className="fw-semibold">Booking Information</h3>
                        </div>
                      </div>
                    </div>
                    <div className="row border-bottom-1 pb-3 mb-3">
                      <div className="col-md-3">
                        <div className="felid">
                          <label className="h_16 gray-colour fw-semibold">Booking Date</label>
                          <p className="h_16 text-black fw-semibold">{moment
                                            .utc(appointment?.appointmentdate)
                                            .format("LL")}</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="felid">
                          <label className="h_16 gray-colour fw-semibold">Booking Time</label>
                          <p className="h_16 text-black fw-semibold">{appointment?.appointmenttime}</p>
                        </div>
                      </div>
                      {/* <div className="col-md-3">
                        <div className="felid">
                          <label className="h_16 gray-colour fw-semibold">Category</label>
                          <p className="h_16 text-black fw-semibold">Herbalist</p>
                        </div>
                      </div> */}
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-12">
                        <div className="felid">
                          <h3 className="fw-semibold">Account Information</h3>
                        </div>
                      </div>
                    </div>
                    <div className="row border-bottom-1 pb-3 mb-3">
                      <div className="col-md-3">
                        <div className="felid">
                          <label className="h_16 gray-colour fw-semibold">Name</label>
                          <p className="h_16 text-black fw-semibold">{appointment?.consultationaddress?.firstName+ " " +appointment?.consultationaddress?.lastName}</p>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="felid">
                          <label className="h_16 gray-colour fw-semibold">Email Address</label>
                          <p className="h_16 text-black fw-semibold">{appointment?.consultationaddress?.email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {/* <div className="col-md-12">
                        <div className="felid">
                          <h3 className="fw-semibold">Description</h3>
                          <label className="h_16 gray-colour fw-semibold">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. Sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam ferment um, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus pronin sapien nunc accuan eget.Lorem</label>
                        </div>
                      </div> */}
                    </div>
                    <div className="row mt-4">
                      <div className="col-md-12">
                        <div className="felid">
                          <Link to='/ChatScreen' className="btn_darkbluep d-inline-block px-5">View Chat</Link>
                        </div>
                      </div>
                    </div>
                  </form>
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

export default AppointmentDetails;
