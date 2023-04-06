import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import { useRecoilState } from "recoil";
import { adminInfo } from "../Recoil";
import { useMutation } from "react-query";
import { editAdminProfile } from "./Api/Auth";

const EditProfile = ({ history }) => {
  const [loading, setloading] = useState(false);

  const [firstName, setfirstName] = useState();
  const [lastName, setlastName] = useState();
  const [email, setemail] = useState();

  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(false);
  const [adminData, setadminData] = useRecoilState(adminInfo);


  useEffect(() => {
    if (adminData) {
      setfirstName(adminData?.firstName);
      setlastName(adminData?.lastName);
      setimage(adminData?.userImage);
      setemail(adminData?.email);
    }
  }, [adminData]);

  const { mutate, isLoading, status } = useMutation((data) => editAdminProfile(data), {
    retry: false,
    onSuccess: (res) => {
      setadminData(res?.data);

      // localStorage.setItem("TokenAdminTodaysPainter", res.data.token);
    },
    onError: (err) => Error(err?.response?.data?.message),
  });


  const updateProfileData = async () => {

    const formData = new FormData();
    formData.append("user_image", image);
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("email", email);

    const body = formData;
    mutate(body)

    setIsEdit(false);

  };
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
                    }} />   {is_edit ? "Edit profile" : "My Profile"}</h3>
                  </div>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-md-4">
                  <form className="myprofile_main">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-5 text-center">
                          <div className="attached">
                            <ImageSelector
                              setImage={setimage}
                              image={image}
                              is_edit={is_edit}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">Full Name<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          {is_edit ? (
                            <input type="text" className="siteInput" value={firstName}
                              onChange={(e) => {
                                setfirstName(e.target.value);
                              }}
                            />
                          ) : (
                            <p>{firstName}</p>
                          )}
                        </div>
                      </div>
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">Last Name<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          {is_edit ? (
                            <input type="text" className="siteInput" value={lastName}
                              onChange={(e) => {
                                setlastName(e.target.value);
                              }}
                            />
                          ) : (
                            <p>{lastName}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="felid">
                          <label className="siteLabel ps-4 mb-2">Email Address</label>

                          <p className="h_16 ps-4 mb-2">{email}</p>
                        </div>
                      </div>
                    </div>
                    <div className="button text-center mt-5">
                      {!loading ? (
                        <Link

                          to="#"
                          onClick={() => {
                            if (!is_edit) {
                              setIsEdit(true);
                            } else {
                              updateProfileData();
                            }
                          }}
                          className="btn_darkbluep"                                >
                          Update
                        </Link>
                      ) : (
                        <i className="fas fa-spinner fa-pulse"></i>
                      )}
                      {!is_edit && (

                        <Link to="/UpdatePassword" className="btn_orangebor ms-2">Change Password</Link>
                      )}

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

export default EditProfile;
