import React, { useState, useEffect } from "react";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import { Link } from "react-router-dom";

import axios from "axios";

import { baseURL } from "../utils/api";

import { useSelector } from "react-redux";

import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import Swal from "sweetalert2";

const AddProduct = (props) => {
  const [loading, setloading] = useState(false);

  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [productimage, setproductimage] = useState([]);
  const [allofcategory, setallofcategory] = useState([]);
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState(0);
  const [countInStock, setcountInStock] = useState(0);
  const [visble, setvisble] = useState(true);
  const [data, setData] = useState({
    project_images: []
  });
  useEffect(() => {
    gettingallCategoriesHandler();
  }, []);

  const gettingallCategoriesHandler = async () => {
    const res = await axios.get(`${baseURL}/category/allOfCategories`, {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`
      }
    });
    console.log("res", res);
    setallofcategory(res?.data?.getAllCategories);
  };

  const addProductHandler = async () => {
    const { project_images } = data;
    console.log("addProductHandler", productimage, category);
    setloading(true);
    try {
      const formData = new FormData();
      formData.append("id", adminInfo?._id);
      formData.append("category", category);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("countInStock", countInStock);

      formData.append("visble", visble);
      formData.append("description", description);
      project_images.forEach((reciept) => formData.append("reciepts", reciept));

      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/product/createProduct`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      setloading(false);

      console.log("res", res);
      if (res?.status == 201) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "Product Created Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("blockkk2");

        props?.history.push("/Products");
        console.log("blockkk3");
      }
    } catch (error) {
      setloading(false);

      console.log("error", error?.response?.data);
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
            <section id="configuration" className="page-view-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title mb-3">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Add Product</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            {!loading ? (
                              <Link
                                onClick={() =>
                                  data?.project_images?.length > 0 &&
                                  category?.length > 0 &&
                                  name?.length > 0 &&
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
                              <div className="form-group mb-2">
                                <label>Category</label>
                                <select
                                  id
                                  className="form-control"
                                  value={category}
                                  onChange={(e) => {
                                    setcategory(e.target.value);
                                  }}
                                >
                                  <option>select</option>
                                  {allofcategory?.length > 0 &&
                                    allofcategory?.map((allcat) => (
                                      <option value={allcat?._id}>
                                        {allcat?.categorytitle}
                                      </option>
                                    ))}
                                </select>
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
                                        value={visble}
                                        onClick={() => setvisble(true)}
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
                                        value={visble}
                                        onClick={() => setvisble(false)}
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
                              <div className="form-group mb-2">
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
                              </div>
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

export default AddProduct;
