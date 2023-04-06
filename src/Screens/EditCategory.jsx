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
        <div className="app-content content dashboard">
          <div className="content-wrapper">
            <div className="content-body">
              <section className="myprofile " id="configuration">
                <div className="box py-5">
                  <div className="row justify-content-center">
                    <div className="col-md-12">
                      <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                        <h3 className="pageTitle"><i onClick={() => {
                          history.goBack()
                        }} className="fas fa-arrow-left me-3 topMArrow" />Category {is_edit ? "Edit" : "Details"} </h3>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">Category Name<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          {is_edit ? (
                            <input
                              type="text"
                              className="siteInput"
                              value={categorytitle}
                              onChange={(e) => {
                                setcategorytitle(e.target.value);
                              }}
                            />
                          ) : (
                            <p>{categorytitle}</p>
                          )}                </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4">
                      <div className="form-field">
                        <label htmlFor className="siteLabel ps-4 mb-2">Status<span className="text-danger">*</span></label>
                        <div className="position-relative">
                          {is_edit ? (

                            <select value={visible}
                            className="mainInput filterInput"

                              onChange={(e) => {
                                setvisible(e.target.value);
                                
                              }}
                            >
                              <option >Select Visible In Menu</option>
                              <option value={true} >
                                Yes
                              </option>
                              <option value={false}>No</option>
                            </select>) : (
                            <p>{visible ? "Yes" : "No"} </p>
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="col-md-12">
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
                          className="btn_darkbluep"
                        >
                          {is_edit ? "Update" : "Edit"}
                        </Link>
                      ) : (
                        <i className="fas fa-spinner fa-pulse"></i>
                      )}
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>

      }
    </div>
  );
};

export default EditCategory;
