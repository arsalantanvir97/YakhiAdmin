import React, { useState, useRef } from "react";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import { Link } from "react-router-dom";

import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getGeoGeneticsCategories } from "./Api/Categories";
import { createProduct } from "./Api/Products";
import SwalAlert from "../components/SwalAlert";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";

const AddGeoGenetics = (props) => {
  const usequeryClient = new useQueryClient();
  const adminData = useRecoilValue(adminInfo);

  const [productimage, setproductimage] = useState([]);
  // const [geoGeneticscategory, setgeoGeneticscategory] = useState([]);

  const [name, setname] = useState("");
  const [type, settype] = useState("");

  const [description, setdescription] = useState("");
  const [price, setprice] = useState(0);
  const [countInStock, setcountInStock] = useState(0);
  const [visible, setvisible] = useState(true);
  const [data, setData] = useState({
    project_images: []
  });

  const editorRef = useRef(null);

  const { isLoading: catloading, data: geoGeneticscategory } = useQuery(["geogenticscategory"], () =>
  getGeoGeneticsCategories()
  );
  const { mutate, isLoading ,status} = useMutation((data) => createProduct(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success','SUCCESS','Product Created Successfully');
      usequeryClient.invalidateQueries(['products',])
      usequeryClient.invalidateQueries(['geogeneticsproducts'])

      props?.history.push("/GeoGenetics");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const addProductHandler = async () => {
    const { project_images } = data;
    console.log("addProductHandler", productimage);
      const formData = new FormData();
      formData.append("id", adminData?._id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("countInStock", countInStock);
      formData.append("category", geoGeneticscategory?._id);
      formData.append("type", type);

      formData.append("visible", visible);
      formData.append("description", description);
      project_images.forEach((reciept) => formData.append("reciepts", reciept));

      const body = formData;
      mutate(body)
     

   
     
  };
  const editorHandler = (value) => {
    console.log("value", value, typeof value, value?.length);
    setdescription(value);
  };
  return (
    <div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="page-view-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title mb-3">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Add Geo'Genetics Product</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            {!isLoading ? (
                              <Link
                                onClick={() =>
                                  data?.project_images?.length > 0 &&
                                  name?.length > 0 &&
                                  type?.length > 0 &&
                                  price > 0 &&
                                  description?.length > 0
                                    ? addProductHandler()
                                    : Toasty(
                                        "error",
                                        `Please fill out all the required fields!`
                                      )
                                }
                                to="#"
                                className="btn btn-primary"
                              >
                                Publish
                              </Link>
                            ) : (
                              <i className="fas fa-spinner fa-pulse"></i>
                            )}
                          </div>
                        </div>
                      </div>
                      <ImageSelectDropzone
                        max={5}
                        setproductimage={setproductimage}
                        files={data?.project_images}
                        setFiles={(project_images) =>
                          setData({ ...data, project_images })
                        }
                        accept="image/*"
                      />{" "}
                      <p className="primary-text pt-2 pl-2">
                        Please note that you can upload up to 5 images only
                      </p>
                      <div className="product-form">
                        <div className="user-block">
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-2">
                                <label>Product Title</label>
                                <input
                                  type="text"
                                  className="form-control"
                                  placeholder="Enter Product Name"
                                  value={name}
                                  onChange={(e) => {
                                    setname(e.target.value);
                                  }}
                                />
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
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-2">
                                <label>Base Price</label>
                                <div className="position-relative">
                                  <InputNumber
                                    value={price}
                                    onChange={setprice}
                                    max={9}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="form-group mb-2">
                                <label>Count Instock</label>
                                <div className="position-relative">
                                  <InputNumber
                                    value={countInStock}
                                    onChange={setcountInStock}
                                    max={9}
                                    className="form-control"
                                  />
                                </div>
                              </div>
                              <div className="col-12 ">
                                <div className="form-group mb-2">
                                  <label>Type</label>
                                  <select
                                    id
                                    className="form-control"
                                    value={type}
                                    onChange={(e) => {
                                      settype(e.target.value);
                                    }}
                                  >
                                    <option>select</option>
                                    <option value={"PACKAGES"}>PACKAGES</option>
                                    <option value={"PROTOCOLS"}>
                                      PROTOCOLS
                                    </option>
                                  </select>
                                </div>
                              </div>

                              {/* <div className="form-group mb-2">
                                <label>Description</label>
                                <div className="position-relative">
                                  <textarea
                                    className="form-control"
                                    Please
                                    fill
                                    placeholder="Confirm New Password"
                                    value={description}
                                    onChange={(e) => {
                                      setdescription(e.target.value);
                                    }}
                                  />
                                </div>
                              </div> */}
                            </div>
                            <div className="col-12 mt-2">
                              <Editor
                                onInit={(evt, editor) =>
                                  (editorRef.current = editor)
                                }
                                init={{
                                  height: 500,
                                  menubar: true,
                                  plugins: [
                                    "advlist autolink lists link image charmap print preview anchor",
                                    "searchreplace visualblocks code fullscreen",
                                    "insertdatetime media table paste code help wordcount"
                                  ],
                                  toolbar:
                                    "undo redo | formatselect | " +
                                    "fontsizeselect | bold italic backcolor | alignleft aligncenter " +
                                    "alignright alignjustify | bullist numlist outdent indent | " +
                                    "removeformat | help",
                                  content_style:
                                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                                }}
                                value={description}
                                onEditorChange={(value) => editorHandler(value)}
                              />
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

export default AddGeoGenetics;
