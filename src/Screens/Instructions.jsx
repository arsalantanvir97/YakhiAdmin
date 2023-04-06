import React, { useState, useEffect, useRef } from "react";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { useSelector } from "react-redux";
import Pagination from "../components/Padgination";
import Toasty from "../utils/toast";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { Editor } from "@tinymce/tinymce-react";
import Loader from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addInstruction, editEattoliveTextHandler, editInstruction, editInstructionTextHandler, getInstruction } from "./Api/Instructions";
import SwalAlert from "../components/SwalAlert";
import { Link } from "react-router-dom";
import Calender from "../components/Calender";

const Instructions = ({ history }) => {
  const usequeryClient = new useQueryClient();

  const [ad_video, setad_video] = useState();
  const [videotitle, setvideotitle] = useState();
  const [description, setdescription] = useState();
  const [editvideotitle, seteditvideotitle] = useState();
  const [editdescription, seteditdescription] = useState();
  const [videoview, setvideoview] = useState("");
  const [instructiontext, setinstructiontext] = useState(() => {
    "";
  });
  const [eattolivetext, seteattolivetext] = useState(() => {
    "";
  });

  const editorRef = useRef(null);

  const [is_edit, setIsEdit] = useState(true);
  const [state, setstate] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [insutructionid, setinsutructionid] = useState("");
  const [instructions, setinstructions] = useState([]);

  const [status, setStatus] = useState("");
  const { isFetching, isLoading, data: instructionsdata, status: prodstatus, refetch } = useQuery({
    queryKey: ["instructions", page,
      perPage,
      searchString,
      from,
      to,
      status,
      sort],
    queryFn: () => getInstruction(page,
      perPage,
      searchString,
      from,
      to,
      status,
      sort),
    // onSuccess: (data) => {
    //   setinstructions(data?.instruction);
    //   setinstructiontext(data?.editinstruction?.text);
    // },
    keepPreviousData: true

  });
  useEffect(() => {
    setinstructions(instructionsdata?.instruction);
    setinstructiontext(instructionsdata?.editinstruction?.text);
    // console.log('instructions',instructionsdata)
  }, [instructionsdata])
  const { mutate: addInstructions, isLoading: addInstructionLoading } = useMutation((data) => addInstruction(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Instruction Created Successfully');
      usequeryClient.invalidateQueries(['instructions'])

      history.push("/Instructions");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const { mutate: editInstructions, isLoading: editTaxLoading } = useMutation((data) => editInstruction(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Instruction Updated Successfully');
      usequeryClient.invalidateQueries(['instructions',])
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const { mutate: editTextt, isLoading: editTextLoading } = useMutation((data) => editInstructionTextHandler(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Text Updated Successfully');
      usequeryClient.invalidateQueries(['instructions',])
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const { mutate: editTextt2, isLoading: editText2Loading } = useMutation((data) => editEattoliveTextHandler(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Text Updated Successfully');
      usequeryClient.invalidateQueries(['instructions',])
    },
    onError: (err) => Error(err?.response?.data?.message),
  });


  const addInstructionHandler = async () => {
    const formData = new FormData();

    formData.append("ad_video", ad_video);
    formData.append("videotitle", videotitle);
    formData.append("description", description);
    const body = formData;
    addInstructions(body)
    setad_video("");
    setvideotitle("");
    setdescription("");
  };

  const editInstructionHandler = async () => {
    const formData = new FormData();
    formData.append("ad_video", ad_video);
    formData.append("videotitle", editvideotitle);
    formData.append("description", editdescription);
    formData.append("id", insutructionid);
    const body = formData;
    editInstructions(body)
    setad_video("");
    seteditvideotitle("");
    seteditdescription("");
    setinsutructionid("");
  };

  const filedocsHandler = (e) => {
    console.log("eeee", e?.target?.files[0]);
    setad_video(e?.target?.files[0]);
  };


  const editInstructionText = async function () {

    const body = { text: instructiontext }
    editTextt(body)
  };

  const editEattoliveText = async function () {

    const body = { text: eattolivetext }
    editTextt2(body)
  };


  const editorHandler = (value) => {
    console.log("value", value, typeof value, value?.length);
    setinstructiontext(value);
  };
  const editorHandler2 = (value) => {
    console.log("value", value, typeof value, value?.length);
    seteattolivetext(value);
  };
  return (
    <>
      {isLoading ? <Loader /> :
        <div>
          <div className="app-content content dashboard">
            <div className="content-wrapper">
              <div className="content-body">
                {/* Basic form layout section start */}
                <section id="configuration">
                  <div className="row">
                    <div className="col-12">
                      <div className="card-content collapse show dashCard py-5 px-5">
                        <div className="row justify-content-center">
                          <div className="col-md-12">
                            <div className="d-block d-md-flex justify-content-between mb-4 align-items-center">
                              <h3 className="pageTitle"> Video Management</h3>
                              <Link to='/AddVideo' className="btn_darkbluep ">Add Video</Link>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-xl-12 col-md-12">
                            <div className="row">
                              <div className="col d-lg-flex align-items-center justify-content-between">
                                <SearchFilter
                                  searchString={searchString}
                                  setSearchString={setSearchString}
                                  setPage={setPage}
                                />
                                <div className="dropFilter">
                                  <button className="filterIcon redBg rounded-circle ms-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i className="fas fa-filter" />
                                  </button>
                                  <div className="dropdown-menu filterDropdown">
                                    <div className="filterDropdownHeader">
                                      <p className="mainLabel m-0">Filter</p>
                                    </div>
                                    <div className="dropdown-divider" />
                                    <div className="filterDropdownBody">
                                      <div className="userInput mb-3">
                                        <label htmlFor className="mainLabel">Creation Date:</label>
                                        <Calender
                                          from={from}
                                          to={to}
                                          setFrom={setFrom}
                                          setTo={setTo}
                                        />
                                      </div>
                                      {/* <div className="userInput mb-3">
                                        <label htmlFor className="mainLabel">Filter by Status:</label>
                                        <div className="mb-2">
                                          <select name id className="mainInput filterInput">
                                            <option value="s">Select Status</option>
                                            <option value={1}>Active</option>
                                            <option value={2}>Inactive</option>
                                          </select>
                                        </div>
                                      </div> */}
                                      <div className="filterAction">
                                        <button type="button" className="btn_darkbluep">Apply</button>
                                      </div>
                                      <div className="filterAction">
                                        <button type="button" className="btn_orangebor">Clear All</button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <div className="col-12">
                            <div className="maain-tabble table-responsive">
                              <table className="table table-bordered zero-configuration">
                                <thead>
                                  <tr>
                                    <th>S. No</th>
                                    <th>Video Title</th>
                                    <th>Date</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {instructions?.docs?.length > 0 ? (
                                    instructions?.docs?.map(
                                      (ins, index) => (

                                        <tr>
                                          <td className>{index + 1}</td>
                                          <td>{ins?.videotitle}</td>
                                          <td>
                                            {" "}
                                            {moment(
                                              ins?.createdAt
                                            ).format("LL")}
                                          </td>
                                          <td>
                                            <div className="dropdown">
                                              <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <i className="fa fa-ellipsis-v" />
                                              </button>
                                              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                <li>
                                                  <Link className="dropdown-item" to={`/VideoDetails/${ins?._id}`}><i className="fa fa-eye" /> View</Link>
                                                </li>
                                              </ul>
                                            </div>
                                          </td>
                                        </tr>))) : null}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        {instructions?.docs?.length > 0 && (
                          <Pagination
                            totalDocs={instructions?.totalDocs}
                            totalPages={instructions?.totalPages}
                            currentPage={instructions?.page}
                            setPage={setPage}
                            hasNextPage={instructions?.hasNextPage}
                            hasPrevPage={instructions?.hasPrevPage}
                          />
                        )}

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
                      <h3>Add New Instructions</h3>
                      <form action id="addNewDoc">
                        <div className="form-group mb-3">
                          <label htmlFor className="d-block text-left">
                            Upload Video
                          </label>
                          <input
                            type="file"
                            name
                            id="govt-id"
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={filedocsHandler}
                            className="form-control"
                          />
                          <label htmlFor="govt-id" className="d-block id-upload">
                            {ad_video?.name ? (
                              <i
                                className="fas fa-file-upload fa-2x ssssh"
                                style={{ color: "#C52008" }}
                              />
                            ) : (
                              <i
                                className="fas fa-upload fa-2x ssssh"
                                style={{ color: "#C52008" }}
                              />
                            )}
                          </label>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor className="d-block text-left">
                            Video Title
                          </label>
                          <input
                            type="text"
                            name
                            id
                            placeholder="Enter Video Title"
                            value={videotitle}
                            onChange={(e) => {
                              setvideotitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor className="d-block text-left">
                            Description
                          </label>
                          <textarea
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => {
                              setdescription(e.target.value);
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
                          videotitle?.length > 0 &&
                            ad_video?.name?.length > 0 &&
                            description?.length > 0
                            ? addInstructionHandler()
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
          <div
            className="modal fade delete-product p-0"
            id="editText"
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
                      <h3>Edit Text</h3>
                      <div className="col-12 mt-2">
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
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
                          value={instructiontext}
                          onEditorChange={(value) => editorHandler(value)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-1 mt-1 px-0"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          instructiontext?.length > 0
                            ? editInstructionText()
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

          <div
            className="modal fade delete-product p-0"
            id="eattolive"
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
                      <h3>Edit Text</h3>
                      <div className="col-12 mt-2">
                        <Editor
                          onInit={(evt, editor) => (editorRef.current = editor)}
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
                          value={eattolivetext}
                          onEditorChange={(value) => editorHandler2(value)}
                        />
                      </div>
                      <button
                        type="button"
                        className="btn btn-primary mr-1 mt-1 px-0"
                        data-dismiss="modal"
                        aria-label="Close"
                        onClick={() =>
                          eattolivetext?.length > 0
                            ? editEattoliveText()
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
                    onClick={() => {
                      setad_video("");
                      setvideotitle("");
                      setdescription("");
                      setinsutructionid("");
                      setvideoview("");
                    }}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div className="row">
                    <div className="col-10 mx-auto text-center">
                      <h3 className="mb-3 text-center">Instruction Detail</h3>
                      <h4>Document Name:</h4>
                      <p>{videotitle}</p>
                      <p>{description}</p>

                      <h4>Video</h4>
                      {videoview && (
                        <video width="320" height="240" controls>
                          <source
                            src={`${imageURL}${videoview}`}
                            type="video/ogg"
                          />
                        </video>
                      )}
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
                      setad_video("");
                      seteditvideotitle("");
                      seteditdescription("");
                      setinsutructionid("");
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
                            Upload Video
                          </label>
                          <input
                            type="file"
                            name
                            id="govt-idd"
                            accept="video/mp4,video/x-m4v,video/*"
                            onChange={filedocsHandler}
                            className="form-control"
                          />
                          <label htmlFor="govt-id" className="d-block id-upload">
                            {videoview ? (
                              <i
                                className="fas fa-file-upload fa-2x ssssh"
                                style={{ color: "#C52008" }}
                              />
                            ) : (
                              <i
                                className="fas fa-upload fa-2x ssssh"
                                style={{ color: "#C52008" }}
                              />
                            )}
                          </label>
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor className="d-block text-left">
                            Video Title
                          </label>

                          <input
                            type="text"
                            name
                            id
                            placeholder="Enter Video Title"
                            value={editvideotitle}
                            onChange={(e) => {
                              seteditvideotitle(e.target.value);
                            }}
                          />
                        </div>
                        <div className="form-group mb-3">
                          <label htmlFor className="d-block text-left">
                            Description
                          </label>
                          <textarea
                            placeholder="Enter Description"
                            value={editdescription}
                            onChange={(e) => {
                              seteditdescription(e.target.value);
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
                          editvideotitle?.length > 0
                            ? editInstructionHandler()
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
        </div>}
    </>
  );
};

export default Instructions;
