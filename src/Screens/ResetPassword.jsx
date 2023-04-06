import React, { useState, useEffect } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import SwalAlert from "../components/SwalAlert";
import Toasty from "../utils/toast";
import { resetPasswordAction } from "./Api/Auth";
import { useRecoilState } from "recoil";

import { adminInfo } from "../Recoil";


const ResetPassword = (props) => {
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [adminData, setadminData] = useRecoilState(adminInfo);

  const [password, setpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const { mutate, isLoading, status } = useMutation((data) => resetPasswordAction(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Password reset successfully');

      setadminData(res?.data);
      localStorage.setItem(
        "token",
        JSON.stringify(res?.data.token)
      );
      props?.history.replace("/Dashboard");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });



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
                    <p>Please Enter New Password</p>
                  </div>
                  <form className="py-2">
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">New Password<span className="text-danger">*</span></label>
                      <div className="passwordWrapper position-relative">
                        <input type={showicon ? "password" : "text"}
                          className="siteInput passInput" placeholder="Enter New Password" value={password}
                          onChange={(e) => {
                            setpassword(e.target.value);
                          }} />
                        <button type="button" className="passDisplay">
                          <i onClick={() => setshowicon(!showicon)}
                            className={
                              showicon
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"
                            } aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">Confirm Password<span className="text-danger">*</span></label>
                      <div className="passwordWrapper position-relative">
                        <input type={showicon2 ? "password" : "text"}
                          className="siteInput passInput" placeholder="Enter Confirm Password" value={confirm_password}
                          onChange={(e) => {
                            setconfirm_password(e.target.value);
                          }}
                        />
                        <button type="button" className="passDisplay">
                          <i onClick={() => setshowicon2(!showicon2)}
                            className={
                              showicon2
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"
                            } aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="form-field text-center mt-4">
                      <button onClick={() =>
                        password?.length > 0 && confirm_password?.length > 0
                          ? mutate({
                            password, confirm_password, code: props?.location?.state?.code, email: props?.location?.state?.email,
                          })
                          : Toasty(
                            "error",
                            `Please fill out all the required fields!`
                          )
                      } type="button" className="siteBtn mx-auto" data-bs-toggle="modal" data-bs-target=".lpassword_sufl">Continue</button>
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

export default ResetPassword;
