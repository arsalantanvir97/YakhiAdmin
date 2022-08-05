import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
import { validateEmail } from "../utils/ValidateEmail";
import DatePicker from "react-datepicker";
import InputNumber from "../components/InputNumber";

const AddPromoCode = ({ history }) => {
  const [title, settitle] = useState("");
  const [startingdate, setstartingdate] = useState("");
  const [endingdate, setendingdate] = useState("");
  const [promocode, setpromocode] = useState("");
  const [discount, setdiscount] = useState("");

  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const submitHandler = async () => {
    setloading(true);
    console.log("createCategoryHandler");
    try {
      console.log("await");
      const res = await axios.post(
        `${baseURL}/promo/createPromoCode`,
        { title, startingdate, endingdate, promocode, discount },
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        }
      );
      setloading(false);
      console.log("res", res);
      if (res?.status == 201) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "PromoCode Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("blockkk2");

        history.push("/PromoCode");
        console.log("blockkk3");
      }
    } catch (error) {
      setloading(false);
      console.log("error", error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error?.response?.data?.message,
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  useEffect(() => {
    console.log("startingdatae", startingdate);
  }, [startingdate]);

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
                            {!loading ? (
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
