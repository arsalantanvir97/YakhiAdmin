import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import InputNumber from "../components/InputNumber";
import ImageSlider from "../components/ImageSlider";
import { baseURL, imageURL } from "../utils/api";
import Swal from "sweetalert2";
import { Parser } from "html-to-react";
import { MultiSelect } from "react-multi-select-component";

import { Editor } from "@tinymce/tinymce-react";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";
import { getCategories } from "./Api/Categories";
import { editProduct, getProductDetails } from "./Api/Products";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
import { getAllTags } from "./Api/Tags";
let taggg=[]
const htmlToReactParser = new Parser();

const ProductEdit = ({ match, enable_dot, history }) => {
  const adminData = useRecoilValue(adminInfo);
  const usequeryClient = new useQueryClient();

  const editorRef = useRef(null);

  const [productdetails, setproductdetails] = useState();
  const [is_edit, setIsEdit] = useState(false);
  const [productimage, setproductimage] = useState([]);
  const [countInStock, setcountInStock] = useState(0);

  const [name, setname] = useState("");

  const [description, setdescription] = useState("");
  const [selected, setSelected] = useState([]);

  const [options, setoptions] = useState([]);

  const [category, setcategory] = useState("");
  const [howtouse, sethowtouse] = useState("");

  const [inputfields, setInputfields] = useState([]);

  const [price, setprice] = useState(0);

  const [visible, setvisible] = useState("");
  const [categoryy, setcategoryy] = useState("");

  const [images, setimages] = useState([]);
  const [hover, sethover] = useState(false);

  const [data, setData] = useState({
    project_images: []
  });
  const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
    getCategories(),
    console.log('abc')
  );
  const { data: alloftags } = useQuery(["alltags"], () =>
    getAllTags()
  );
  useEffect(() => {
    alloftags?.length > 0 &&
      alloftags?.map((tagg) =>
        options?.push({ label: tagg?.title, value: tagg?._id })
      );
  }, [alloftags])

  const { isLoading, data: prodData } = useQuery(
    {
      enabled: allofcategory?.length > 0,
      queryKey: ["product", match.params.id],
      queryFn: () =>
        getProductDetails(match.params.id),
      // onSuccess: (data) => {
      //   console.log("Get data!",data?.data);
      //   setproductdetails(data?.data?.product);
      //   setproductimage(data?.data?.product?.productimage);
      //   setimages(data?.data?.product?.productimage);

      //   setname(data?.data?.product?.name);
      //   setdescription(data?.data?.product?.description);
      //   setprice(data?.data?.product?.price);
      //   setcountInStock(data?.data?.product?.countInStock);

      //   setvisible(data?.data?.product?.visible);

      //   setcategory(data?.data?.product?.category);
      // }
    }
  );
  useEffect(() => {
    console.log('prodData', prodData)
    setproductdetails(prodData?.data?.product);
    setproductimage(prodData?.data?.product?.productimage);
    setimages(prodData?.data?.product?.productimage);

    setname(prodData?.data?.product?.name);
    setdescription(prodData?.data?.product?.description);
    setprice(prodData?.data?.product?.price);
    setcountInStock(prodData?.data?.product?.countInStock);
    sethowtouse(prodData?.data?.product?.howtouse);
    setvisible(prodData?.data?.product?.visible);

    setcategory(prodData?.data?.product?.category);
    prodData?.data?.product?.tag?.length > 0 &&
    prodData?.data?.product?.tag?.map((tagg) =>
      selected?.push({ label: tagg?.title, value: tagg?._id })
    );
  }, [prodData])

  const { mutate, isLoading: editProductloading, status } = useMutation((data) => editProduct(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Product Edited Successfully');

      usequeryClient.invalidateQueries(['products'])
      usequeryClient.invalidateQueries(['product', match.params.id])
      history.push("/Products");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });


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

  const updateCourseData = async () => {
    const { project_images } = data;
    selected?.length > 0 &&
    selected?.map((sel) => taggg?.push(sel?.value));

    console.log("addProductHandler", productimage);
    const formData = new FormData();
    formData.append("id", match?.params?.id);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("howtouse", howtouse);
    formData.append("visible", visible);
    formData.append("category", categoryy);
    formData.append("tag", JSON.stringify(taggg));

    formData.append("description", description);
    formData.append("images", JSON.stringify(images));

    project_images.forEach((reciept) => formData.append("reciepts", reciept));

    const body = formData;
    mutate(body)
    // const res = await axios.post(
    //   `${baseURL}/product/editProduct`,
    //   body,
    //   config
    // );
    // setloading(false);
    // console.log("res", res);
    // if (res?.status == 201) {
    //   console.log("blockkk");
    //   Swal.fire({
    //     icon: "success",
    //     title: "",
    //     text: "Product Updated Successfully",
    //     showConfirmButton: false,
    //     timer: 1500
    //   });
    //   console.log("blockkk2");

    //   history.push("/Products");
    //   console.log("blockkk3");
    // }
    // setloading(false);

    // console.log("error", error?.response?.data);
    // Swal.fire({
    //   icon: "error",
    //   title: "ERROR",
    //   text: "Internal Server Error",
    //   showConfirmButton: false,
    //   timer: 1500
    // });
  };
  const editorHandler = (value) => {
    console.log("value", value, typeof value, value?.length);
    setdescription(value);
  };
  return (
    <div>
      {isLoading ? <Loader /> :
        <div className="app-content content uploadVideoMain">
          <div className="content-wrapper">
            <div className="content-body">
              {/* Basic form layout section start */}
              <section id="configuration">
                <div className="row">
                  <div className="col-12">
                    <div className="card-content collapse show dashCard py-5 px-5">
                      <div className="row justify-content-center mb-3">
                        <div className="col-md-12">
                          <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                            <h3 className="pageTitle"><i onClick={() => {
                              history.goBack()
                            }} className="fas fa-arrow-left me-3 topMArrow" /> {is_edit ? "Edit" : "Details"}</h3>
                          </div>

                        </div>
                      </div>
                      <div className="row"> {!is_edit && (
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
                        <div style={{ height: 15 }}></div>
                        <div className="col-md-4">
                          <div className="form-field">
                            <label htmlFor className="siteLabel ps-4 mb-2">Product Name<span className="text-danger">*</span></label>
                            <div className="position-relative">
                              {is_edit ? (
                                <input
                                  type="text"
                                  className="siteInput"
                                  value={name}
                                  onChange={(e) => {
                                    setname(e.target.value);
                                  }}
                                />
                              ) : (
                                <p>{name}</p>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-field">
                            <label htmlFor className="siteLabel ps-4 mb-2">Price$<span className="text-danger">*</span></label>
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
                              )}                        </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">

                        <div className="col-md-8">
                          <div className="form-field">
                            <label htmlFor className="siteLabel ps-4 mb-2">How To Use<span className="text-danger">*</span></label>
                            <div className="position-relative">
                              {is_edit ? (
                                <input type="text" value={howtouse} onChange={(e) => {
                                  sethowtouse(e.target.value)
                                }} className="siteInput" placeholder="How To Use" name id />) : (
                                <p>{howtouse}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-md-4">
                          <div className="form-field mb-3">
                            <label htmlFor className="siteLabel ps-4 mb-2">Categroy<span className="text-danger">*</span></label>
                            <div className="position-relative">
                              {is_edit ? (
                                <select
                                  name
                                  id
                                  className="mainInput filterInput"
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
                              )}                        </div>

                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="form-field mb-3">
                            <label htmlFor className="siteLabel ps-4 mb-2">Products<span className="text-danger">*</span></label>
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
                              )}                        </div>
                          </div>
                          <div className="form-field mb-3">
                            <label htmlFor className="siteLabel ps-4 mb-2">Tag*<span className="text-danger">*</span></label>
                            <div className="position-relative" style={{ zIndex: 11111111111 }}>
                            <MultiSelect
                              options={options}
                              value={selected}
                              onChange={setSelected}
                              labelledBy="Select"
                            />    
                            </div>
                           
                          </div>
                        </div>
                        <label htmlFor className="siteLabel ps-4 mb-2">Product Details<span className="text-danger">*</span></label>
                        <div className="position-relative">
                        </div>
                        {is_edit ? (
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
                            onEditorChange={(value) =>
                              editorHandler(value)
                            }
                          />
                        ) : (
                          <p> {htmlToReactParser.parse(description)}</p>
                        )}
                      </div>
                      <div className="row mt-4">
                        <div className="col-md-12">  {!editProductloading ? (
                          <Link
                            to="#"
                            onClick={() => {
                              if (!is_edit) {
                                setIsEdit(true);
                              } else {
                                updateCourseData();
                              }
                            }}
                            className="btn_darkbluep">{is_edit ? "Update" : "Edit"}
                          </Link>
                        ) : (
                          <i className="fas fa-spinner fa-pulse"></i>
                        )}
                        </div>
                      </div>
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

export default ProductEdit;
