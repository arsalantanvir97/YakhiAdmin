import React, { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link } from "react-router-dom";
import ImageSelector from "../components/ImageSelector";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import { EditingCategory, getCategoryDetails } from "./Api/Categories";

const EditCategory = ({ match, history }) => {
  const usequeryClient = new useQueryClient();

  const [categorytitle, setcategorytitle] = useState();
  const [description, setdescription] = useState();
  const [visible, setvisible] = useState();
  const [status, setStatus] = useState("");

  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(false);



  const { isLoading, data: catData } = useQuery(
    {
      queryKey: ["category", match.params.id],
      queryFn: () =>
        getCategoryDetails(match.params.id),

    }
  );

  useEffect(() => {
    setcategorytitle(catData?.data?.category?.categorytitle);
    setdescription(catData?.data?.category?.description);
    setvisible(catData?.data?.category?.visible);
    setStatus(catData?.data?.category?.status);

    setimage(catData?.data?.category?.categoryimage);
  }, [catData])

  const { mutate, isLoading: editCatloading } = useMutation((data) => EditingCategory(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Category Edited Successfully');

      usequeryClient.invalidateQueries(['categories'])
      usequeryClient.invalidateQueries(['categorylogs'])
      usequeryClient.invalidateQueries(['category', match.params.id])
      history.push("/Categories");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });

  const updateCategoryData = async () => {
    console.log("updateCategoryData", image);

    const formData = new FormData();
    formData.append("categorytitle", categorytitle);
    formData.append("description", description);
    formData.append("visible", visible);
    formData.append("status", status);

    formData.append("user_image", image);
    formData.append("id", match?.params?.id);

    const body = formData;
    mutate(body)
  };
  return (
    <div>
      {isLoading ? <Loader /> :
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
                              {!editCatloading ? (
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
                                </Link>
                              ) : (
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
                              {is_edit ? (
                                <select
                                  id
                                  className="form-control"
                                  value={visible}
                                  onChange={(e) => {
                                    setvisible(e.target.value);
                                  }}
                                >
                                  <option >Select Visible In Menu</option>
                                  <option value={true} >
                                    Yes
                                  </option>
                                  <option value={false}>No</option>
                                </select>
                              ) : (
                                <p>{visible ? "Yes" : "No"} </p>
                              )}{" "}
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
        </div>}
    </div>
  );
};

export default EditCategory;
