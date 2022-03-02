import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseURL } from "../utils/api";
import Graph from "../components/Graph";
import moment from "moment";

const Dashboard = () => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;

  const [dashboarddata, setdashboarddata] = useState();
  const [latestorders, setlatestorders] = useState([]);
  const [year, setyear] = useState("");

  useEffect(() => {
    handleGetDashboarddata();
  }, [year]);
  useEffect(() => {
    getLatestOrdersHandler();
  }, []);

  const handleGetDashboarddata = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/order/getCountofallCollection`,
        method: "GET",
        params: { year },

        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("handleGetDashboarddatares", res);
      setdashboarddata(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const getLatestOrdersHandler = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/order/getLatestOrders`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("getLatestOrdersHandler", res);
      setlatestorders(res?.data?.order);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="app-content content dashboard">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className>
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title mb-0">
                        <div className="row">
                          <div className="col-12 col-sm-12">
                            <h1>Dashboard</h1>
                          </div>
                        </div>
                      </div>
                      <div className="card-dashboard mt-3 mb-3">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-2 d-flex align-items-stretch box-6">
                            <div className="card">
                              <div className="card-body d-flex align-items-center">
                                <div className="media d-flex align-items-center w-100">
                                  <div className="media-body text-left">
                                    <div className="card-title">
                                      TOTAL CUSTOMERS
                                    </div>
                                    <h3>{dashboarddata?.user}</h3>
                                  </div>
                                  <div className="align-self-center text-right">
                                    <svg
                                      className="radial-progress"
                                      data-percentage={50}
                                      viewBox="0 0 80 80"
                                    >
                                      <circle
                                        className="incomplete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                      />
                                      <circle
                                        className="complete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                        style={{
                                          strokeDashoffset: "39.58406743523136"
                                        }}
                                      />
                                      <text
                                        className="percentage"
                                        x="50%"
                                        y="57%"
                                        transform="matrix(0, 1, -1, 0, 80, 0)"
                                      >
                                        50%
                                      </text>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                            <div className="card">
                              <div className="card-body d-flex align-items-center">
                                <div className="media d-flex align-items-center w-100">
                                  <div className="media-body text-left ">
                                    <div className="card-title">
                                      TOTAL ORDERS
                                    </div>
                                    <h3>{dashboarddata?.orderr}</h3>
                                  </div>
                                  <div className="align-self-center text-right">
                                    <svg
                                      className="radial-progress"
                                      data-percentage={95}
                                      viewBox="0 0 80 80"
                                    >
                                      <circle
                                        className="incomplete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                      />
                                      <circle
                                        className="complete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                        style={{
                                          strokeDashoffset: "39.58406743523136"
                                        }}
                                      />
                                      <text
                                        className="percentage"
                                        x="50%"
                                        y="57%"
                                        transform="matrix(0, 1, -1, 0, 80, 0)"
                                      >
                                        95%
                                      </text>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-6 col-xl-3 mb-2 d-flex align-items-stretch box-6">
                            <div className="card">
                              <div className="card-body d-flex align-items-center">
                                <div className="media d-flex align-items-center w-100">
                                  <div className="media-body text-left ">
                                    <div className="card-title">TOTAL SALE</div>
                                    <h3>
                                      $
                                      {dashboarddata?.totalcost?.length > 0 &&
                                        dashboarddata?.totalcost[0]?.countt}
                                    </h3>
                                  </div>
                                  <div className="align-self-center text-right">
                                    <svg
                                      className="radial-progress"
                                      data-percentage={50}
                                      viewBox="0 0 80 80"
                                    >
                                      <circle
                                        className="incomplete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                      />
                                      <circle
                                        className="complete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                        style={{
                                          strokeDashoffset: "39.58406743523136"
                                        }}
                                      />
                                      <text
                                        className="percentage"
                                        x="50%"
                                        y="57%"
                                        transform="matrix(0, 1, -1, 0, 80, 0)"
                                      >
                                        50%
                                      </text>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-md-6 col-lg-6 col-xl-3 pl-md-0 mb-2 d-flex align-items-stretch box-6">
                            <div className="card">
                              <div className="card-body d-flex align-items-center">
                                <div className="media d-flex align-items-center w-100">
                                  <div className="media-body text-left ">
                                    <div className="card-title">
                                      AVERAGE ORDER SALE
                                    </div>
                                    <h3>
                                      ${" "}
                                      {dashboarddata?.totalcost?.length > 0 &&
                                        dashboarddata?.totalcost[0]?.countt}
                                    </h3>
                                  </div>
                                  <div className="align-self-center text-right">
                                    <svg
                                      className="radial-progress"
                                      data-percentage={50}
                                      viewBox="0 0 80 80"
                                    >
                                      <circle
                                        className="incomplete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                      />
                                      <circle
                                        className="complete"
                                        cx={40}
                                        cy={40}
                                        r={35}
                                        style={{
                                          strokeDashoffset: "39.58406743523136"
                                        }}
                                      />
                                      <text
                                        className="percentage"
                                        x="50%"
                                        y="57%"
                                        transform="matrix(0, 1, -1, 0, 80, 0)"
                                      >
                                        50%
                                      </text>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 col-md-12">
                          <div className>
                            <div className="row">
                              <div className="col-12 d-flex justify-content-between tckt-srch-row text-left mb-3">
                                <h2>Sales Analytics</h2>
                                <div className="select-input">
                                  <select
                                    name
                                    id
                                    value={year}
                                    onChange={(e) => {
                                      setyear(e.target.value);
                                    }}
                                  >
                                    <option>Year</option>
                                    <option value={"2016"}>2016</option>
                                    <option value={"2017"}>2017</option>
                                    <option value={"2018"}>2018</option>
                                    <option value={"2019"}>2019</option>
                                    <option value={"2020"}>2020</option>
                                    <option value={"2021"}>2021</option>
                                    <option value={"2022"}>2022</option>
                                    <option value={"2023"}>2023</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            <div className="chart-main position-relative">
                              <div className="row">
                                <div className="col-12 col-xl-12 text-center">
                                  <Graph
                                    graph_data={dashboarddata?.graph_data}
                                  />
                                  <p className="text-dark mt-2">Months</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="main-tabble table-responsive">
                        <div className="dataTables_wrapper container-fluid dt-bootstrap4 no-footer">
                          <div className="row mt-3">
                            <div className="col-sm-12">
                              <h2>Order ID</h2>
                              <table className="table table-borderless dataTable">
                                <thead>
                                  <tr>
                                    <th>S.NO</th>
                                    <th>Base Total</th>
                                    <th>Order Date</th>
                                    <th>STATUS</th>
                                    <th>Billed To</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {latestorders?.length > 0 &&
                                    latestorders?.map((orderr, index) => (
                                      <tr>
                                        <td className>{index + 1}</td>
                                        <td>${orderr?.totalPrice}</td>
                                        <td>
                                          {" "}
                                          {moment
                                            .utc(orderr?.createdAt)
                                            .format("LL")}
                                        </td>
                                        <td>{orderr?.status}</td>
                                        <td>
                                          {orderr?.shippingAddress?.billingname}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
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

export default Dashboard;
