import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Toasty from "../utils/toast";
import { useMutation } from "react-query";

import { useRecoilState } from "recoil";
import { login } from "./Api/Auth";
import { adminInfo } from "../Recoil";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../Validation.js/Schema";

export default function Login({ history }) {
  const [showicon, setshowicon] = useState(true);
  const [adminData, setadminData] = useRecoilState(adminInfo);

  const { mutate, isLoading, status } = useMutation((data) => login(data), {
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
  const {
    register,
    control,

    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
    reset
  } = useForm({
    mode: 'onChange',

    resolver: yupResolver(loginSchema),
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
                    <h2>login</h2>
                    <p>Login To Your Account</p>
                  </div>
                  <form className="py-2" onSubmit={handleSubmit((data) => mutate({ email: data?.email, password: data?.password }))
                  }>
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">Email Address<span className="text-danger recoleta">*</span></label>
                      <div className="position-relative">
                        <input type="email" className="siteInput" placeholder="Enter Your Email Address"    {...register("email",
                        )} />
                      </div>
                    </div>
                    <div className="form-field">
                      <label htmlFor className="siteLabel ps-4 mb-2">Password<span className="text-danger recoleta">*</span></label>
                      <div className="passwordWrapper position-relative">
                        <input className="siteInput passInput" placeholder="Enter Password" name id type={showicon ? "password" : "text"}

                          {...register("password", {
                          })} />
                        <button type="button" className="passDisplay">
                          {errors.password && <p className="errorMsg">{errors.password.message}</p>}

                          <i onClick={() => setshowicon(!showicon)}
                            className={
                              showicon
                                ? "fas fa-eye-slash"
                                : "fas fa-eye"
                            }
                            aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                    <div className="d-lg-flex d-block justify-content-between">
                      {/* <div className="d-flex align-items-center">
                        <input type="checkbox" id="rme" name="rme" />
                        <label htmlFor="rme" className="ps-4 text-black">Remember Me</label>
                      </div> */}
                      <div className="text-end">
                        <Link to='/forgotpassword' className="forgotLink">Forgot Password?</Link>
                      </div>
                    </div>
                    <div className="form-field text-center mt-4">
                      {isSubmitting ? <i className="fas fa-spinner fa-pulse"></i> :
                        <button type="submit" disabled={isSubmitting} className="siteBtn mx-auto">Login</button>}
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
}
