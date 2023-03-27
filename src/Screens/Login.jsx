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
      <section className="login-wrap">
        <div className="container m-auto">
          <div className="login-inner">
            <div className="row">
              <div className="col-lg-12 col-12 ">
                <div className="right">
                  <div className="logo text-center">
                    <img src="images/login-logo.png" alt="" />
                  </div>
                  <h1 className>Login</h1>
                  <form onSubmit={handleSubmit((data) => mutate({ email: data?.email, password: data?.password }))
                  }>
                    <div className="row">
                      <div className="col-12 form-group position-relative">
                        <label htmlFor>
                          Email Address<span className="text-danger">*</span>
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter Email Address"
                          {...register("email",
                          )}
                        />
                        {errors.email && <p className="errorMsg">{errors.email.message}</p>}

                      </div>
                      <div className="col-12 form-group mb-1">
                        <label htmlFor>
                          Password <span className="text-danger">*</span>{" "}
                        </label>
                        <div className="position-relative">
                          <input
                            type={showicon ? "password" : "text"}
                            className="form-control enter-input"
                            {...register("password", {
                            })}
                            placeholder="Enter Password"
                          />{" "}
                          {errors.password && <p className="errorMsg">{errors.password.message}</p>}

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
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="remember-pass">
                        {/* <div className="login-check">
                          Remember Me
                          <input type="checkbox" />
                          <span className="checkmark" />
                        </div> */}
                      </div>
                      <div className="d-flex justify-content-end">
                        <div className="forgot">
                          {" "}
                          <Link to='/forgotpassword'
                            className=" primary-text"
                          >
                            Forgot Password?
                          </Link>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="d-block col-12 text-center mt-4">
                        {/* {!loading ? (
                        <button
                          type="button"
                          onClick={() => {
                            password?.length > 0 && email?.length > 0
                              ? submitHandler()
                              : Toasty(
                                  "error",
                                  `Please fill out all the required fields!`
                                );
                          }}
                          className="btn btn-primary btn-login"
                        >
                          Login
                        </button> ) : (
                              <i className="fas fa-spinner fa-pulse"></i>
                            )} */}

                        {isSubmitting ? <i className="fas fa-spinner fa-pulse"></i> : <button
                          disabled={isSubmitting}
                          type="submit"
                          // onClick={() => mutate({ email, password })}
                          className="btn btn-primary btn-login"
                        >
                          Login
                        </button>}
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
}
