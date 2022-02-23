import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import { baseURL } from "../utils/api";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import { useSelector } from "react-redux";

const AddCategory = ({ history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(true);
  const [categorytitle, setcategorytitle] = useState();
  const [description, setdescription] = useState();
  const [visible, setvisible] = useState(true);

  const createCategoryHandler = async () => {
    console.log("createCategoryHandler");
    try {
      const formData = new FormData();
      formData.append("user_image", image);
      formData.append("categorytitle", categorytitle);
      formData.append("description", description);
      formData.append("visible", visible);
      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/category/createCategory`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      });
      console.log("res", res);
      if (res?.status == 201) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "Category Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        console.log("blockkk2");

        history.push("/Categories");
        console.log("blockkk3");
      }
    } catch (error) {
      console.log("error", error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Internal Server Error",
        showConfirmButton: false,
        timer: 1500,
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
                              Add Category
                            </h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link
                              to="#"
                              onClick={() =>
                                categorytitle?.length > 0 &&
                                image?.name?.length > 0 &&
                                description?.length > 0
                                  ? createCategoryHandler()
                                  : Toasty(
                                      "error",
                                      `Please fill out all the required fields!`
                                    )
                              }
                              className="btn btn-primary"
                            >
                              Publish
                            </Link>
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
                            <input
                              type="text"
                              value={categorytitle}
                              onChange={(e) => {
                                setcategorytitle(e.target.value);
                              }}
                              className="form-control"
                              placeholder="Enter Category Title"
                            />
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 col-md-6 col-xl-4">
                            <label>
                              Visible In Menu
                              <span className="text-danger">*</span>
                            </label>
                            <div className="d-block">
                              <div className="form-check form-check-inline radio">
                                <input
                                  value={visible}
                                  onClick={() => setvisible(true)}
                                  id="radio-1"
                                  name="radio"
                                  type="radio"
                                  defaultChecked
                                />
                                <label
                                  htmlFor="radio-1"
                                  className="radio-label"
                                >
                                  Yes
                                </label>
                              </div>
                              <div className="radio form-check form-check-inline">
                                <input
                                  value={visible}
                                  onClick={() => setvisible(false)}
                                  id="radio-2"
                                  name="radio"
                                  type="radio"
                                />
                                <label
                                  htmlFor="radio-2"
                                  className="radio-label"
                                >
                                  No
                                </label>
                              </div>
                            </div>
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
                            <textarea
                              placeholder="Enter Description"
                              value={description}
                              onChange={(e) => {
                                setdescription(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="">
                          <ImageSelector
                            setImage={setimage}
                            image={image}
                            is_edit={is_edit}
                          />
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

export default AddCategory;
