import React, { useEffect, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import SwalAlert from '../components/SwalAlert';
import Toasty from '../utils/toast';
import { timeslotDoctor } from './Api/Doctor';
import { timeslotAdmin } from './Api/Auth';
let pushinginarray = []

const ManageAvailibilty = ({ history, match }) => {
  const usequeryClient = new useQueryClient();

  const [timimgslot, settimimgslot] = useState([
    { day: 'Monday', from: '', to: "" },
    { day: 'Tuesday', from: '', to: "" },
    { day: 'Wednesday', from: '', to: "" },
    { day: 'Thursday', from: '', to: "" },
    { day: 'Friday', from: '', to: "" },
    { day: 'Saturday', from: '', to: "" },
    { day: 'Sunday', from: '', to: "" },

  ])


  const handlechangeinput = (index, event) => {
    const values = [...timimgslot];
    values[index][event.target.name] = event.target.value;
    settimimgslot(values);
  };

  const offday = (index) => {
    console.log('pushinginarray', pushinginarray)
    if (pushinginarray.includes(index)) {
      console.log('includes')
      pushinginarray = pushinginarray.filter((i => (i !== index)));

    } else {
      pushinginarray = [...pushinginarray, index];

    }
  }
  const { mutate, isLoading: editloading, status: promostatus } = useMutation((data) => timeslotAdmin(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Appointment Updated Successfully');


      history.push("/Appointments");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });



  const manageAppointment = () => {
    var res = timimgslot.filter(function (eachElem, index) {
      return pushinginarray.indexOf(index) !== -1
    })

    console.log('res', res)
    const body = {
      timimgslot: res,
    }
    mutate(body)
  }

  return (
    <div><div className="app-content content uploadVideoMain">
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
                        }} /> Manage Availablity</h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-7">
                      {timimgslot?.length > 0 && timimgslot?.map((tim, index) => (
                        <div className="row mb-3">
                          <div className="col-12">
                            <div className="form-field mb-1">
                              <label htmlFor className="siteLabel ps-4 mb-1">{tim?.day}<span className="text-danger">*</span></label>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="form-field">
                              <div className="position-relative d-flex">
                                <input type="time" name='from' value={tim.from}
                                  onChange={(event) =>
                                    handlechangeinput(index, event)
                                  } className="siteInput" placeholder="03:50" />
                                <input type="time" name='to' value={tim.to}
                                  onChange={(event) =>
                                    handlechangeinput(index, event)
                                  } className="siteInput ms-3" placeholder="03:50" />
                              </div>
                            </div>
                          </div>
                          <div className="col-12">
                            <div className="align-content-center d-flex justify-content-end mAButton">
                              <button><i className="fas fa-plus" /></button>
                              <button><i className="fas fa-trash-alt" /></button>
                              <div className="form-check form-switch mAswitch">
                                <input className="form-check-input" type="checkbox" onChange={() => {
                                  offday(index)
                                }} id="flexSwitchCheckDefault" />
                              </div>
                            </div>
                          </div>
                        </div>))}

                    </div>
                  </div>
                  {/* <div class="row">
                            <div class="col-md-4">
                                <div class="form-field">
                                    <label for="" class="siteLabel ps-4 mb-2">Last Name<span class="text-danger">*</span></label>
                                    <div class="position-relative">
                                        <input type="text" class="siteInput" placeholder="Enter Last Name" name="" id="">
                                    </div>
                                </div>                                    
                            </div>
                            <div class="col-md-4">
                                <div class="form-field">
                                    <label for="" class="siteLabel ps-4 mb-2">Phone Number<span class="text-danger">*</span></label>
                                    <div class="position-relative">
                                        <input type="number" class="siteInput" placeholder="Enter Phone Number" name="" id="">
                                    </div>
                                </div>                                    
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <div class="form-field">
                                    <label for="" class="siteLabel ps-4 mb-2">Email Address<span class="text-danger">*</span></label>
                                    <div class="position-relative">
                                        <input type="email" class="siteInput" placeholder="Enter Email Address" name="" id="">
                                    </div>
                                </div>                                    
                            </div>
                            <div class="col-md-4">
                                <div class="form-field">
                                    <label for="" class="siteLabel ps-4 mb-2">Password<span class="text-danger">*</span></label>
                                    <div class="passwordWrapper position-relative">
                                        <input type="password" class="siteInput passInput" placeholder="Enter Password" name="" id="">
                                        <button type="button" class="passDisplay">
                                            <i class="fas fa-eye-slash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>                                    
                            </div>
                        </div>
                        <div class="row mb-3">
                            <div class="col-md-4">
                                <div class="form-field">
                                    <label for="" class="siteLabel ps-4 mb-2">Confirm Password<span class="text-danger">*</span></label>
                                    <div class="passwordWrapper position-relative">
                                        <input type="password" class="siteInput passInput" placeholder="Confirm Password" name="" id="">
                                        <button type="button" class="passDisplay">
                                            <i class="fas fa-eye-slash" aria-hidden="true"></i>
                                        </button>
                                    </div>
                                </div>                                    
                            </div>
                        </div> */}
                  <div class="row">
                    <div class="col-md-12">
                      {editloading ? <i className="fas fa-spinner fa-pulse"></i> :
                        <Link to='#' onClick={() =>
                          timimgslot?.length > 0
                            ? manageAppointment()
                            : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                        } class="btn_darkbluep">Add</Link>}
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
  )
}

export default ManageAvailibilty