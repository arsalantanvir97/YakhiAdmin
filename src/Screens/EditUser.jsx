import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import ImageSelector from "../components/ImageSelector";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";
import { validateEmail } from "../utils/ValidateEmail";

const EditUser = ({ match, history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [userdetails, setuserdetails] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [image, setimage] = useState("");
  const [loading, setloading] = useState(false);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/user/user-details/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setuserdetails(res?.data?.user);
      setfirstName(res?.data?.user?.firstName);
      setlastName(res?.data?.user?.lastName);
      setemail(res?.data?.user?.email);
      setimage(res?.data?.user?.userImage);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfileData = async () => {
    const emailvalidation = validateEmail(email);
    console.log("emmmm", emailvalidation);
    console.log("addEmployeeHandler");
    console.log(
      "firstName?.length",
      firstName?.length,
      lastName?.length,
      email?.length
    );
    if (emailvalidation == true) {
      if (firstName?.length > 0 && lastName?.length > 0 && email?.length > 0) {
        setloading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        };
        const formData = new FormData();
        formData.append("user_image", image);
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("email", email);

        const body = formData;
        const res = await axios.post(
          `${baseURL}/user/editProfile`,
          body,
          config
        );
        console.log("res", res);
        if (res?.status == 201) {
          console.log("blockkk");
          Swal.fire({
            icon: "success",
            title: "",
            text: "User Updated Successfully",
            showConfirmButton: false,
            timer: 1500
          });
          console.log("blockkk2");

          history.push("/Users");
          console.log("blockkk3");
        }
      } else {
        setloading(false);

        Toasty("error", `Please fill out all the required fields`);
      }
    } else {
      setloading(false);

      Toasty("error", `Please enter a valid email`);
    }
  };

  return (
    <div>
      <div className="app-content content dashboard">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
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
                            {!loading ? (
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
      </div>
    </div>
  );
};

export default EditUser;
