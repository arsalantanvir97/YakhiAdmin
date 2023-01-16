import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchFilter from "../components/SearchFilter";
import Calender from "../components/Calender";
import ShowEntries from "../components/ShowEntries";
import Pagination from "../components/Padgination";
const UserDetails = ({ match }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [userdetails, setuserdetails] = useState("");
  const [sort, setsort] = useState();
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const [searchString, setSearchString] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [userorderslogs, setuserorderslogs] = useState([]);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/user/user-details/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setuserdetails(res?.data?.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleGetUserOrders();
  }, [page, perPage, from, to, searchString, sort]);

  const handleGetUserOrders = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/order/orderlogs/${match?.params?.id}`,
        method: "GET",
        params: {
          page,
          perPage,
          searchString,
          from,
          to,
          sort,
          id: match?.params?.id
        },
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });

      console.log("res", res);
      setuserorderslogs(res.data?.order);
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
            <section id="configuration" className="user-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12">
                            <h1>
                              <Link to="/Users">
                                <i className="fa fa-angle-left" />
                              </Link>
                              User Details
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row mb-2">
                          <div className="col-12 col-sm-3 mb-1 mb-sm-0">
                            <div className="profile-img">
                              <img
                                src={
                                  userdetails?.userImage &&
                                  userdetails?.userImage !== null
                                    ? `${imageURL}${userdetails?.userImage}`
                                    : "images/avatar.jpg"
                                }
                                className="img-fluid ml-0"
                                alt=""
                              />
                            </div>
                          </div>
                          <div className="col-12 col-sm-9 d-sm-flex d-block justify-content-sm-end justify-content-center align-items-center text-center">
                            <Link
                              to={`/EditUser${userdetails?._id}`}
                              className="btn btn-primary"
                            >
                              Edit Profile
                            </Link>
                          </div>
                        </div>
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>Name</label>
                          </div>
                          <div className="col-12">{userdetails?.firstName}</div>
                        </div>
                    
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>Email</label>
                          </div>
                          <div className="col-12">{userdetails?.email}</div>
                        </div>
                        {userdetails?.signature &&
                        <div className="row detail-row d-flex align-items-center">
                          <div className="col-12 lablename">
                            <label htmlFor>Membership Signature</label>
                          </div>
                          <div className="col-12"> <img
                                                    src={
                                                      userdetails?.signature && userdetails?.signature !== null
                                                        ? `${imageURL}${userdetails?.signature}`
                                                        : "images/img-1.png"
                                                    }
                                                    alt=""
                                                    className="img-fluid"
                                                  /></div>
                        </div>}
                      </div>
                      <div className="dataTables_wrapper">
                        <div className="page-title mb-2">
                          <div className="row">
                            <div className="col-12">
                              <h1>Order History</h1>
                            </div>
                          </div>
                        </div>
                        <div className="user-listing-top">
                          <div className="row align-items-end d-flex mb-1">
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
                              <label>Show entries </label>
                              <ShowEntries
                                perPage={perPage}
                                setPerPage={setPerPage}
                                setPage={setPage}
                              />
                            </div>
                            <div className="col-12 col-md-6 col-lg-6 col-xl-2 mt-2">
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
                            <div className="col-12 col-md-6 col-lg-6 col-xl-3 mt-2 offset-xl-1 offset-0">
                              <div className="search-filter w-100">
                                <label>Search:</label>
                                <SearchFilter
                                  searchString={searchString}
                                  setSearchString={setSearchString}
                                  setPage={setPage}
                                  functionhandler={handleGetUserOrders}
                                />
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
                                        <th className="sorting_asc">S. No.</th>
                                        <th className="sorting">Total</th>
                                        <th className="sorting">Status</th>
                                        <th className="sorting">Date</th>
                                        <th className="sorting">ACTION</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {userorderslogs?.docs?.length > 0 &&
                                        userorderslogs?.docs?.map(
                                          (orderr, index) => (
                                            <tr>
                                              <td className>{index + 1}</td>
                                              <td>${orderr?.totalPrice}</td>
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
                                                    <Link to={`/OrderDetails${orderr?._id}`}
                                                      className="dropdown-item"
                                                      href="orders-details.php"
                                                    >
                                                      <i className="fa fa-eye" />
                                                      View Detail
                                                    </Link>
                                                  </div>
                                                </div>
                                              </td>
                                            </tr>
                                          )
                                        )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              {userorderslogs?.docs?.length > 0 && (
                                <Pagination
                                  totalDocs={userorderslogs?.totalDocs}
                                  totalPages={userorderslogs?.totalPages}
                                  currentPage={userorderslogs?.page}
                                  setPage={setPage}
                                  hasNextPage={userorderslogs?.hasNextPage}
                                  hasPrevPage={userorderslogs?.hasPrevPage}
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

export default UserDetails;
