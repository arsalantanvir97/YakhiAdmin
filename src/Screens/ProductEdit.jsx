import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import InputNumber from "../components/InputNumber";
import ImageSlider from "../components/ImageSlider";
import { baseURL, imageURL } from "../utils/api";
import Swal from "sweetalert2";
import { Parser } from "html-to-react";
import { Editor } from "@tinymce/tinymce-react";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";
import { getCategories } from "./Api/Categories";
import { editProduct, getProductDetails } from "./Api/Products";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import SwalAlert from "../components/SwalAlert";
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

  const [category, setcategory] = useState("");

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

  const { isLoading,data:prodData } = useQuery(
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
    console.log('prodData',prodData)
    setproductdetails(prodData?.data?.product);
      setproductimage(prodData?.data?.product?.productimage);
      setimages(prodData?.data?.product?.productimage);

      setname(prodData?.data?.product?.name);
      setdescription(prodData?.data?.product?.description);
      setprice(prodData?.data?.product?.price);
      setcountInStock(prodData?.data?.product?.countInStock);

      setvisible(prodData?.data?.product?.visible);

      setcategory(prodData?.data?.product?.category);
    }, [prodData])
    
  const { mutate, isLoading:editProductloading ,status} = useMutation((data) => editProduct(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success','SUCCESS','Product Edited Successfully');

      usequeryClient.invalidateQueries(['products'])
      usequeryClient.invalidateQueries(['product',match.params.id])
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
    console.log("addProductHandler", productimage);
      const formData = new FormData();
      formData.append("id", match?.params?.id);
      formData.append("name", name);
      formData.append("price", price);
      formData.append("countInStock", countInStock);

      formData.append("visible", visible);
      formData.append("category", categoryy);
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
      {isLoading  ? <Loader /> :
        <div className="app-content dashboard content">
          <div className="content-wrapper">
            <div className="content-body">
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
                              {!editProductloading ? (
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
                                </Link>
                              ) : (
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
                                    <label style={{ paddingLeft: 0 }}>
                                      Visible In Menu
                                    </label>
                                    {is_edit ? (
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
                                    ) : (
                                      <p>
                                        {" "}
                                        {visible == true
                                          ? "Visible"
                                          : "Not Visible"}
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
                                </div>
                                <div className="form-group mb-2">
                                  <label style={{ paddingLeft: 0 }}>
                                    Description
                                  </label>
                                  <div className="position-relative">
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
        </div>}
    </div>
  );
};

export default ProductEdit;
