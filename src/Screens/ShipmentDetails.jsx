import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL, imageURL } from "../utils/api";
import Toasty from "../utils/toast";

const ShipmentDetails = ({ match, history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [shipmentdetails, setshipmentdetails] = useState("");
  const [orders, setorders] = useState([]);

  useEffect(() => {
    handleGetShipment();
  }, []);

  const handleGetShipment = async () => {
    console.log("match?.params?.id", match?.params?.id);
    try {
      const res = await axios({
        url: `${baseURL}/shipment/getshipmentdetails/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setshipmentdetails(res?.data?.shipment);
      setorders(res?.data?.order);
    } catch (err) {
      console.log(err);
    }
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
                            <div className="col-12">
                              <h1>
                                {" "}
                                <Link to="/Shipments" className="back-link">
                                  <i className="fas fa-angle-left" />
                                </Link>{" "}
                                Shipment Details
                              </h1>
                              <h4 className="ml-3 mt-1 shipment__date">
                                From Date :{" "}
                                {moment(shipmentdetails?.from).format("LL")}
                              </h4>
                              <h4 className="ml-3 mt-1 shipment__date">
                                To Date :{" "}
                                {moment(shipmentdetails?.to).format("LL")}
                              </h4>
                            </div>
                          </div>
                        </div>
                        {/* Shipment tables */}
                        <div className="row">
                          {orders?.length > 0 && (
                            orders?.map((ord) => (
                              <div className="col-12 mb-3">
                                <p className="shipment__id">
                                  Order ID: {ord?._id}
                                </p>
                                {ord?.orderItems?.length > 0 &&
                                  ord?.orderItems?.map((ordd) => (
                                    <div className="table-responsive">
                                      <table className="table shipment__orders__table table-borderless">
                                        <thead>
                                          <tr>
                                            <th scope="col">Products</th>
                                            <th scope="col">Title</th>
                                            <th scope="col">Quantity</th>
                                            <th scope="col">Total Amount</th>
                                            <th scope="col">Payment Status</th>
                                            <th scope="col">Order Status</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          <tr>
                                            <th scope="row">
                                              {ordd?.image?.length > 0 &&
                                                ordd?.image?.map((img) => (
                                                  <img
                                                    src={
                                                      img && img !== null
                                                        ? `${imageURL}${img}`
                                                        : "images/img-1.png"
                                                    }
                                                    alt=""
                                                    className="img-fluid"
                                                  />
                                                ))}
                                            </th>
                                            <td>{ordd?.name}</td>
                                            <td>{ordd?.qty}</td>
                                            <td>{ordd?.price * ordd?.qty}</td>
                                            <td>
                                              <span className={ord?.status=='Pending' ?  "status__pending" : "status__paid"} >
                                                {ord?.status}
                                              </span>
                                            </td>
                                            <td>
                                              <span className= {ord?.isDelivered==false? "status__pending": "status__paid"}>
                                                {ord?.isDelivered==true? 'Delivered' : 'Not Delivered'}
                                              </span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </div>
                                  ))}
                              </div>
                            ))
                          )}
                           {!orders &&(
                            <h4 className="px-5">No Order</h4>
                          )}
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
                    <h3>Add Shipment</h3>
                    <form action id="addNewDoc">
                      <div className="row mb-2">
                        <div className="col-12 mb-2">
                          <label
                            htmlFor="shipmentName"
                            className="d-block text-left"
                          >
                            Shipment Name
                          </label>
                          <input
                            type="text"
                            name
                            id="shipmentName"
                            placeholder="Enter Name"
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label
                            htmlFor="dateFrom"
                            className="d-block text-left"
                          >
                            Date From
                          </label>
                          <input
                            type="date"
                            name
                            id="dateFrom"
                            placeholder="Select Date"
                          />
                        </div>
                        <div className="col-lg-6 mb-2">
                          <label htmlFor="dateTo" className="d-block text-left">
                            Date to
                          </label>
                          <input
                            type="date"
                            name
                            id="dateTo"
                            placeholder="Select Date"
                          />
                        </div>
                      </div>
                    </form>
                    <button
                      type="button"
                      className="btn btn-primary mr-1 mt-1 px-0"
                      data-dismiss="modal"
                      aria-label="Close"
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
      </div>
    </>
  );
};

export default ShipmentDetails;
