import React, { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import { adminverfyadnresetpasword } from "../actions/adminActions";
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
            {/* Basic form layout section start */}
            <section id="configuration" className="update-password">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12">
                            <h1>
                              <Link to="/EditProfile" href="edit-profile.php">
                                <i className="fa fa-angle-left" />
                              </Link>
                              Change Password
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row justify-content-center">
                          <div className="col-12 col-lg-10 col-md-8 col-xl-5 light-primary-bg text-left">
                            <div className="row detail-row p-3 mb-0">
                              <div className="col-12 form-group mb-2">
                                <label>
                                  Existing Password{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="position-relative">
                                  <input
                                    type={showicon ? "password" : "text"}
                                    value={existingpassword}
                                    onChange={(e) => {
                                      setexistingpassword(e.target.value);
                                    }}
                                    className="form-control enter-input"
                                    placeholder="Enter Current Password"
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
                              <div className="col-12 form-group mb-2">
                                <label>
                                  New Password{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="position-relative">
                                  <input
                                    type={showicon2 ? "password" : "text"}
                                    className="form-control enter-input"
                                    value={newpassword}
                                    onChange={(e) => {
                                      setnewpassword(e.target.value);
                                    }}
                                    placeholder="Enter Current Password"
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
                              <div className="col-12 form-group mb-2">
                                <label>
                                  Confirm Password{" "}
                                  <span className="text-danger">*</span>
                                </label>
                                <div className="position-relative">
                                  <input
                                    type={showicon3 ? "password" : "text"}
                                    className="form-control enter-input"
                                    placeholder="Enter Current Password"
                                    value={confirm_password}
                                    onChange={(e) => {
                                      setconfirm_password(e.target.value);
                                    }}
                                  />

                                  <i
                                    onClick={() => setshowicon3(!showicon3)}
                                    className={
                                      showicon3
                                        ? "fa enter-icon-3 right-icon fa-eye-slash right-icon-90"
                                        : "fa enter-icon-3 right-icon fa-eye right-icon-90"
                                    }
                                    aria-hidden="true"
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="col-12 text-center">
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
                                }
                                className="btn btn-primary"
                              >
                                Update
                              </Link>
                            </div>
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

export default UpdatePassword;
