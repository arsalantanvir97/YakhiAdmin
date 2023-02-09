import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ImageSelector from "../components/ImageSelector";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
import { validateEmail } from "../utils/ValidateEmail";
import { editUser, getUserDetails } from "./Api/Users";

const EditUser = ({ match, history }) => {
  const [userdetails, setuserdetails] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState("");

  const { isLoading, data } = useQuery(
    {
      queryKey: ["user", match.params.id],
      queryFn: () =>
        getUserDetails(match.params.id),
      // onSuccess: (data) => {
      //   console.log('dataa', data)
      //   setuserdetails(data);
      //   setfirstName(data?.firstName);
      //   setlastName(data?.lastName);
      //   setemail(data?.email);
      //   setimage(data?.userImage);
      // }
    }
  );
  useEffect(() => {
    setuserdetails(data);
    setfirstName(data?.firstname);
    setlastName(data?.lastname);
    setemail(data?.email);
    setimage(data?.userImage);
  }, [data])
  const { mutate, isLoading: editUserloading, status } = useMutation((data) => editUser(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'User Edited Successfully');
      history.push("/Users");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  const updateProfileData = async () => {
    const emailvalidation = validateEmail(email);
    if (emailvalidation == true) {
      if (firstName?.length > 0 && lastName?.length > 0 && email?.length > 0) {
        const formData = new FormData();
        formData.append("user_image", image);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);
        const body = formData;
        mutate(body)
      } else {

        Toasty("error", `Please fill out all the required fields`);
      }
    } else {

      Toasty("error", `Please enter a valid email`);
    }
  };

  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              <section id="configuration" className="edit-profile">
                <div className="row">
                  <div className="col-12">
                    <div className="card rounded pad-20">
                      <div className="card-body p-md-2 p-lg-3 p-xl-4">
                        <div className="page-title">
                          <div className="row">
                            <div className="col-12">

                              <h1>
                                <Link
                                  to="#"
                                  onClick={() => {
                                    history.goBack();
                                  }}
                                >
                                  <i className="fa fa-angle-left" />
                                </Link>
                                User Details
                              </h1>

                            </div>
                          </div>
                        </div>
                        <div className="user-block">
                          <div className="row">
                            <div className="col-12 col-sm-3 mb-sm-2">
                              {/* <div className="profile-img text-center">
                              <div className="attached">
                                <img
                                  src="images/avatar.png"
                                  className="img-fluid ml-0"
                                  alt=""
                                />
                                <button
                                  name="file"
                                  className="camera-btn"
                                  onclick="document.getElementById('upload').click()"
                                >
                                  <i className="fa fa-camera" />
                                </button>
                                <input type="file" id="upload" name="file" />
                              </div>
                            </div> */}
                              <ImageSelector
                                setImage={setimage}
                                image={image}
                                is_edit={true}
                              />
                            </div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 col-md-6  col-lg-6 col-xl-4 form-group">
                              <label>
                                First Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={firstName}
                                onChange={(e) => {
                                  setfirstName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 col-md-6  col-lg-6 col-xl-4 form-group">
                              <label>
                                Last Name <span className="text-danger">*</span>
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                value={lastName}
                                onChange={(e) => {
                                  setlastName(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row detail-row">
                            <div className="col-12 col-md-6  col-lg-6 col-xl-4 form-group">
                              <label>Email</label>
                              <input
                                type="email"
                                className="form-control border-0"
                                value={email}
                                onChange={(e) => {
                                  setemail(e.target.value);
                                }}
                              />
                            </div>
                          </div>
                          <div className="row detail-row mt-1">
                            <div className="col-12 col-md-6 col-xl-5">
                              {!editUserloading ? (
                                <Link
                                  to="#"
                                  onClick={() => {
                                    updateProfileData();
                                  }}
                                  className="btn btn-primary btn-fixed-190"
                                >
                                  Update
                                </Link>
                              ) : (
                                <i className="fas fa-spinner fa-pulse"></i>
                              )}
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
        </div>}
    </div>
  );
};


export default EditUser;
