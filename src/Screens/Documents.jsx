import React, { useState, useEffect } from "react";
import { baseURL, imageURL } from "../utils/api";
import axios from "axios";
import moment from "moment";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { closeModals } from "../utils/closeModals";
import ImageSelector from "../components/ImageSelector";

const Documents = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [doc_schedule, setdoc_schedule] = useState("");
  const [pdfdocx, setpdfdocx] = useState("");
  const [pdfnamee, setpdfnamee] = useState("");
  const [pdfimage, setpdfimage] = useState("");
  const [editpdfdocx, seteditpdfdocx] = useState("");
  const [editpdfnamee, seteditpdfnamee] = useState("");
  const [editpdfimage, seteditpdfimage] = useState("");
  const [image, setimage] = useState();
  const [is_edit, setIsEdit] = useState(true);
  const [state, setstate] = useState("");
  const [percent, setpercent] = useState(0);
  const [documents, setdocuments] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [documentid, setdocumentid] = useState("");
  const [pdfname, setpdfname] = useState("");

  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetDocuments();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetDocuments = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/document/documentlogs`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          status,
          sort
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);
      setdocuments(res.data?.document);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addDocumentHandler = async () => {
    try {
      const formData = new FormData();
      formData.append("user_image", image);
      formData.append("doc_schedule", doc_schedule);
      formData.append("pdfname", pdfname);
      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/document/createDocument`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);

      Swal.fire({
        icon: "success",
        title: "",
        text: "Document Created Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetDocuments();
    } catch (error) {
      console.log("error", error, error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
    setdoc_schedule("");
    setimage("");
    setpdfname("");
  };
  useEffect(() => {
    console.log("editpdfdocx", editpdfdocx);
  }, [editpdfdocx]);

  const editDocumentHandler = async () => {
    console.log("editpdfdocx", editpdfdocx);
    try {
      const formData = new FormData();

      formData.append("user_image", editpdfimage);
      formData.append("documentid", documentid);
      formData.append("doc_schedule", doc_schedule);
      formData.append("pdfname", editpdfnamee);
      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/document/editDocument`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      Swal.fire({
        icon: "success",
        title: "",
        text: "Document Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetDocuments();
    } catch (error) {
      console.log("error", error, error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: error?.response?.data?.message
          ? error?.response?.data?.message
          : "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }

    setdoc_schedule("");
    seteditpdfnamee("");
    seteditpdfimage("");
  };

  const filedocsHandler = (e) => {
    console.log("eeee", e?.target?.files[0]);
    setdoc_schedule(e?.target?.files[0]);
  };

  return (
    <>
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
                              <h1>Documents</h1>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 text-right">
                              <a
                                href="#"
                                className="btn btn-primary"
                                data-toggle="modal"
                                data-target="#addDocument"
                              >
                                Add New
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="dataTables_wrapper">
                          <div className="user-listing-top">
                           
                              <div className="row align-items-end d-flex mb-1">
                                <div className="col-xl-9">
                                  <div className="row align-items-center justify-content-start">
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                      <label>Show entries </label>
                                      <ShowEntries
                                        perPage={perPage}
                                        setPerPage={setPerPage}
                                        setPage={setPage}
                                      />
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                      <label htmlFor className="d-block">
                                        Sort by:
                                      </label>
                                      <select
                                        name
                                        className="w-100 form-control sort-select"
                                        value={sort}
                                        onChange={(e) => {
                                          setsort(e.target.value);
                                        }}
                                      >
                                        <option value={"asc"}>Latest</option>
                                        <option value={"des"}>Earlier</option>
                                      </select>
                                    </div>
                                 
                                  </div>
                                </div>
                                <div className="col-xl-3">
                                  <div className="row align-items-center justify-content-center">
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-12 mt-2">
                                      <div className="search-filter w-100">
                                        <label>Search:</label>
                                        <SearchFilter
                                          searchString={searchString}
                                          setSearchString={setSearchString}
                                          setPage={setPage}
                                          functionhandler={handleGetDocuments}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            
                          </div>
                          <div className="row row-table">
                            <div className="main-tabble table-responsive">
                              <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <table className="table table-borderless  dataTable">
                                      <thead>
                                        {documents?.docs?.length > 0 && (
                                          <tr>
                                            <th className="sorting_asc">ID</th>
                                            <th className="sorting">
                                              Document Name
                                            </th>
                                            <th className="sorting">
                                              Uploaded Date
                                            </th>
                                            <th className="sorting">Actions</th>
                                          </tr>
                                        )}
                                      </thead>
                                      <tbody>
                                        {documents?.docs?.length > 0 ? (
                                          documents?.docs?.map((doc, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>{doc?.pdfname}</td>
                                              <td>
                                                {" "}
                                                {moment(doc?.createdAt).format(
                                                  "LL"
                                                )}
                                              </td>
                                              <td>
                                                <div className="btn-group ml-1">
                                                  <button
                                                    type="button"
                                                    className="btn btn-drop-table btn-sm"
                                                    data-toggle="dropdown"
                                                  >
                                                    <i className="fa fa-ellipsis-v" />
                                                  </button>
                                                  <div className="dropdown-menu">
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                      data-toggle="modal"
                                                      data-target="#viewDocument"
                                                      onClick={() => {
                                                        setpdfnamee(
                                                          doc?.pdfname
                                                        );
                                                        setpdfdocx(
                                                          doc?.pdfdocs
                                                        );
                                                        setpdfimage(
                                                          doc?.pdfimage
                                                        );
                                                      }}
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </a>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                      data-toggle="modal"
                                                      data-target="#editDocument"
                                                      onClick={() => {
                                                        setdoc_schedule(
                                                          doc?.pdfdocs
                                                        );
                                                        seteditpdfnamee(
                                                          doc?.pdfname
                                                        );
                                                        seteditpdfimage(
                                                          doc?.pdfimage
                                                        );
                                                        setdocumentid(doc?._id);
                                                      }}
                                                    >
                                                      <i className="far fa-edit" />
                                                      Edit
                                                    </a>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          ))
                                        ) : (
                                          <p>No Document</p>
                                        )}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {documents?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={documents?.totalDocs}
                                    totalPages={documents?.totalPages}
                                    currentPage={documents?.page}
                                    setPage={setPage}
                                    hasNextPage={documents?.hasNextPage}
                                    hasPrevPage={documents?.hasPrevPage}
                                  />
                                )}
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
        {/* Add Document Popup */}
        <div
          className="modal fade delete-product p-0"
          id="addDocument"
          tabIndex
          role
          aria-labelledby
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel" />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-10 mx-auto text-center">
                    <h3>Add New Document</h3>
                    <form action id="addNewDoc">
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Upload Image
                        </label>
                        <ImageSelector
                          isdocument={true}
                          setImage={setimage}
                          image={image}
                          is_edit={is_edit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Upload Document
                        </label>
                        <input
                          type="file"
                          name
                          id="govt-id"
                          accept="application/pdf,application/vnd.ms-excel"
                          onChange={filedocsHandler}
                          className="form-control"
                        />
                        <label htmlFor="govt-id" className="d-block id-upload">
                          {doc_schedule?.name ? (
                            <i
                              className="fas fa-file-upload fa-2x"
                              style={{ color: "#C52008" }}
                            />
                          ) : (
                            <i
                              className="fas fa-upload fa-2x"
                              style={{ color: "#C52008" }}
                            />
                          )}
                        </label>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Document Name
                        </label>
                        <input
                          type="text"
                          name
                          id
                          placeholder="Enter the Document Name"
                          value={pdfname}
                          onChange={(e) => {
                            setpdfname(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() =>
                        pdfname?.length > 0 &&
                        image?.name?.length > 0 &&
                        doc_schedule?.name?.length > 0
                          ? addDocumentHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                      }
                    >
                      Add
                    </button>
                    {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* View Document Popup */}
        <div
          className="modal fade delete-product p-0"
          id="viewDocument"
          tabIndex
          role
          aria-labelledby
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel" />
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-10 mx-auto text-center">
                    <h3 className="mb-3 text-center">Document Detail</h3>
                    <h4>Document Name:</h4>
                    <p>{pdfnamee}</p>
                    <img
                      src={`${imageURL}${pdfimage}`}
                      alt=""
                      className="img-fluid d-block mb-4 mx-auto"
                    />
                    <h4>View Document</h4>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0 mx-auto d-inline-block text-center"
                      data-dismiss="modal"
                      onClick={() =>
                        window.open(`${imageURL}${pdfdocx}`, "_blank")
                      }
                      aria-label="Close"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Edit Document Popup */}
        <div
          className="modal fade delete-product p-0"
          id="editDocument"
          tabIndex
          role
          aria-labelledby
          aria-hidden="true"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel" />
                <button
                  onClick={() => {
                    setdoc_schedule("");
                    seteditpdfnamee("");
                    seteditpdfimage("");
                    setdocumentid("");
                  }}
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-10 mx-auto text-center">
                    <h3>Edit Document</h3>
                    <form action id="addNewDoc">
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Upload Image
                        </label>
                        <ImageSelector
                          isdocument={true}
                          setImage={seteditpdfimage}
                          image={editpdfimage}
                          is_edit={is_edit}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Upload Document
                        </label>
                        <input
                          type="file"
                          name
                          id="govt-idd"
                          accept="application/pdf,application/vnd.ms-excel"
                          onChange={filedocsHandler}
                          className="form-control"
                        />
                        <label htmlFor="govt-id" className="d-block id-upload">
                          {editpdfdocx ? (
                            <i
                              className="fas fa-file-upload fa-2x"
                              style={{ color: "#C52008" }}
                            />
                          ) : (
                            <i
                              className="fas fa-upload fa-2x"
                              style={{ color: "#C52008" }}
                            />
                          )}
                        </label>
                      </div>
                      <div className="form-group mb-3">
                        <label htmlFor className="d-block text-left">
                          Document Name
                        </label>

                        <input
                          type="text"
                          name
                          id
                          placeholder="Enter the Document Name"
                          value={editpdfnamee}
                          onChange={(e) => {
                            seteditpdfnamee(e.target.value);
                          }}
                        />
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() =>
                        editpdfnamee?.length > 0
                          ? editDocumentHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                      }
                    >
                      Update
                    </button>
                    {/* <button type="submit" class="btn btn-secondary ml-1" data-dismiss="modal" aria-label="Close">No</button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Documents;
