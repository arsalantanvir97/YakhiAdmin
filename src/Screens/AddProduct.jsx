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
  const [inputfields, setInputfields] = useState([]);
  const [price, setprice] = useState(0);
  const [countInStock, setcountInStock] = useState(0);

  const [status, setstatus] = useState("");
  const [quantityrange, setquantityrange] = useState([]);
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
  const handleclickfields = () => {
    setInputfields([
      ...inputfields,
      { rangestartingquantity: 0, rangestartingprice: 0 }
    ]);
  };
  const handlechangeinput = (index, event) => {
    const values = [...inputfields];
    values[index][event.target.name] = Number(event.target.value);
    setInputfields(values);
    setquantityrange(values);
  };
  const inputfieldsremove = (index) => {
    const values = [...inputfields];
    values.splice(index, 1);
    setInputfields(values);
    setquantityrange(values);
  };
  useEffect(() => {
    console.log("quantityrange", quantityrange);
  }, [quantityrange]);
  function formatInput(e) {
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      const filter = props.enable_dot
        ? e.key === "e" || e.key === "+" || e.key === "-"
        : e.key === "e" || e.key === "." || e.key === "+" || e.key === "-";
      checkIfNum = filter;
    } else if (e.keyCode !== undefined) {
      // Check if it's a "e" (69), "." (190), "+" (187) or "-" (189)
      checkIfNum =
        e.keyCode === 69 ||
        e.keyCode === 190 ||
        e.keyCode === 187 ||
        e.keyCode === 189;
    }
    return checkIfNum && e.preventDefault();
  }

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

      formData.append("status", status);
      formData.append("description", description);
      formData.append("quantityrange", JSON.stringify(quantityrange));
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
                      {/* <div className="product-gallery">
                    <div className="row">
                      <div className="col-12 col-lg-6">
                        <div className="product-preview text-center position-relative">
                          <img src="images/product-preview.png" alt="" />
                          <div className="d-inline-block align-bottom actions-buttons">
                            <input type="file" id="upload" name="file" />
                            <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                              <i className="fa fa-trash-alt" aria-hidden="true" />
                            </button>
                            <button type="button" className="btn upload">
                              <label htmlFor="upload" className="d-block mb-0">
                                <i className="fa fa-upload" />
                              </label>
                            </button>
                          </div>
                        </div>
                        <p className="primary-text pt-2 pl-2">Please note that you can upload up to 5 images only</p>
                      </div>
                      <div className="col-12 col-lg-6 product-thumb-wrap">
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            <div className="preview-thumbs text-center">
                              <img src="images/product-thumb-1.png" alt="" />
                              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_one" className="trigger" />
                              <div id="hidden_fields_one" className="align-bottom actions-buttons" style={{display: 'none'}}>
                                <input type="file" id="upload" name="file" />
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                                <button type="button" className="btn upload">
                                  <label htmlFor="upload" className="d-block mb-0">
                                    <i className="fa fa-upload" />
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="preview-thumbs text-center">
                              <img src="images/product-thumb-1.png" alt="" />
                              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_two" className="trigger" />
                              <div id="hidden_fields_two" className="align-bottom actions-buttons" style={{display: 'none'}}>
                                <input type="file" id="upload" name="file" />
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                                <button type="button" className="btn upload">
                                  <label htmlFor="upload" className="d-block mb-0">
                                    <i className="fa fa-upload" />
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-0">
                          <div className="col-12 col-lg-6">
                            <div className="preview-thumbs text-center">
                              <img src="images/product-thumb-1.png" alt="" />
                              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_three" className="trigger" />
                              <div id="hidden_fields_three" className="align-bottom actions-buttons" style={{display: 'none'}}>
                                <input type="file" id="upload" name="file" />
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                                <button type="button" className="btn upload">
                                  <label htmlFor="upload" className="d-block mb-0">
                                    <i className="fa fa-upload" />
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-lg-6">
                            <div className="preview-thumbs text-center">
                              <img src="images/product-thumb-4.png" alt="" />
                              <input type="checkbox" id="checkbox_one" name="question1" data-trigger="hidden_fields_four" className="trigger" />
                              <div id="hidden_fields_four" className="align-bottom actions-buttons" style={{display: 'none'}}>
                                <input type="file" id="upload" name="file" />
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                                <button type="button" className="btn upload">
                                  <label htmlFor="upload" className="d-block mb-0">
                                    <i className="fa fa-upload" />
                                  </label>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
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
                              <div className="form-group mb-2">
                                <label>Status</label>
                                <select
                                  id
                                  className="form-control"
                                  value={status}
                                  onChange={(e) => {
                                    setstatus(e.target.value);
                                  }}
                                >
                                  {" "}
                                  <option value="">Select</option>
                                  <option value={true}>Active</option>
                                  <option value={false}>Inctive</option>
                                </select>
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
                          <label>Price Quantity Range</label>
                          <i
                            onClick={handleclickfields}
                            className="fas fa-plus plus-btn"
                          />
                          {/* <div className="row">
                            <div className="col-12 col-md-6 form-group mb-2 price-quality-range">
                              <label>Price Quantity Range</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Add"
                              />
                              <i className="fas fa-plus plus-btn add-range" />
                            </div>
                          </div> */}
                          {inputfields.map((inputfield, index) => (
                            <div className="row">
                              <div className="col-12 col-md-6 form-group mb-2">
                                <div className="range-a col-12 form-group mb-2">
                                  <div className="d-flex justify-content-between align-items-center mt-4">
                                    <h4>Range {index + 1}</h4>
                                    <div
                                      onClick={() => inputfieldsremove(index)}
                                      className="delete-range d-flex justify-content-center align-items-center"
                                    >
                                      <i className="fas fa-trash-alt" />
                                    </div>
                                  </div>
                                  <div className="mt-2">
                                    <label>Range Starting Quantity</label>
                                    <select
                                      id
                                      className="form-control"
                                      name="rangestartingquantity"
                                      value={inputfield.rangestartingquantity}
                                      onChange={(event) =>
                                        handlechangeinput(index, event)
                                      }
                                    >
                                      <option value={10}>10</option>
                                      <option value={20}>20</option>
                                      <option value={30}>30</option>
                                    </select>
                                  </div>
                                  <div className="mt-2">
                                    <label>Price</label>
                                    <input
                                      type="number"
                                      onKeyDown={formatInput}
                                      name="rangestartingprice"
                                      value={inputfield.rangestartingprice}
                                      onChange={(event) =>
                                        handlechangeinput(index, event)
                                      }
                                      min={0}
                                      className="form-control"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
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
