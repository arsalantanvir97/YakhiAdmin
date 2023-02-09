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

  const [loading, setloading] = useState(false);

  const { mutate, isLoading, status } = useMutation((data) => createAPromoCode(data), {
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
    const body = { title, startingdate, endingdate, promocode, discount }
    mutate(body)
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
                            <h1>
                              <Link to="/PromoCode">
                                <i className="fa fa-angle-left" />
                              </Link>
                              Add Promo Code
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Title
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              value={title}
                              onChange={(e) => {
                                settitle(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Starting Date{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <DatePicker
                              minDate={new Date()}
                              selected={startingdate}
                              onChange={(startingdate) =>
                                setstartingdate(startingdate)
                              }
                              className="sort-date customdate form-conform-controltrol"
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Ending Date <span className="text-danger">*</span>
                            </label>
                            <DatePicker
                              minDate={new Date()}
                              selected={endingdate}
                              onChange={(endingdate) =>
                                setendingdate(endingdate)
                              }
                              className="sort-date customdate form-conform-controltrol"
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              PromoCode <span className="text-danger">*</span>
                            </label>
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
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Discount %<span className="text-danger">*</span>
                            </label>
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
                        <div className="row detail-row mt-1">
                          <div className="col-12 col-md-6 col-xl-4">
                            {!isLoading ? (
                              <Link
                                to="#"
                                className="btn btn-primary btn-fixed-190"
                                onClick={() => {
                                  promocode > 0 &&
                                    discount > 0 &&
                                    title?.length > 0
                                    ? submitHandler()
                                    : Toasty(
                                      "error",
                                      `Please fill out all the required fields!`
                                    );
                                }}
                              >
                                Create
                              </Link>
                            ) : (
                              <i className="fas fa-spinner fa-pulse"></i>
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
      </div>
    </div>
  );
};

export default AddPromoCode;
