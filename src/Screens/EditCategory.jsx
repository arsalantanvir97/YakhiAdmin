import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/api";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";

const EditCategory = ({ match, history }) => {
  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const [categorytitle, setcategorytitle] = useState();
  const [description, setdescription] = useState();
  const [visible, setvisible] = useState();
  const [status, setStatus] = useState("");

  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(false);

  useEffect(() => {
    handleGetUser();
  }, []);

  const handleGetUser = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/category/getCategoryDetails/${match?.params?.id}`,
        method: "GET",

        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setcategorytitle(res?.data?.category?.categorytitle);
      setdescription(res?.data?.category?.description);
      setvisible(res?.data?.category?.visible);
      setStatus(res?.data?.category?.status);

      setimage(res?.data?.category?.categoryimage);
    } catch (err) {
      console.log(err);
    }
  };
  const updateCategoryData = async () => {
    setloading(true)
    console.log("updateCategoryData", image);

    const formData = new FormData();
    formData.append("categorytitle", categorytitle);
    formData.append("description", description);
    formData.append("visible", visible);
    formData.append("status", status);

    formData.append("user_image", image);
    formData.append("id", match?.params?.id);

    const body = formData;
    try {
      // dispatch({
      //   type: ADMIN_LOGIN_REQUEST,
      // })
      console.log("updatestylist");

      const res = await axios.post(`${baseURL}/category/editCategory`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      setloading(false)


      console.log("res", res);
      if (res?.status == 201) {
        Swal.fire({
          icon: "success",
          title: "",
          text: "Category Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        history.replace("/Categories");
      }
      // else if(res?.status==201){
      //   Toasty('error',`Invalid Email or Password`);
      //   dispatch({
      //     type: ADMIN_LOGIN_FAIL,
      //     payload:
      //     res?.data?.message
      //   })
      //   document.location.href = '/'

      // }
    } catch (error) {
      setloading(false)

      console.log("error", error);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };
  return (
    <div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="user-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>
                              <Link to="/Categories">
                                <i className="fa fa-angle-left" />
                              </Link>
                              Edit Category
                            </h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                          {!loading ? (
                            <Link
                              onClick={() => {
                                if (!is_edit) {
                                  setIsEdit(true);
                                } else {
                                  updateCategoryData();
                                }
                              }}
                              to="#"
                              className="btn btn-primary"
                            >
                              {is_edit ? "Update" : "Edit"}
                            </Link>) : (
                              <i className="fas fa-spinner fa-pulse"></i>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row detail-row">
                          <div className="col-12 col-md-6 col-xl-4">
                            <label>
                              Category Title{" "}
                              <span className="text-danger">*</span>
                            </label>
                            {is_edit ? (
                              <input
                                type="text"
                                className="form-control enter-input"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                placeholder="Enter Category Title"
                                value={categorytitle}
                                onChange={(e) => {
                                  setcategorytitle(e.target.value);
                                }}
                              />
                            ) : (
                              <p>{categorytitle} </p>
                            )}{" "}
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-lg-6 lablename">
                            <label>
                              Visible In Menu
                              <span className="text-danger">*</span>
                            </label>
                            <select
                              id
                              className="form-control"
                              value={visible}
                              onChange={(e) => {
                                setvisible(e.target.value);
                              }}
                            >
                              <option value>Select Visible In Menu</option>
                              <option value={true} selected>
                                Yes
                              </option>
                              <option value={false}>No</option>
                            </select>
                          </div>
                          
                        </div>
                        <div className="row detail-row mb-1">
                          <div className="col-12 col-md-5">
                            <h4 className="pl-15">Description and Images</h4>
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6 col-xl-4">
                            <label>
                              Description <span className="text-danger">*</span>
                            </label>
                            {is_edit ? (
                              <textarea
                                placeholder="Enter Description"
                                value={description}
                                onChange={(e) => {
                                  setdescription(e.target.value);
                                }}
                              />
                            ) : (
                              <p>{description}</p>
                            )}{" "}
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="main-over-box">
                            <ImageSelector
                              setImage={setimage}
                              image={image}
                              is_edit={is_edit}
                            />
                          </div>
                          {/* <div className="col-12 col-md-6 col-xl-6">
                            <label>Image</label>
                            <div className="upload-thumbs">
                              <div className="upload-thumb  d-inline-block position-relative mr-1">
                                <button
                                  type="button"
                                  className="btn download rotate-45"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  />
                                </button>
                                <label htmlFor="picture" className="d-block">
                                  <img
                                    src="images/jacket-product.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </label>
                              </div>
                              <div className="upload-thumb  d-inline-block position-relative mr-1">
                                <button
                                  type="button"
                                  className="btn download rotate-45"
                                  data-dismiss="modal"
                                  aria-label="Close"
                                >
                                  <i
                                    className="fa fa-plus"
                                    aria-hidden="true"
                                  />
                                </button>
                                <label htmlFor="picture" className="d-block">
                                  <img
                                    src="images/jacket-product.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </label>
                              </div>
                              <div className="d-inline-block align-bottom">
                                <label htmlFor="upload" className="d-block">
                                  <i className="fa fa-upload" />
                                </label>
                                <input type="file" id="upload" name="file" />
                              </div>
                            </div>
                          </div> */}
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

export default EditCategory;
