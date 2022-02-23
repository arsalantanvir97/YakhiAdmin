import React, { useState, useEffect } from "react";
import api from "../utils/api";
import Toasty from "../utils/toast";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import InputNumber from "../components/InputNumber";
const VerificationCode = (props) => {
  useEffect(() => {
    console.log("props", props);
  }, [props]);
  const [code, setcode] = useState(0);
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const onSubmitHandler = async () => {
    try {
      console.log("body", code, props?.location?.state?.email);
      const body = { code, email: props?.location?.state?.email };
      console.log("TEST");
      // try {
      const res = await api.post("/auth/adminverifyRecoverCode", body);
      console.log("res", res);
      props?.history?.push({
        pathname: "/resetPassword",
        state: { code: code, email: props?.location?.state?.email },
      });
    } catch (error) {
      console.log("error", error?.response);
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
    const useremail = props?.location?.state?.email;
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
          timer: 1500,
        });
      }
    } catch (error) {
      console.log(error.response);
      Toasty("error", `🦄 Invalid Email!`);
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
                      <div className="col-12 form-group position-relative mb-1">
                        <label htmlFor>
                          Verification Code
                          <span className="primary-text">*</span>
                        </label>
                        <InputNumber
                          value={code}
                          onChange={setcode}
                          max={12}
                          className="form-control"
                        />
                        <div className="d-flex justify-content-between pl-2 pt-1">
                          <p className="text-dark">
                            Please Enter Your Email Address
                          </p>
                          <p className="primary-text d-none">
                            The number you've entered does not match your code.
                            Please try again!
                          </p>
                          <p className="text-dark">
                            Didn't Get A Code?{" "}
                            <Link
                              onClick={resentCodeHandler}
                              to="#"
                              className="primary-text forgot"
                            >
                              {" "}
                              Sent It Again
                            </Link>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-block col-12 text-center mt-1">
                        <button
                          type="button"
                          onClick={() =>
                            code > 0
                              ? onSubmitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                )
                          }
                          className="btn btn-primary btn-login"
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-block col-12 text-center mt-2">
                        <Link to='/'
                          className="primary-text font-weight-bold"
                        >
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

export default VerificationCode;