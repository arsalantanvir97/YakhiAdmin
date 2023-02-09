import React, { useState, useEffect, useRef } from "react";
import moment from "moment";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import ShowEntries from "../components/ShowEntries";
import Calender from "../components/Calender";
import SearchFilter from "../components/SearchFilter";
import Toasty from "../utils/toast";
import { Editor } from "@tinymce/tinymce-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { editGeoGeneticsText, getGeogeneticsOrders } from "./Api/Orders";
import Loader from "../components/Loader";

const GeoGeneticsOrders = () => {
  const usequeryClient = new useQueryClient();
  const [sort, setsort] = useState();

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const [orders, setorders] = useState([]);
  const [geogenticstext, setgeogenticstext] = useState(() => {
    "";
  });
  const editorRef = useRef(null);

  const { isFetching, isLoading,data, status: prodstatus, refetch } = useQuery({
    queryKey: ["geogeneticsorder", page, perPage, from, to, status, searchString, sort, 
    ],
    queryFn: () => getGeogeneticsOrders(page, perPage, from, to, status, searchString, sort, 
    ),
      // onSuccess: (data) => {
      //   setgeogenticstext(data?.geogenetictext?.text);
      //   console.log("data", data);
      //   setorders(data?.order);
      // }

  });
  useEffect(() => {
    setgeogenticstext(data?.geogenetictext?.text);
    //   console.log("data", data);
      setorders(data?.order);
  }, [data])

  const { mutate, isLoading:updateStatusLoading } = useMutation((data) => editGeoGeneticsText(data), {
    retry: false,
    onSuccess: (res) => {
      // SwalAlert('success','SUCCESS','Order Updated Successfully');

      usequeryClient.invalidateQueries(['geogeneticsorder'])
    //  history.push("/");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });


  // const handleGetOrders = async () => {
  //   try {
  //     const res = await axios({
  //       url: `${baseURL}/order/geoGeneticslogs`,
  //       method: "GET",
  //       params: {
  //         page,
  //         perPage,
  //         searchString,
  //         from,
  //         to,
  //         status,
  //         sort
  //       },
  //       headers: {
  //         Authorization: `Bearer ${adminInfo.token}`
  //       }
  //     });
  //     setgeogenticstext(res?.data?.geogenetictext?.text);
  //     console.log("res", res);
  //     setorders(res.data?.order);
  //   } catch (err) {
  //     console.log("err", err);
  //   }
  // };

  // const editGeoGeneticsText = async function () {
  //   try {
  //     const res = await axios.post(
  //       `${baseURL}/order/editgeogeneticstext`,
  //       { text: geogenticstext },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${adminInfo.token}`
  //         }
  //       }
  //     );

  //     console.log("res", res);

  //     Swal.fire({
  //       icon: "success",
  //       title: "",
  //       text: "Text Updated Successfully",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   } catch (error) {
  //     Swal.fire({
  //       icon: "error",
  //       title: "ERROR",
  //       text: error?.response?.data?.message
  //         ? error?.response?.data?.message
  //         : "Internal Server Error",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  // };

  const editorHandler = (value) => {
    console.log("value", value, typeof value, value?.length);
    setgeogenticstext(value);
  };

  return (
    <>
    {isLoading? <Loader/>:
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
                            <h1>Geo'Genetics Orders</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <a
                              href="#"
                              className="btn btn-primary"
                              data-toggle="modal"
                              data-target="#editText"
                            >
                              Edit Text
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-xl-9">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label>Show entries </label>
                                  <ShowEntries
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                    setPage={setPage}
                                  />
                                </div>
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
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
                                <Calender
                                  from={from}
                                  to={to}
                                  setFrom={setFrom}
                                  setTo={setTo}
                                />
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-12 mt-2">
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
                                  <table className="table table-borderless dataTable">
                                    <thead>
                                      <tr>
                                        <th className="sorting_asc">S. No.</th>
                                        <th className="sorting">Total</th>
                                        <th className="sorting">Billed to</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">Date</th>
                                        <th className="sorting">ACTION</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {orders?.docs?.length > 0 &&
                                        orders?.docs?.map((orderr, index) => (
                                          <tr>
                                            <td className>{index + 1}</td>
                                            <td>${orderr?.totalPrice}</td>
                                            <td>
                                              {
                                                orderr?.shippingAddress
                                                  ?.billingname
                                              }
                                            </td>
                                            <td>{orderr?.status}</td>
                                            <td>
                                              {moment
                                                .utc(orderr?.createdAt)
                                                .format("LL")}
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
                                                  <Link
                                                    to={`/OrderDetails/${orderr?._id}`}
                                                    className="dropdown-item"
                                                  >
                                                    <i className="fa fa-eye" />
                                                    View Detail
                                                  </Link>
                                                </div>
                                              </div>
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              {orders?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={orders?.totalDocs}
                                  totalPages={orders?.totalPages}
                                  currentPage={orders?.page}
                                  setPage={setPage}
                                  hasNextPage={orders?.hasNextPage}
                                  hasPrevPage={orders?.hasPrevPage}
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
      </div>}
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
                    value={geogenticstext}
                    onEditorChange={(value) => editorHandler(value)}
                  />
                </div>
              </div>
              <button
                type="button"
                className="btn btn-primary mr-1 mt-1 px-0"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() =>
                  geogenticstext?.length > 0
                    ? mutate(geogenticstext)
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
        </div>
      </div>
    </>
  );
};

export default GeoGeneticsOrders;
