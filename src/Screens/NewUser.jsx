import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
import { validateEmail } from "../utils/ValidateEmail";

const NewUser = ({ history }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const submitHandler = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      setloading(true);
      console.log("createCategoryHandler");
      try {
        console.log("await");
        const res = await axios.post(
          `${baseURL}/auth/registerUserbyAdmin`,
          { firstName, lastName, email, password, confirmpassword },
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
            text: "New User Created Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          console.log("blockkk2");

          history.push("/Users");
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
    } else {
      setloading(false);
      Toasty("error", `Please enter a valid email`);
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
                            <h1>
                              <Link to="/Users">
                                <i className="fa fa-angle-left" />
                              </Link>
                              New User
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              First Name<span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter First Name"
                              value={firstName}
                              onChange={(e) => {
                                setfirstName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Last Name <span className="text-danger">*</span>
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter Last Name"
                              value={lastName}
                              onChange={(e) => {
                                setlastName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Email Address{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="Enter Email Address"
                              value={email}
                              onChange={(e) => {
                                setemail(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Password <span className="text-danger">*</span>
                            </label>
                            <div className="position-relative">
                              <input
                                type={showicon ? "password" : "text"}
                                className="form-control enter-input"
                                placeholder="Enter Password"
                                value={password}
                                onChange={(e) => {
                                  setpassword(e.target.value);
                                }}
                              />

                              <i
                                onClick={() => setshowicon(!showicon)}
                                className={
                                  showicon
                                    ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                    : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                }
                                aria-hidden="true"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6  col-xl-4 form-group">
                            <label>
                              Confirm Password{" "}
                              <span className="text-danger">*</span>
                            </label>
                            <div className="position-relative">
                              <input
                                type={showicon2 ? "password" : "text"}
                                className="form-control enter-input"
                                placeholder="Confirm New Password"
                                value={confirmpassword}
                                onChange={(e) => {
                                  setconfirmpassword(e.target.value);
                                }}
                              />

                              <i
                                onClick={() => setshowicon2(!showicon2)}
                                className={
                                  showicon2
                                    ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                    : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                }
                                aria-hidden="true"
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
                                  password?.length > 0 &&
                                  email?.length > 0 &&
                                  confirmpassword?.length > 0 &&
                                  firstName?.length > 0 &&
                                  lastName?.length > 0
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

export default NewUser;
