import React, { useState, useRef, useEffect } from "react";
import ImageSelectDropzone from "../components/ImageSelectDropzone";
import { Link } from "react-router-dom";
import { MultiSelect } from "react-multi-select-component";

import axios from "axios";

import { baseURL } from "../utils/api";


import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import Swal from "sweetalert2";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getCategories } from "./Api/Categories";
import SwalAlert from "../components/SwalAlert";
import { createProduct } from "./Api/Products";
import { useRecoilValue } from "recoil";
import { adminInfo } from "../Recoil";
import { useForm } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../Validation.js/Schema";
import { getAllTags } from "./Api/Tags";
let taggg = []
const AddProduct = (props) => {
  const adminData = useRecoilValue(adminInfo);

  const usequeryClient = new useQueryClient();

  const [productimage, setproductimage] = useState([]);
  const [name, setname] = useState("");
  const [howtouse, sethowtouse] = useState("");
  const [selected, setSelected] = useState([]);

  const [options, setoptions] = useState([]);

  const [description, setdescription] = useState("");
  const [category, setcategory] = useState("");
  const [price, setprice] = useState(0);
  const [countInStock, setcountInStock] = useState(0);
  const [visible, setvisible] = useState(true);
  const [data, setData] = useState({
    project_images: []
  });

  const editorRef = useRef(null);

  const { isLoading: catloading, data: allofcategory } = useQuery(["categories"], () =>
    getCategories()
  );

  const { data: alloftags } = useQuery(["alltags"], () =>
    getAllTags()
  );
  useEffect(() => {
    console.log('selected', selected)
  }, [selected])

  useEffect(() => {
    alloftags?.length > 0 &&
      alloftags?.map((tagg) =>
        options?.push({ label: tagg?.title, value: tagg?._id })
      );
  }, [alloftags])

  const { mutate, isLoading, status } = useMutation((data) => createProduct(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Product Created Successfully');
      usequeryClient.invalidateQueries(['products'])

      props?.history.push("/Products");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });


  // useEffect(() => {
  //   gettingallCategoriesHandler();
  // }, []);

  // const gettingallCategoriesHandler = async () => {
  //   const res = await axios.get(`${baseURL}/category/allOfCategories`, {
  //     headers: {
  //       Authorization: `Bearer ${adminInfo.token}`
  //     }
  //   });
  //   console.log("res", res);
  //   setallofcategory(res?.data?.getAllCategories);
  // };

  const addProductHandler = async () => {
    const { project_images } = data;
    console.log("addProductHandler", productimage, category);
    selected?.length > 0 &&
      selected?.map((sel) => taggg?.push(sel?.value));
    const formData = new FormData();
    formData.append("id", adminData?._id);
    formData.append("category", category);
    formData.append("name", name);
    formData.append("price", price);
    formData.append("countInStock", countInStock);
    formData.append("howtouse", howtouse);
    formData.append("tag", JSON.stringify(taggg));


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
                          <h3 className="pageTitle"><i className="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                            props?.history.goBack()
                          }} /> Add Product</h3>
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

                    <div className="row">
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Product Name<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <input type="text" className="siteInput" value={name}
                              onChange={(e) => {
                                setname(e.target.value);
                              }} />
                          </div>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">Price$<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <InputNumber
                              value={price}
                              onChange={setprice}
                              max={9}
                              className="siteInput"
                            />                          </div>
                        </div>
                      </div>

                    </div>
                    <div className="row">

                      <div className="col-md-8">
                        <div className="form-field">
                          <label htmlFor className="siteLabel ps-4 mb-2">How To Use<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <input type="text" value={howtouse} onChange={(e) => {
                              sethowtouse(e.target.value)
                            }} className="siteInput" placeholder="How To Use" name id />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-md-4">
                        <div className="form-field mb-3">
                          <label htmlFor className="siteLabel ps-4 mb-2">Categroy<span className="text-danger">*</span></label>
                          <select
                            name
                            id
                            className="mainInput filterInput"
                            value={category}
                            onChange={(e) => {
                              setcategory(e.target.value);
                            }}
                          >
                            {allofcategory?.length > 0 &&
                              allofcategory?.map((allcat) => (
                                <option value={allcat?._id}>
                                  {allcat?.categorytitle}
                                </option>
                              ))}
                          </select>
                        </div>

                      </div>
                      <div className="col-md-4">
                        <div className="form-field mb-3">
                          <label htmlFor className="siteLabel ps-4 mb-2">Inventory<span className="text-danger">*</span></label>
                          <div className="position-relative">
                            <InputNumber
                              value={countInStock}
                              onChange={setcountInStock}
                              max={12}
                              className="form-control"
                            />                          </div>
                        </div>
                        <div className="form-field mb-3">
                          <label htmlFor className="siteLabel ps-4 mb-2">Tag*<span className="text-danger">*</span></label>
                          <div className="position-relative" style={{ zIndex: 11111111111 }}>
                            <MultiSelect
                              options={options}
                              value={selected}
                              onChange={setSelected}
                              labelledBy="Select"
                            />                          </div>

                        </div>
                      </div>
                    </div>
                    <label htmlFor className="siteLabel ps-4 mb-2">Product Details<span className="text-danger">*</span></label>
                    <div className="position-relative">
                    </div>
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

                    <div className="row mt-4">
                      <div className="col-md-12">
                        {!isLoading ? (
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
                            to="#" className="btn_darkbluep">Update</Link>
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

    </div>
  );
};

export default AddProduct;
