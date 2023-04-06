import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminInfo } from "../Recoil";
import Toasty from "../utils/toast";
import { validateEmail } from "../utils/ValidateEmail";
import { verfyadnresetpasword } from "./Api/Auth";

const UpdatePassword = ({ history }) => {
  const [existingpassword, setexistingpassword] = useState("");
  const [newpassword, setnewpassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [showicon, setshowicon] = useState(true);
  const [showicon2, setshowicon2] = useState(true);
  const [showicon3, setshowicon3] = useState(true);

  const [adminData, setadminData] = useRecoilState(adminInfo);

  const { mutate, isLoading, status } = useMutation((data) => verfyadnresetpasword(data), {
    retry: false,
    onSuccess: (res) => {
      console.log('ressssss', res)
      setadminData(res?.data);
      localStorage.setItem(
        "token",
        JSON.stringify(res?.data.token)
      );
      history.replace("/Dashboard");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });



  return (
    <div>
      <div className="app-content content dashboard">
        <div className="content-wrapper">
          <div className="content-body">
            <section className="myprofile box py-5" id="configuration">
              <div className="row justify-content-center">
                <div className="col-md-12">
                  <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                    <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                      history.goBack()
                    }} /> Change Password</h3>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <form className="myprofile_main">
                    <div className="row justify-content-center">
                      <div className="col-md-12 mr-5">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Current  Password<span className="text-danger">*</span></label>
                          <div className="passwordWrapper position-relative">
                            <input    type={showicon ? "password" : "text"}
                                    value={existingpassword}
                                    onChange={(e) => {
                                      setexistingpassword(e.target.value);
                                    }} className="siteInput passInput" placeholder="Enter Current  Password" name id />
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
                          <label htmlFor className="siteLabel ps-4 mb-2">New Password<span className="text-danger">*</span></label>
                          <div className="passwordWrapper position-relative">
                            <input                                     type={showicon2 ? "password" : "text"}
 value={newpassword}
                                    onChange={(e) => {
                                      setnewpassword(e.target.value);
                                    }} className="siteInput passInput" placeholder="Enter New Password" name id />
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
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Confirm Password<span className="text-danger">*</span></label>
                          <div className="passwordWrapper position-relative">
                            <input                                     type={showicon3 ? "password" : "text"}

value={confirm_password}
                                   onChange={(e) => {
                                     setconfirm_password(e.target.value);
                                   }} className="siteInput passInput" placeholder="Confirm Password" name id />
                            <button type="button" className="passDisplay">
                              <i onClick={() => setshowicon3(!showicon3)}
                            className={
                              showicon3
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"
                            } aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="button text-center mt-5">
                        <Link
                                to="#"
                                onClick={() =>
                                  existingpassword?.length > 0 &&
                                    newpassword?.length > 0 &&
                                    confirm_password?.length > 0
                                    ? mutate({
                                      existingpassword,
                                      newpassword,
                                      confirm_password,
                                      email: adminData?.email,
                                    })
                                    : Toasty(
                                      "error",
                                      `Please fill out all the required fields!`
                                    )
                                } className="btn_darkbluep pl-5 pr-5" data-bs-toggle="modal" data-bs-target=".profileUpdate_sufl">Update</Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UpdatePassword;
