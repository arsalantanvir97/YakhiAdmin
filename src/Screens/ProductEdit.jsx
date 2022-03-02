import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import InputNumber from "../components/InputNumber";
import ImageSlider from "../components/ImageSlider";
import { baseURL, imageURL } from "../utils/api";
import Swal from "sweetalert2";

const ProductEdit = ({ match, enable_dot, history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [loading, setloading] = useState(false);

  const [allofcategory, setallofcategory] = useState([]);
  const [productdetails, setproductdetails] = useState();
  const [is_edit, setIsEdit] = useState(false);
  const [productimage, setproductimage] = useState([]);
  const [countInStock, setcountInStock] = useState(0);

  const [name, setname] = useState("");

  const [description, setdescription] = useState("");

  const [category, setcategory] = useState("");

  const [inputfields, setInputfields] = useState([]);

  const [price, setprice] = useState(0);

  const [status, setstatus] = useState("");
  const [categoryy, setcategoryy] = useState("");

  const [quantityrange, setquantityrange] = useState([]);
  const [images, setimages] = useState([]);
  const [hover, sethover] = useState(false);

  const [data, setData] = useState({
    project_images: []
  });
  useEffect(() => {
    gettingallCategoriesHandler();
    handleGetCourse();
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

  const handleGetCourse = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/product/getProductDetails/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("resssssssss", res);
      setproductdetails(res?.data?.product);
      setproductimage(res?.data?.product?.productimage);
      setimages(res?.data?.product?.productimage);

      setname(res?.data?.product?.name);
      setdescription(res?.data?.product?.description);
      setprice(res?.data?.product?.price);
      setcountInStock(res?.data?.product?.countInStock);

      
      setstatus(res?.data?.product?.status);

      setquantityrange(res?.data?.product?.pricerange);
      res?.data?.product?.pricerange?.length > 0 &&
        res?.data?.product?.pricerange?.map((prod) =>
          setInputfields([
            ...inputfields,
            {
              rangestartingquantity: prod?.rangestartingquantity,
              rangestartingprice: prod?.rangestartingprice
            }
          ])
        );
      setcategory(res?.data?.product?.category);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    console.log(images, "images");
  }, [images]);

  const handleMouseEnter = () => {
    sethover(true);
  };
  const handleMouseLeave = () => {
    sethover(false);
  };
  const handleDeleteImage = (index) => {
    const temp_data = [...images];
    temp_data.splice(index, 1);
    console.log("tempdata", temp_data);
    setimages(temp_data);
  };
  function formatInput(e) {
    // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
    let checkIfNum;
    if (e.key !== undefined) {
      // Check if it's a "e", ".", "+" or "-"
      const filter = enable_dot
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
  const updateCourseData = async () => {
    const { project_images } = data;
    console.log("addProductHandler", productimage);
    setloading(true)
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      };
      const formData = new FormData();
      formData.append("id", match?.params?.id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("countInStock", countInStock);

      
      formData.append("status", status);
      formData.append("category", categoryy);
      formData.append("description", description);
      formData.append("quantityrange", JSON.stringify(quantityrange));
      formData.append("images", JSON.stringify(images));

      project_images.forEach((reciept) => formData.append("reciepts", reciept));

      const body = formData;
      console.log("await");
      const res = await axios.post(
        `${baseURL}/product/editProduct`,
        body,
        config
      );
      setloading(false)
      console.log("res", res);
      if (res?.status == 201) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "Product Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("blockkk2");

        history.push("/Products");
        console.log("blockkk3");
      }
    } catch (error) {
      setloading(false)

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
                            <h1>Product {is_edit ? "Edit" : "Details"}</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                          {!loading ? (
                            <Link
                              to="#"
                              onClick={() => {
                                if (!is_edit) {
                                  setIsEdit(true);
                                } else {
                                  updateCourseData();
                                }
                              }}
                              className="btn btn-primary"
                            >
                              {is_edit ? "Update" : "Edit"}
                            </Link>) : (
                              <i className="fas fa-spinner fa-pulse"></i>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="product-gallery">
                        <div className="row">
                          <div className="col-12 col-lg-6">
                            {!is_edit && (
                              <div className="row ">
                                <div className="form-group mb-2">
                                  <label style={{ paddingLeft: 0 }}>
                                    Images
                                  </label>
                                </div>
                                <div className="col-lg-10 col-12 mt-2">
                                  <div className="row">
                                    {productimage?.length > 0 &&
                                      productimage?.map((img) => (
                                        <div className="col-lg-3">
                                          <img
                                            src={
                                              img && img !== null
                                                ? `${imageURL}${img}`
                                                : "images/img-1.png"
                                            }
                                            alt=""
                                            className="course-img"
                                          />
                                        </div>
                                      ))}
                                  </div>
                                </div>
                              </div>
                            )}
                            {is_edit && (
                              <>
                                {" "}
                                <div className="row ">
                                  <div className="col-lg-6 mt-2 userss">
                                    <label className="all-label2 mb-1 d-block">
                                      {images?.length > 0
                                        ? "Delete Uploaded Images:"
                                        : ""}
                                    </label>{" "}
                                    <ImageSlider
                                      images={images}
                                      enable_delete={true}
                                      handleMouseEnter={handleMouseEnter}
                                      handleMouseLeave={handleMouseLeave}
                                      hover={hover}
                                      handleDeleteImage={handleDeleteImage}
                                    />
                                    <div style={{ height: 35 }}></div>
                                    <label className="all-label2 mb-1 d-block">
                                      Upload New Images:
                                    </label>
                                    <div className="row ">
                                      <ImageSelectDropzone
                                        max={5 - images?.length}
                                        setproductimage={setproductimage}
                                        files={data?.project_images}
                                        setFiles={(project_images) =>
                                          setData({ ...data, project_images })
                                        }
                                        accept="image/*"
                                      />{" "}
                                    </div>
                                  </div>
                                </div>
                                <p className="primary-text pt-2 pl-2">
                                  Please note that you can upload up to{" "}
                                  {5 - images?.length} images only
                                </p>
                              </>
                            )}
                            {/* <div className="product-preview text-center position-relative">
                              <img src="images/product-preview.png" alt="" />
                              <div className="d-inline-block align-bottom actions-buttons">
                                <input type="file" id="upload" name="file" />
                                <button
                                  type="button"
                                  className="btn delet"
                                  data-toggle="modal"
                                  data-target=".delete-review"
                                >
                                  <i
                                    className="fa fa-trash-alt"
                                    aria-hidden="true"
                                  />
                                </button>
                                <button type="button" className="btn upload">
                                  <label
                                    htmlFor="upload"
                                    className="d-block mb-0"
                                  >
                                    <i className="fa fa-upload" />
                                  </label>
                                </button>
                              </div>
                            </div> */}
                            {/* <p className="primary-text pt-2 pl-2">
                              Please note that you can upload up to 5 images
                              only
                            </p> */}
                          </div>
                          {/* <div className="col-12 col-lg-6 product-thumb-wrap">
                            <div className="row">
                              <div className="col-12 col-lg-6">
                                <div className="preview-thumbs text-center">
                                  <img
                                    src="images/product-thumb-1.png"
                                    alt=""
                                  />
                                  <input
                                    type="checkbox"
                                    id="checkbox_one"
                                    name="question1"
                                    data-trigger="hidden_fields_one"
                                    className="trigger"
                                  />
                                  <div
                                    id="hidden_fields_one"
                                    className="align-bottom actions-buttons"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="file"
                                      id="upload"
                                      name="file"
                                    />
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn upload"
                                    >
                                      <label
                                        htmlFor="upload"
                                        className="d-block mb-0"
                                      >
                                        <i className="fa fa-upload" />
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="preview-thumbs text-center">
                                  <img
                                    src="images/product-thumb-1.png"
                                    alt=""
                                  />
                                  <input
                                    type="checkbox"
                                    id="checkbox_one"
                                    name="question1"
                                    data-trigger="hidden_fields_two"
                                    className="trigger"
                                  />
                                  <div
                                    id="hidden_fields_two"
                                    className="align-bottom actions-buttons"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="file"
                                      id="upload"
                                      name="file"
                                    />
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn upload"
                                    >
                                      <label
                                        htmlFor="upload"
                                        className="d-block mb-0"
                                      >
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
                                  <img
                                    src="images/product-thumb-1.png"
                                    alt=""
                                  />
                                  <input
                                    type="checkbox"
                                    id="checkbox_one"
                                    name="question1"
                                    data-trigger="hidden_fields_three"
                                    className="trigger"
                                  />
                                  <div
                                    id="hidden_fields_three"
                                    className="align-bottom actions-buttons"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="file"
                                      id="upload"
                                      name="file"
                                    />
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn upload"
                                    >
                                      <label
                                        htmlFor="upload"
                                        className="d-block mb-0"
                                      >
                                        <i className="fa fa-upload" />
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-12 col-lg-6">
                                <div className="preview-thumbs text-center">
                                  <img
                                    src="images/product-thumb-4.png"
                                    alt=""
                                  />
                                  <input
                                    type="checkbox"
                                    id="checkbox_one"
                                    name="question1"
                                    data-trigger="hidden_fields_four"
                                    className="trigger"
                                  />
                                  <div
                                    id="hidden_fields_four"
                                    className="align-bottom actions-buttons"
                                    style={{ display: "none" }}
                                  >
                                    <input
                                      type="file"
                                      id="upload"
                                      name="file"
                                    />
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                    <button
                                      type="button"
                                      className="btn upload"
                                    >
                                      <label
                                        htmlFor="upload"
                                        className="d-block mb-0"
                                      >
                                        <i className="fa fa-upload" />
                                      </label>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div> */}
                        </div>
                      </div>
                      <div className="product-form">
                        <div className="user-block">
                          <div className="row">
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>
                                  Product Title
                                </label>
                                {is_edit ? (
                                  <input
                                    type="text"
                                    className="form control"
                                    value={name}
                                    onChange={(e) => {
                                      setname(e.target.value);
                                    }}
                                  />
                                ) : (
                                  <p>{name}</p>
                                )}
                              </div>
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>
                                  Category
                                </label>
                                {is_edit ? (
                                  <select
                                    name
                                    id
                                    className="all-input w-100 mb-0"
                                    value={categoryy}
                                    onChange={(e) => {
                                      setcategoryy(e.target.value);
                                    }}
                                  >
                                    {allofcategory?.length > 0 &&
                                      allofcategory?.map((categ) => (
                                        <option value={categ?._id}>
                                          {categ?.categorytitle}
                                        </option>
                                      ))}
                                  </select>
                                ) : (
                                  <p>{category?.categorytitle}</p>
                                )}
                              </div>
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>Status</label>
                                {is_edit ? (
                                  <select
                                    name
                                    id
                                    className="all-input w-100 mb-0"
                                    value={status}
                                    onChange={(e) => {
                                      setstatus(e.target.value);
                                    }}
                                  >
                                    <option value={true}>Active</option>
                                    <option value={false}>Inactive</option>
                                  </select>
                                ) : (
                                  <p>
                                    {" "}
                                    {status == true ? "Active" : "In-Active"}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="col-12 col-md-6">
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>
                                  Base Price
                                </label>
                                <div className="position-relative">
                                  {is_edit ? (
                                    <InputNumber
                                      value={price}
                                      onChange={setprice}
                                      max={9}
                                      className="form-control"
                                    />
                                  ) : (
                                    <p>{price}</p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>
                                  Count Instock
                                </label>
                                <div className="position-relative">
                                  {is_edit ? (
                                    <InputNumber
                                      value={countInStock}
                                      onChange={setcountInStock}
                                      max={12}
                                      className="form-control"
                                    />
                                  ) : (
                                    <p>{countInStock}</p>
                                  )}
                                </div>
                              </div>
                              <div className="form-group mb-2">
                                <label style={{ paddingLeft: 0 }}>
                                  Description
                                </label>
                                <div className="position-relative">
                                  {is_edit ? (
                                    <textarea
                                      className="form-control"
                                      placeholder="Confirm New Password"
                                      value={description}
                                      onChange={(e) => {
                                        setdescription(e.target.value);
                                      }}
                                    />
                                  ) : (
                                    <p>{description}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                          {is_edit ? (
                            <>
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
                                          onClick={() =>
                                            inputfieldsremove(index)
                                          }
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
                                          value={
                                            inputfield.rangestartingquantity
                                          }
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
                            </>
                          ) : (
                            <div className="form-group mb-2">
                              <label style={{ paddingLeft: 0 }}>
                                Price Quantity Range
                              </label>
                              {quantityrange?.length > 0 &&
                                quantityrange?.map((qua, index) => (
                                  <>
                                    {" "}
                                    <label
                                      style={{ paddingLeft: 0 }}
                                      className="mt-3"
                                    >
                                      Price Quantity {index + 1}
                                    </label>
                                    <label
                                      className="mt-1"
                                      style={{ paddingLeft: 0 }}
                                    >
                                      Range Starting Quantity
                                    </label>
                                    <p>{qua?.rangestartingquantity}</p>
                                    <label style={{ paddingLeft: 0 }}>
                                      Price
                                    </label>
                                    <p>{qua?.rangestartingprice}</p>
                                  </>
                                ))}
                            </div>
                          )}
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

export default ProductEdit;
