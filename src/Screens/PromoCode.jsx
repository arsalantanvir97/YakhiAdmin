import React, { useState, useEffect } from "react";
import { baseURL } from "../utils/api";
import axios from "axios";

import { Link } from "react-router-dom";
import Pagination from "../components/Padgination";
import moment from "moment";
import { changeStatus, getPromoCodes } from "./Api/PromoCodes";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loader from "../components/Loader";
import SearchFilter from "../components/SearchFilter";
import Calender from "../components/Calender";
import SwalAlert from "../components/SwalAlert";
const PromoCode = () => {
  const [sort, setsort] = useState();
  const usequeryClient = new useQueryClient();

  // const [promocode, setpromocode] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [status, setStatus] = useState("");
  const { isFetching, isLoading, data: promocode, status: prodstatus, refetch } = useQuery({
    queryKey: ["promocodes", page,
      page,
      perPage,
      searchString,
      from,
      to,
      status,
      sort],
    queryFn: () => getPromoCodes(page,
      page,
      perPage,
      searchString,
      from,
      to,
      status,
      sort),
    keepPreviousData: true

  });

  const handleChangeStatus = useMutation(
    {
      mutationFn: (data) => changeStatus(data),

      onSuccess: (res) => {
        SwalAlert('success', 'SUCCESS', res?.data?.message);

        usequeryClient.invalidateQueries(['promocodes'])
      },
      onError: (err) => Error(err?.response?.data?.message),
    }
  );


  return (
    <div>
      {isLoading ? <Loader /> :
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
                            <h3 className="pageTitle"> Promocodes</h3>
                            <Link to='/AddPromoCode' className="btn_darkbluep ">Add Promocodes</Link>
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
                              />                           <div className="dropFilter">
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
                                    <div className="userInput mb-3">
                                      <label htmlFor className="mainLabel">Filter by Status:</label>
                                      <div className="mb-2">
                                        <select name id className="mainInput filterInput" value={status}
                                          onChange={(e) => {
                                            setStatus(e.target.value);
                                            setPage(1);
                                          }}
                                        >
                                          <option value="">All</option>

                                          <option value={true}>Active</option>
                                          <option value={false}>Inactive</option>
                                        </select>
                                      </div>
                                    </div>
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
                                  <th>S No.</th>
                                  <th>Promocodes</th>
                                  <th>Amount Or Percent</th>
                                  <th>Date</th>
                                  <th>Status</th>
                                  <th>Action</th>
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
                                    
                                      <td>{prod?.promocode}</td>
                                      <td>{prod?.discount}%</td>
                                      
                                      <td>
                                      <div className="btn-group ml-1">
                                              <div className="dropdown">
                                                <button className="dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                  <i className="fa fa-ellipsis-v" />
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                  <li>
                                                <Link

                                                  to={`/PromoCodeEdit/${prod?._id}`}
                                                  className="dropdown-item" ><i className="fa fa-eye" /> View</Link>

                                                <Link
                                                  onClick={() =>
                                                    handleChangeStatus.mutate(
                                                      prod?._id,
                                                    )
                                                  }
                                                  className="dropdown-item"
                                                  data-toggle="modal"
                                                  data-target=".inactive-product"
                                                >
                                                  <i className={!prod.status
                                                    ? "fa fa-check-circle"
                                                    : "fa fa-ban"} />
                                                  {!prod.status
                                                    ? "Active"
                                                    : "Inactive"}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>

                                        </div>
                                      </td>
                                    </tr>
                                  ))}
                              </tbody>
                            </table>
                          </div>
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
              </section>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default PromoCode;
