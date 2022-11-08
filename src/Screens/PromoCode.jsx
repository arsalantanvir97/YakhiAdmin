import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import Swal from "sweetalert2";
import moment from "moment";
const PromoCode = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [sort, setsort] = useState();

  const [promocode, setpromocode] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    handleGetPromoCodes();
  }, [page, perPage, from, to, status, searchString, sort]);

  const handleGetPromoCodes = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/promo/PromoCodeLogs`,
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
      setpromocode(res.data?.promocode);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="product-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>Promo Code</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <Link
                              to="/AddPromoCode"
                              // href="add-product.php"
                              className="btn btn-primary"
                            >
                              Add
                            </Link>
                          </div>
                        </div>
                      </div>
                      <div className="dataTables_wrapper custom-filter">
                        <div className="user-listing-top">
                          <div className="row align-items-center justify-content-between mb-1">
                            <div className="col-xl-9">
                              <div className="row align-items-center justify-content-between">
                                <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label>Show entries </label>
                                  <select
                                    className="form-control"
                                    value={perPage}
                                    onChange={(e) => {
                                      setPerPage(e.target.value);
                                      setPage(1);
                                    }}
                                  >
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                    <option value={100}>100</option>
                                  </select>
                                </div>
                                
                                {/* <div className="col-xl-3 col-md-6 col-12 mt-2">
                                  <label htmlFor className="d-block">
                                    Filter by Category
                                  </label>
                                  <select
                                    name
                                    className="form-control"
                                    id
                                    value={category}
                                    onChange={(e) => {
                                      setcategory(e.target.value);
                                    }}
                                  >
                                    <option value="">All</option>
                                    {allofcategory?.length > 0 &&
                                      allofcategory?.map((allcat) => (
                                        <option value={allcat?._id}>
                                          {allcat?.categorytitle}
                                        </option>
                                      ))}
                                  </select>
                                </div> */}
                               
                              </div>
                            </div>
                            <div className="col-xl-3">
                              <div className="row">
                                <div className="col-12 mt-2">
                                  <div className="search-filter w-100">
                                    <label>Search:</label>
                                    <input
                                      type="search"
                                      className="form-control form-control-sm"
                                      placeholder="Search"
                                      value={searchString}
                                      onChange={(e) => {
                                        setSearchString(e.target.value);
                                        setPage(1);
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          handleGetPromoCodes();
                                        }
                                      }}
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
                                        <th className>ID</th>
                                        <th className>Title</th>
                                        <th className>Starting Date</th>
                                        <th className>Ending Date</th>
                                        <th className>Promo Code</th>
                                        <th className>Discount</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {promocode?.docs?.length > 0 &&
                                        promocode?.docs?.map((prod, index) => (
                                          <tr>
                                            <td className>{index + 1}</td>
                                            <td>{prod?.title}</td>
                                            <td>
                                              {" "}
                                              {moment
                                                .utc(prod?.startingdate)
                                                .format("LL")}
                                            </td>
                                            <td>
                                              {moment
                                                .utc(prod?.endingdate)
                                                .format("LL")}{" "}
                                            </td>
                                            <td>{prod?.promocode}</td>
                                            <td>{prod?.discount}%</td>
                                            <td>
                                             
                                            </td>
                                          </tr>
                                        ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              {promocode?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={promocode?.totalDocs}
                                  totalPages={promocode?.totalPages}
                                  currentPage={promocode?.page}
                                  setPage={setPage}
                                  hasNextPage={promocode?.hasNextPage}
                                  hasPrevPage={promocode?.hasPrevPage}
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
  );
};

export default PromoCode;
