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
  const [loading, setloading] = useState(false);

  const submitHandler = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    if (emailvalidation == true) {
      const body = { email };
      console.log("TEST");
      setloading(true);

      try {
        const res = await api.post("/auth/adminRecoverPassword", body);
        console.log("res", res);
        setloading(false);
        if (res?.status == 201) {
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: "Verification Code Sent to your mail",
            showConfirmButton: false,
            timer: 1500
          });
          history.push({
            pathname: `/verificationcode${email}`
          });

        }
      } catch (error) {
        setloading(false);

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
      <section className="loginPage">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 px-0 loginBgLeft d-none d-lg-block">
              <img src="images/loginLeftImage.png" alt="" className="img-fluid w-100" />
            </div>
            <div className="col-lg-6 loginBgRight">
              <div className="loginCard">
                <div className="text-center mb-3">
                  <img src="images/loginLogo.png" alt="" className="loginLogo img-fluid" />
                </div>
                <div className="formBox">
                  <div className="formHeading text-center">
                    <h2>Password Recovery</h2>
                    <p>Enter Your Email Address To Receive A Verification Code.</p>
                  </div>

                  <form className="py-2">
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">Email Address<span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <input type="email" className="siteInput" placeholder="Enter Email Address" value={email}
                          onChange={(e) => {
                            setemail(e.target.value);
                          }} />
                      </div>
                    </div>
                    <div className="form-field text-center mt-4">
                      {!loading ? (
                        <button type="button" onClick={() =>
                          email?.length > 0
                            ? submitHandler()
                            : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                        } className="siteBtn mx-auto">Continue</button>) : (
                        <i className="fas fa-spinner fa-pulse"></i>
                      )}
                      <Link to="/" className="backToW"><i className="far fa-long-arrow-alt-left" /> Back To Login</Link>
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
