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
const Faqs = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [faqs, setfaqs] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [question, setquestion] = useState("");
  const [answer, setanswer] = useState("");
  const [faqqs, setfaqqs] = useState("");
  const [ad_video, setad_video] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [faqid, setfaqid] = useState();

  const [status, setStatus] = useState("");
  useEffect(() => {
    handleGetFAQS();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetFAQS = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/faq/faqslogs`,
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

      console.log("resfaqss", res?.data?.faqss);
      setfaqqs(res?.data?.faqss?.videouri);
      setfaqs(res.data?.faqs);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    console.log("faqqs", faqqs);
  }, [faqqs]);

  const addFaqHandler = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/faq/createfaqs`,
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        }
      );
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: "FAQ Created Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetFAQS();
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
    setquestion("");
    setanswer("");
  };
  const filedocsHandler = (e) => {
    console.log("eeee", e?.target?.files[0]);
    setad_video(e?.target?.files[0]);
  };
  const editTaxHandler = async () => {
    try {
      const res = await axios.post(
        `${baseURL}/faq/editfaqs`,
        { question, answer },
        {
          headers: {
            Authorization: `Bearer ${adminInfo.token}`
          }
        }
      );
      Swal.fire({
        icon: "success",
        title: "SUCCESS",
        text: "FAQ Updated Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      handleGetFAQS();
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
    setquestion("");
    setanswer("");
    closeModals();
  };
  //   const deleteFAQHandler = async (id) => {
  //     console.log("id", id);
  //     try {
  //       const res = await axios({
  //         url: `${baseURL}/tax/deleteTax/${id}`,
  //         method: "GET",

  //         headers: {
  //           Authorization: `Bearer ${adminInfo.token}`
  //         }
  //       });
  //       Swal.fire({
  //         icon: "success",
  //         title: "",
  //         text: "Tax  Deleted Successfully",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       handleGetTaxes();
  //     } catch (err) {
  //       Swal.fire({
  //         icon: "error",
  //         title: "ERROR",
  //         text: err?.response?.data?.message
  //           ? err?.response?.data?.message
  //           : "Internal Server Error",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //     }
  //   };
  const uploadVideoHandler = async () => {
    try {
      const formData = new FormData();

      formData.append("ad_video", ad_video);

      const body = formData;
      console.log("await");
      const res = await axios.post(`${baseURL}/faq/faqvideo`, body, {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);

      await Swal.fire({
        icon: "success",
        title: "",
        text: "Video Uploaded Successfully",
        showConfirmButton: false,
        timer: 1500
      });
      window.location.reload();
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
    setad_video();
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
                              <h1>FAQS</h1>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-6 text-right">
                              <a
                                href="#_"
                                data-toggle="modal"
                                data-target=".add-tax"
                                className="btn btn-primary"
                              >
                                Add New
                              </a>
                              <a
                                href="#_"
                                data-toggle="modal"
                                data-target=".editDocument"
                                className="btn btn-primary"
                              >
                                Upload Video
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="dataTables_wrapper">
                          <div className="user-listing-top">
                            <div className="row align-items-center justify-content-between mb-1">
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
                                  {/* <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2">
                                    <label htmlFor className="d-block">
                                      Filter by Status
                                    </label>
                                    <select
                                      name
                                      className="w-100 form-control"
                                      id
                                    >
                                      <option value>Filter</option>
                                      <option value>user</option>
                                    </select>
                                  </div> */}
                                </div>
                              </div>
                              <div className="col-xl-3">
                                <div className="row align-items-center">
                                  <div className="col-12 mt-2">
                                    <div className="search-filter w-100">
                                      <label>Search:</label>
                                      <SearchFilter
                                        searchString={searchString}
                                        setSearchString={setSearchString}
                                        setPage={setPage}
                                        functionhandler={handleGetFAQS}
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row row-table">
                            <div className="main-tabble table-responsive">
                              <div className="dataTables_wrapper container-fluid dt-bootstrap4">
                                <div className="row">
                                  <div className="col-sm-12">
                                    <table className="table table-borderless  dataTable">
                                      <thead>
                                        <tr>
                                          <th className="sorting_asc">
                                            S. No.
                                          </th>
                                          <th className="sorting">Question</th>
                                          <th className="sorting">Answer</th>
                                          <th className="sorting">
                                            Last Updated On
                                          </th>
                                          <th className="sorting">ACTION</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {faqs?.docs?.length > 0 &&
                                          faqs?.docs?.map((taxx, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>{taxx?.question}</td>
                                              <td>{taxx?.answer}%</td>
                                              <td>
                                                {moment(taxx?.createdAt).format(
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
                                                    {/* <Link
                                                      to="#"
                                                      className="dropdown-item"
                                                      onClick={() => {
                                                        deleteTaxHandler(
                                                          taxx?._id
                                                        );
                                                      }}
                                                    >
                                                      <i className="fa fa-trash-alt" />
                                                      Delete
                                                    </Link> */}
                                                    <a
                                                      className="dropdown-item"
                                                      href="#_"
                                                      data-toggle="modal"
                                                      data-target=".edit-tax"
                                                      onClick={() => {
                                                        setquestion(
                                                          taxx?.question
                                                        );
                                                        setanswer(taxx?.answer);
                                                        setfaqid(taxx?._id);
                                                      }}
                                                    >
                                                      <i className="fa fa-edit" />
                                                      Edit
                                                    </a>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                {faqs?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={faqs?.totalDocs}
                                    totalPages={faqs?.totalPages}
                                    currentPage={faqs?.page}
                                    setPage={setPage}
                                    hasNextPage={faqs?.hasNextPage}
                                    hasPrevPage={faqs?.hasPrevPage}
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
      </div>
      <div
        className="modal fade tax-modal add-tax p-0"
        tabIndex
        role
        aria-labelledby
        data-backdrop="static"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" />
              <button
                type="button"
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-12 text-center">
                  <h3>Add New Question</h3>
                </div>
              </div>
              <form action method="post">
                <div className="row">
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Question"
                      value={question}
                      onChange={(e) => {
                        setquestion(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Answer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Answer"
                      value={answer}
                      onChange={(e) => {
                        setanswer(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group text-center">
                    <button
                      type="button"
                      className="btn btn-primary "
                      data-toggle="modal"
                      area-label="Close"
                      data-dismiss="modal"
                      data-target=".added-tax"
                      onClick={() =>
                        question?.length > 0 && answer?.length > 0
                          ? addFaqHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                      }
                    >
                      Add
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade tax-modal edit-tax p-0"
        tabIndex
        role
        aria-labelledby
        data-backdrop="static"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" />
              <button
                type="button"
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body pb-0">
              <div className="row">
                <div className="col-12 text-center">
                  <h3>Edit FAQ</h3>
                </div>
              </div>
              <form action method="post">
                <div className="row">
                  <div className="col-12 form-group">
                    <label htmlFor className="form-label">
                      Question
                    </label>
                    <p>{question}</p>
                  </div>
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Question
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Question"
                      value={question}
                      onChange={(e) => {
                        setquestion(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Answer
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Answer"
                      value={answer}
                      onChange={(e) => {
                        setanswer(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-12 form-group text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        question?.length > 0 && answer?.length > 0
                          ? editTaxHandler()
                          : Toasty(
                              "error",
                              `Please fill out all the required fields!`
                            )
                      }
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade editDocument p-0"
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
                  <h3>FAQ Video</h3>
                  <h4>Video</h4>
                  {faqqs && (
                    <video width="320" height="240" controls>
                      <source src={`${imageURL}${faqqs}`} type="video/ogg" />
                    </video>
                  )}
                  <form action id="addNewDoc">
                    <div className="form-group mb-3">
                      <label
                        htmlFor
                        className="col-10 mx-auto text-center mt-2"
                      >
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
                            className="fas fa-file-upload fa-2x ssssh mt-2"
                            style={{ color: "#C52008" }}
                          />
                        ) : (
                          <i
                            className="fas fa-upload fa-2x ssssh mt-2"
                            style={{ color: "#C52008" }}
                          />
                        )}
                      </label>
                    </div>
                  </form>
                  <button
                    type="button"
                    className="btn btn-primary mr-1 mt-1 px-0"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={() =>
                      ad_video?.name?.length > 0
                        ? uploadVideoHandler()
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
    </>
  );
};

export default Faqs;
