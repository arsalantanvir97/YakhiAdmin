import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminResetPasswordAction } from "../actions/adminActions";
import Toasty from "../utils/toast";

const ResetPassword = (props) => {
  const dispatch = useDispatch();
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);

  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const onSubmitHandler = () => {
      
    console.log(
      "body",
      password,
      confirm_password,
      props?.location?.state?.code,
      props?.location?.state?.email
    );
    dispatch(
      adminResetPasswordAction(
        password,
        confirm_password,
        props?.location?.state?.code,
        props?.location?.state?.email
      )
    );
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
                  <form action="dashboard.php">
                    <div className="row">
                      <div className="col-12 form-group mb-1">
                        <label htmlFor>
                          New Password <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="position-relative">
                          <input
                            type={showicon ? "password" : "text"}
                            className="form-control enter-input"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => {
                              setpassword(e.target.value);
                            }}
                          />{" "}
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
                    <div className="row">
                      <div className="col-12 form-group mb-1">
                        <label htmlFor>
                          Confirm Password{" "}
                          <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="position-relative">
                          <input
                            type={showicon2 ? "password" : "text"}
                            className="form-control enter-input"
                            placeholder="Enter Password"
                            value={confirm_password}
                            onChange={(e) => {
                              setconfirm_password(e.target.value);
                            }}
                          />{" "}
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
                    <div className="row">
                      <div className="d-block col-12 text-center mt-2">
                        <button
                         onClick={() =>
                            password?.length > 0 && confirm_password?.length > 0
                              ? onSubmitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                )
                          }
                          type="button"
                          className="btn btn-primary btn-login"
                        >
                          Update
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

export default ResetPassword;
