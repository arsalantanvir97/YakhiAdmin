import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
import DatePicker from "react-datepicker";
import InputNumber from "../components/InputNumber";
import { createAPromoCode } from "./Api/PromoCodes";
import { useMutation, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";

const AddPromoCode = ({ history }) => {
  const usequeryClient = new useQueryClient();

  const [title, settitle] = useState("");
  const [startingdate, setstartingdate] = useState("");
  const [endingdate, setendingdate] = useState("");
  const [promocode, setpromocode] = useState("");
  const [discount, setdiscount] = useState("");
  const [minorderamount, setminorderamount] = useState("");
  const [status, setstatus] = useState("");


  const [loading, setloading] = useState(false);

  const { mutate, isLoading, status: promostatus } = useMutation((data) => createAPromoCode(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'PromoCode Created Successfully');
      usequeryClient.invalidateQueries(['promocodes'])

      history.push("/PromoCode");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const submitHandler = async () => {
    console.log("await");
    const body = { title, startingdate, endingdate, promocode, discount, minorderamount,status }
    mutate(body)
  };

  return (
    <div>
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
                          }} /> Add Promo</h3>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Promo Code<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <InputNumber
                              value={promocode}
                              onChange={setpromocode}
                              max={9}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Amount Or Percent<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <InputNumber
                              value={discount}
                              onChange={setdiscount}
                              max={9}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Min Order Amount* $<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <InputNumber
                              value={minorderamount}
                              onChange={setminorderamount}
                              max={9}
                              className="form-control"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Starting Date<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <DatePicker
                              minDate={new Date()}
                              selected={startingdate}
                              onChange={(startingdate) =>
                                setstartingdate(startingdate)
                              }
                              className="siteInput"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Status<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <select value={status}
                              onChange={(e) => {
                                setstatus(e.target.value);

                              }}>
                              <option value={true} >
                                Active
                              </option>
                              <option value={false}>Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Promo Desc<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <input type="text" className="siteInput" value={title}
                              onChange={(e) => {
                                settitle(e.target.value);
                              }} name id />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mt-3">
                      <div className="col-md-12">
                        {!isLoading ? (
                          <Link
                            to="#" onClick={() => {
                              promocode > 0 &&
                                discount > 0 &&
                                title?.length > 0
                                ? submitHandler()
                                : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                );
                            }} className="btn_darkbluep">Add </Link>
                        ) : (
                          <i className="fas fa-spinner fa-pulse"></i>
                        )}
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

export default AddPromoCode;
