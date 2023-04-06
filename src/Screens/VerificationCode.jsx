import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Toasty from "../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import InputNumber from "../components/InputNumber";
const VerificationCode = ({ match, history }) => {
  const [loading, setloading] = useState(false);
  const [code, setcode] = useState(0);
  const onSubmitHandler = async () => {
    try {
      console.log("body", code, match?.params?.email);
      const body = { code, email: match?.params?.email };
      console.log("TEST");
      // try {
      setloading(true);

      const res = await api.post("/auth/adminverifyRecoverCode", body);
      console.log("res", res);
      setloading(false);

      history?.push({
        pathname: "/resetPassword",
        state: { code: code, email: match?.params?.email }
      });
    } catch (error) {
      console.log("error", error?.response);
      setloading(false);

      // alert(error?.response?.data?.message)
      Toasty("error", `🦄 ${error?.response?.data?.message}!`);
    }

    //   if(res?.status==201){
    //     Toasty('success',`Verification Code Has Been Emailed To Your Email Address`);
    //     history.push('/verificationcode')

    //   }
    // } catch (error) {
    //   Toasty('error',`🦄 Invalid Email!`);

    // }
  };
  const resentCodeHandler = async (e) => {
    e.preventDefault();
    const useremail = match?.params?.email;
    const body = { email: useremail };

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
      }
    } catch (error) {
      console.log(error.response);
      Toasty("error", `🦄 Invalid Email!`);
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
                    <p>Enter Verification Code To Recover Your Password.</p>
                  </div>
                  <form className="py-2">
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">Verification Code<span className="text-danger">*</span></label>
                      <div className="position-relative">
                        <InputNumber
                          value={code}
                          onChange={setcode}
                          max={12}
                          className="form-control"
                        />                </div>
                    </div>
                    <div className="form-field text-center mt-4">
                    {!loading ? ( <button onClick={() =>
                            code > 0
                              ? onSubmitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                )
                          } type="button" className="siteBtn mx-auto">Continue</button>   ) : (
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

export default VerificationCode;
