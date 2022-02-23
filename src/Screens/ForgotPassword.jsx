import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import Toasty from "../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { validateEmail } from "../utils/ValidateEmail";

const ForgotPassword = ({ history }) => {
    const [email, setemail] = useState("");
    const submitHandler = async () => {
      const emailvalidation = validateEmail(email);
      console.log("emmmm", emailvalidation);
      console.log("addEmployeeHandler");
      if (emailvalidation == true) {
        const body = { email };
        console.log("TEST");
  
        try {
          const res = await api.post("/auth/adminRecoverPassword", body);
          console.log("res", res);
          if (res?.status == 201) {
            Swal.fire({
              icon: "success",
              title: "SUCCESS",
              text: "Verification Code Sent to your mail",
              showConfirmButton: false,
              timer: 1500
            });
            history.push({
              pathname: "/verificationcode",
              state: { email }
            });
          }
        } catch (error) {
          console.log("IN HERE");
          console.log(error?.response?.data);
          Toasty("error", `🦄 Invalid Email!`);
        }
      } else {
        Toasty("error", `Please enter a valid email`);
      }
    };
  return (
    <div>
      <section className="login-wrap">
        <div className="container m-auto">
          <div className="login-inner">
            <div className="row">
              <div className="col-lg-12 col-12 ">
                <div className="right">
                  <div className="logo text-center">
                    <img src="images/login-logo.png" alt="" />
                  </div>
                  <h1 className>Password Recovery</h1>
                  <form >
                    <div className="row">
                      <div className="col-12 form-group position-relative">
                        <label htmlFor>
                          Email Address<span className="text-danger">*</span>
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
                        <p className="pl-2 pt-1 text-dark">
                          Please Enter Your Email Address
                        </p>
                        <p className="pl-2 pt-1 primary-text d-none">
                          The email address does not exist
                        </p>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-block col-12 text-center mt-1">
                        <button
                          type="button"
                          className="btn btn-primary btn-login"
                          onClick={() =>
                            email?.length > 0
                              ? submitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                )
                          }
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-block col-12 text-center mt-2">
                        <Link to="/" className="primary-text font-weight-bold">
                          Back To Login
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
