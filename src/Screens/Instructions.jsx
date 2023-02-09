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
                                <h1>Instructions</h1>
                              </div>
                              <div className="col-12 col-sm-6 col-lg-6 text-md-right">
                                <a
                                  href="#"
                                  className="btn btn-primary mr-2 mb-2"
                                  data-toggle="modal"
                                  data-target="#addDocument"
                                >
                                  Add New
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-primary mr-2 mb-2"
                                  data-toggle="modal"
                                  data-target="#editText"
                                >
                                  Edit Text
                                </a>
                                <a
                                  href="#"
                                  className="btn btn-primary mr-2"
                                  data-toggle="modal"
                                  data-target="#eattolive"
                                >
                                  Eat to Live
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
                                          {instructions?.docs?.length > 0 && (
                                            <tr>
                                              <th className="sorting_asc">ID</th>
                                              <th className="sorting">
                                                Video Title
                                              </th>
                                              <th className="sorting">
                                                Uploaded Date
                                              </th>
                                              <th className="sorting">Actions</th>
                                            </tr>
                                          )}
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
                                                            setvideotitle(
                                                              ins?.videotitle
                                                            );
                                                            setvideoview(
                                                              ins?.videouri
                                                            );
                                                            setdescription(
                                                              ins?.description
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
                                                            setad_video(
                                                              ins?.videouri
                                                            );
                                                            seteditvideotitle(
                                                              ins?.videotitle
                                                            );
                                                            seteditdescription(
                                                              ins?.description
                                                            );
                                                            setinsutructionid(
                                                              ins?._id
                                                            );
                                                          }}
                                                        >
                                                          <i className="far fa-edit" />
                                                          Edit
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </td>
                                                </tr>
                                              )
                                            )
                                          ) : (
                                            <p>No Instruction</p>
                                          )}
                                        </tbody>
                                      </table>
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
