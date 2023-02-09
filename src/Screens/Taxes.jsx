import React, { useState, useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Toasty from "../utils/toast";
import InputNumber from "../components/InputNumber";
import ShowEntries from "../components/ShowEntries";
import SearchFilter from "../components/SearchFilter";
import { closeModals } from "../utils/closeModals";
import { addTax, deleteTax, editTax, getTaxes } from "./Api/Auth/Taxes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";
const Taxes = ({history}) => {
  const usequeryClient = new useQueryClient();

  const [state, setstate] = useState("");
  const [percent, setpercent] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setsort] = useState();
  const [taxid, settaxid] = useState();
  const [status, setStatus] = useState("");

  const { isFetching, isLoading, data: taxes, status: prodstatus, refetch } = useQuery({
    queryKey: ["taxes", page, perPage, from, to, status, searchString, sort],
    queryFn: () => getTaxes(page, perPage, from, to, status, searchString, sort),
    keepPreviousData: true

  });

  const { mutate: addTaxes, isLoading: addTaxLoading } = useMutation((data) => addTax(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Tax Added Successfully');
      usequeryClient.invalidateQueries(['taxes'])

      history.push("/Taxes");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const { mutate: editTaxes, isLoading: editTaxLoading } = useMutation((data) => editTax(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Tax Edited Successfully');
      usequeryClient.invalidateQueries(['taxes',])
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  const deleteTaxHandler = useMutation(
    {
      mutationFn: (data) => deleteTax(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', 'Tax Deleted Successfully');

        usequeryClient.invalidateQueries(['taxes'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );


  const addTaxHandler = async () => {
    const body = { percent: Number(percent), state }
    addTaxes(body)
    setpercent(0);
    setstate("");
  };

  const editTaxHandler = async () => {
    const body = { percent: Number(percent), state, taxid }
    editTaxes(body)
    setpercent(0);
    setstate("");
    closeModals();
  }
 
  return (
    <>
      <div>
        {isLoading?<Loader/>:
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
                              <h1>Tax Management</h1>
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
                                          <th className="sorting">State</th>
                                          <th className="sorting">Tax %</th>
                                          <th className="sorting">
                                            Last Updated On
                                          </th>
                                          <th className="sorting">ACTION</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {taxes?.docs?.length > 0 &&
                                          taxes?.docs?.map((taxx, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>{taxx?.state}</td>
                                              <td>{taxx?.percent}%</td>
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
                                                    <Link
                                                      to="#"
                                                      className="dropdown-item"
                                                      onClick={() => {
                                                        deleteTaxHandler.mutate(
                                                          taxx?._id
                                                        );
                                                      }}
                                                    >
                                                      <i className="fa fa-trash-alt" />
                                                      Delete
                                                    </Link>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#_"
                                                      data-toggle="modal"
                                                      data-target=".edit-tax"
                                                      onClick={() => {
                                                        setpercent(
                                                          taxx?.percent
                                                        );
                                                        setstate(taxx?.state);
                                                        settaxid(taxx?._id);
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
                                {taxes?.docs?.length > 0 && (
                                  <Pagination
                                    totalDocs={taxes?.totalDocs}
                                    totalPages={taxes?.totalPages}
                                    currentPage={taxes?.page}
                                    setPage={setPage}
                                    hasNextPage={taxes?.hasNextPage}
                                    hasPrevPage={taxes?.hasPrevPage}
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
                  <h3>Add New Tax State</h3>
                </div>
              </div>
              <form action method="post">
                <div className="row">
                  <div className="col-12 form-group">
                    <label htmlFor className="form-label">
                      State
                    </label>
                    <select
                      name
                      className="form-control"
                      value={state}
                      onChange={(e) => setstate(e.target.value)}
                    >
                      <option value>select</option>
                      <option value={"Alabama"}>Alabama</option>
                      <option value={"Alaska"}>Alaska</option>
                      <option value={"Arizona"}>Arizona</option>
                      <option value={"Arkansas"}>Arkansas</option>
                      <option value={"California"}>California</option>
                      <option value={"Colorado"}>Colorado</option>
                      <option value={"Connecticut"}>Connecticut</option>
                      <option value={"Delaware"}>Delaware</option>
                      <option value={"Florida"}>Florida</option>
                      <option value={"Georgia"}>Georgia</option>
                      <option value={"Hawaii"}>Hawaii</option>
                      <option value={"Idaho"}>Idaho</option>
                      <option value={"IllinoisIndiana"}>IllinoisIndiana</option>
                      <option value={"Iowa"}>Iowa</option>
                      <option value={"Kansas"}>Kansas</option>
                      <option value={"Kentucky"}>Kentucky</option>
                      <option value={"Louisiana"}>Louisiana</option>
                      <option value={"Maine"}>Maine</option>
                      <option value={"Maryland"}>Maryland</option>
                      <option value={"Massachusetts"}>Massachusetts</option>
                      <option value={"Michigan"}>Michigan</option>
                      <option value={"Minnesota"}>Minnesota</option>
                      <option value={"Mississippi"}>Mississippi</option>
                      <option value={"Missouri"}>Missouri</option>
                      <option value={"MontanaNebraska"}>MontanaNebraska</option>
                      <option value={"New Hampshire"}>New Hampshire</option>
                      <option value={"New Jersey"}>New Jersey</option>
                      <option value={"New Mexico"}>New Mexico</option>
                      <option value={"New York"}>New York</option>
                      <option value={"North Carolina"}>North Carolina</option>
                      <option value={"North Dakota"}>North Dakota</option>
                      <option value={"Ohio"}>Ohio</option>
                      <option value={"Oklahoma"}>Oklahoma</option>
                      <option value={"Oregon"}>Oregon</option>
                      <option value={"PennsylvaniaRhode Island"}>
                        PennsylvaniaRhode Island
                      </option>
                      <option value={"South Carolina"}>South Carolina</option>
                      <option value={"South Dakota"}>South Dakota</option>
                      <option value={"Tennessee"}>Tennessee</option>
                      <option value={"Texas"}>Texas</option>
                      <option value={"Utah"}>Utah</option>
                      <option value={"Vermont"}>Vermont</option>
                      <option value={"Virginia"}>Virginia</option>
                      <option value={"Washington"}>Washington</option>
                      <option value={"West Virginia"}>West Virginia</option>
                      <option value={"Wisconsin"}>Wisconsin</option>
                      <option value={"Wyoming"}>Wyoming</option>
                    </select>
                  </div>
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Tax %
                    </label>
                    <InputNumber
                      value={percent}
                      onChange={setpercent}
                      max={12}
                      className="form-control"
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
                        percent?.length > 0 && state?.length > 0
                          ? addTaxHandler()
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
                  <h3>Edit Tax</h3>
                </div>
              </div>
              <form action method="post">
                <div className="row">
                  <div className="col-12 form-group">
                    <label htmlFor className="form-label">
                      State
                    </label>
                    <p>{state}</p>
                  </div>
                  <div className="col-12 form-group confrm-pass">
                    <label htmlFor className="form-label">
                      Tax %
                    </label>
                    <InputNumber
                      value={percent}
                      onChange={setpercent}
                      max={12}
                      className="form-control"
                    />
                  </div>
                  <div className="col-12 form-group text-center">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() =>
                        percent?.length > 0 && state?.length > 0
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
    </>
  );
};

export default Taxes;
