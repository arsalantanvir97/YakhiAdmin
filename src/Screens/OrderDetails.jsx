import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL } from "../utils/api";
import Toasty from "../utils/toast";

const OrderDetails = ({ match, history }) => {
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const [orderdetails, setorderdetails] = useState("");
  const [status, setstatus] = useState(false);

  useEffect(() => {
    handleGetFeedback();
  }, []);

  const handleGetFeedback = async () => {
    try {
      const res = await axios({
        url: `${baseURL}/order/getOrderById/${match?.params?.id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      });
      console.log("res", res);
      setorderdetails(res?.data);
    } catch (err) {
      console.log(err);
    }
  };
  const updateOrderStatusHandler = async () => {
    console.log("createCategoryHandler");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`
        }
      };
      const res = await axios.post(
        `${baseURL}/order/updateOrderToDelivered/${orderdetails?._id}`,
        {status},
        config
      );
      console.log("res", res);
      if (res?.status == 200) {
        console.log("blockkk");
        Swal.fire({
          icon: "success",
          title: "",
          text: "Order Updated Successfully",
          showConfirmButton: false,
          timer: 1500
        });
        console.log("blockkk2");

        history.push("/Orders");
        console.log("blockkk3");
      }
    } catch (error) {
      console.log("error", error?.response?.data);
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: "Internal Server Error",
        showConfirmButton: false,
        timer: 1500
      });
    }
  };

  return (
    <div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="order-detail">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title mb-2">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>
                              <Link
                                to="#"
                                onClick={() => {
                                  history.goBack();
                                }}
                              >
                                <i className="fa fa-angle-left" />
                              </Link>
                              Order Details
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="order-block mb-1">
                        <div className="row ">
                          <div className="col-12">
                            <h3>Order &amp; Account</h3>
                          </div>
                          <div className="col-12 ">
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Order Information</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 mb-2">
                                    <h4>Order Date</h4>
                                    <p>
                                      {" "}
                                      {moment
                                        .utc(orderdetails?.createdAt)
                                        .format("LL")}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <h4>Order Status</h4>
                                    {orderdetails?.isPaid == true && (
                                      <>
                                        {orderdetails?.isDelivered == false && (
                                          <>
                                            <div className="d-block mt-1">
                                              <div className="form-check form-check-inline radio">
                                                <input
                                                  id="radio-1"
                                                  name="radio"
                                                  type="radio"
                                                  defaultChecked
                                                  value={status}
                                                  onChange={() => {
                                                    setstatus(false);
                                                  }}
                                                />
                                                <label
                                                  htmlFor="radio-1"
                                                  className="radio-label"
                                                >
                                                  {" "}
                                                  In Process
                                                </label>
                                              </div>
                                              <div className="radio form-check form-check-inline">
                                                <input
                                                  id="radio-2"
                                                  name="radio"
                                                  type="radio"
                                                  value={status}
                                                  onChange={() => {
                                                    setstatus(true);
                                                  }}
                                                />
                                                <label
                                                  htmlFor="radio-2"
                                                  className="radio-label"
                                                >
                                                  Delivered
                                                </label>
                                              </div>
                                            </div>
                                            <Link
                                              to="#"
                                              onClick={updateOrderStatusHandler}
                                              className="btn btn-primary mt-2"
                                              data-toggle="modal"
                                              data-target=".order-update"
                                            >
                                              Update Status
                                            </Link>{" "}
                                          </>
                                        )}
                                      </>
                                    )}
                                    <p>
                                      {orderdetails?.isPaid == false
                                        ? "Not paid"
                                        : orderdetails?.isDelivered == true &&
                                          "Delivered"}{" "}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Account Information</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 mb-2">
                                    <h4>Customer Name</h4>
                                    <p>
                                      {orderdetails?.user?.firstName +
                                        " " +
                                        orderdetails?.user?.lastName}
                                    </p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <h4>Email</h4>
                                    <p> {orderdetails?.user?.email}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-block mb-1">
                        <div className="row ">
                          <div className="col-12 title">
                            <h3>Address</h3>
                          </div>
                          <div className="col-12">
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Billing Address</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 col-md-6 col-xl-4">
                                    <p>
                                      {
                                        orderdetails?.shippingAddress
                                          ?.billingaddress
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-block mb-1">
                        <div className="row ">
                          <h3 className="col-md-6 col-12">
                            Payment and Shipping
                          </h3>
                          <div className="col-md-6 col-12 align-self-end text-right">
                            <Link
                              to="#"
                              onClick={() => {
                                window.print();
                              }}
                              className="btn btn-primary"
                            >
                              Print Invoice
                            </Link>
                          </div>
                          <div className="col-12 mt-2">
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Payment Information</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12">
                                    <h4>Payment Method</h4>
                                    <p>
                                      {
                                        orderdetails?.paymentMethod
                                          ?.paymentmethod
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Shipping Information</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 mb-2">
                                    <h4>Shipping Method</h4>
                                    <p>Flat Rate - Flat Rate</p>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col-12">
                                    <h4>Shipping Price</h4>
                                    <p>${orderdetails?.shippingPrice}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-block ">
                        <div className="row ">
                          <div className="col-12 title">
                            <h3>Products</h3>
                          </div>
                          <div className="col-12">
                            <div className="card mb-0 light-primary-bg">
                              <div className="table-responsive">
                                <table className="table shop_table table-bordered">
                                  <thead>
                                    <tr>
                                      <th className="product-sku">SKU</th>
                                      <th className="product-name">Product</th>

                                      <th className="product-quantity">Qty</th>
                                      <th className="product-price-per">
                                        Price per unit
                                      </th>
                                      <th className="product-price">Price </th>
                                      <th className="product-subtotal">
                                        Sub Total
                                      </th>
                                      <th className="product-tax">
                                        Tax Amount
                                      </th>
                                      <th className="product-tax-amount">
                                        Tax Percent
                                      </th>
                                      <th className="product-total">Total</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {orderdetails?.orderItems?.length > 0 &&
                                      orderdetails?.orderItems?.map((ord) => (
                                        <tr>
                                          <td
                                            className="product-sku"
                                            data-title="sku"
                                          >
                                            {ord?._id}
                                          </td>
                                          <td className="product-name">
                                            {ord?.name}
                                          </td>

                                          <td
                                            className="product-quantity"
                                            data-title="quantity"
                                          >
                                            {ord?.qty}
                                          </td>
                                          <td
                                            className="product-price-per"
                                            data-title="sku"
                                          >
                                            ${ord?.price}
                                          </td>
                                          <td
                                            className="product-price"
                                            data-title="sku"
                                          >
                                            ${ord?.price * ord?.qty}
                                          </td>
                                          <td
                                            className="product-subtotal"
                                            data-title="subtotal"
                                          >
                                            ${ord?.price * ord?.qty}
                                          </td>
                                          <td
                                            className="product-tax"
                                            data-title="tax"
                                          >
                                            $
                                            {Number(
                                              orderdetails?.taxperproduct / 100
                                            ) *
                                              Number(
                                                ord?.price * ord?.qty
                                              ).toFixed(0)}
                                          </td>
                                          <td
                                            className="product-tax-amount"
                                            data-title="tax-amount"
                                          >
                                            %{orderdetails?.taxperproduct}
                                          </td>
                                          <td
                                            className="product-total"
                                            data-title="total"
                                          >
                                            ${" "}
                                            {Number(
                                              orderdetails?.taxperproduct / 100
                                            ) *
                                              Number(
                                                ord?.price * ord?.qty
                                              ).toFixed(0) +
                                              ord?.price * ord?.qty}
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
                      <div className="row info-block justify-content-end">
                        <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-end">
                          <table
                            cellSpacing={0}
                            className="table total-table table-borderless mt-5"
                          >
                            <tbody>
                              <tr className="cart-subtotal">
                                <th>Sub Total</th>
                                <td data-title="Subtotal">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    {orderdetails?.totalPrice -
                                      orderdetails?.taxPrice}
                                  </span>
                                </td>
                              </tr>
                              <tr className="cart-subtotal">
                                <th>Shipping </th>
                                <td data-title="Subtotal">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    {orderdetails?.shippingPrice}
                                  </span>
                                </td>
                              </tr>
                              <tr className="order-total">
                                <th>Tax</th>
                                <td data-title="Total">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    {orderdetails?.taxPrice}
                                  </span>{" "}
                                </td>
                              </tr>
                              <tr className="order-total light-primary-bg">
                                <th>Total</th>
                                <td data-title="Total">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    {orderdetails?.totalPrice}
                                  </span>{" "}
                                </td>
                              </tr>
                            </tbody>
                          </table>
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

export default OrderDetails;
