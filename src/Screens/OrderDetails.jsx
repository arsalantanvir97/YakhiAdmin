import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { baseURL, imageURL } from "../utils/api";
import Toasty from "../utils/toast";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getOrderDetails, updateOrderStatusHandler } from "./Api/Orders";
import SwalAlert from "../components/SwalAlert";
import Loader from "../components/Loader";

const OrderDetails = ({ match, history }) => {
  const usequeryClient = new useQueryClient();

  // const [orderdetails, setorderdetails] = useState("");
  const [status, setstatus] = useState("InProcess");
  const [hideDownload, sethideDownload] = useState(false);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  const { isLoading: orderloading, data: orderdetails } = useQuery(["order", match.params.id], () =>
    getOrderDetails(match.params.id)
  );

  const { mutate, isLoading: updateStatusLoading } = useMutation((data) => updateOrderStatusHandler(data), {
    retry: false,
    onSuccess: (res) => {
      SwalAlert('success', 'SUCCESS', 'Order Updated Successfully');

      usequeryClient.invalidateQueries(['orders'])
      usequeryClient.invalidateQueries(['order', match.params.id])
      history.push("/Orders");
    },
    onError: (err) => Error(err?.response?.data?.message),
  });
  // const updateOrderStatusHandler = async () => {
  //   console.log("createCategoryHandler");
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${adminInfo.token}`
  //       }
  //     };
  //     const res = await axios.post(
  //       `${baseURL}/order/updateOrderToDelivered/${orderdetails?._id}`,
  //       { status },
  //       config
  //     );
  //     console.log("res", res);
  //     if (res?.status == 200) {
  //       console.log("blockkk");
  //       Swal.fire({
  //         icon: "success",
  //         title: "",
  //         text: "Order Updated Successfully",
  //         showConfirmButton: false,
  //         timer: 1500
  //       });
  //       console.log("blockkk2");

  //       history.push("/Orders");
  //       console.log("blockkk3");
  //     }
  //   } catch (error) {
  //     console.log("error", error?.response?.data);
  //     Swal.fire({
  //       icon: "error",
  //       title: "ERROR",
  //       text: "Internal Server Error",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //   }
  // };

  const printDocument = async (data) => {
    await sethideDownload(true);
    html2canvas(data.current).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "l", // landscape
        unit: "pt", // points, pixels won't work properly
        format: [canvas.width, canvas.height]
      });
      const imgProps = pdf.getImageProperties(imgData);
      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();
      console.log("width", width, height);
      pdf.addImage(imgData, "PNG", 0, 0, width, height);
      pdf.save("invoice.pdf");
    });
    sethideDownload(false);
  };
  return (
    <div>
                        {orderloading ? <Loader /> :

      <div class="app-content content dashboard">
        <div class="content-wrapper">
          <div class="content-body">


            <section class="myprofile " id="configuration">
              <div class="box py-5">
                <div class="row justify-content-center">
                  <div class="col-md-12">
                    <div class="d-block d-md-flex justify-content-between mb-4 align-items-center">
                      <h3 class="pageTitle"><i class="fas fa-arrow-left me-3 topMArrow" onClick={() => {
                        history.goBack()
                      }}></i> Order Details</h3>

                      <div class="div">
                        {orderdetails?.isPaid == true && orderdetails?.isDelivered == "Pending" &&

                          <label onClick={() => {
                            mutate({ id: match.params.id, status })
                          }}>Change The Status</label>}
                        <button onClick={() => {
                          orderdetails?.isPaid == true && orderdetails?.isDelivered == "Pending" &&
                          mutate({ id: match.params.id, status })
                        }} class={orderdetails?.status == 'Pending' ? "yellowBg selectStatus" : "greenBg selectStatus"} >{orderdetails?.status}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-8">
                    <form class="myprofile_main px-5">
                      <div class="row border-bottom-1 mb-3">
                        <div class="col-md-4">
                          <div class="felid d-flex">
                            <label class="h_20 text-black fw-semibold">Order ID:</label>
                            <p class="h_20 gray-colour fw-semibold ps-3">{orderdetails?._id}</p>
                          </div>
                        </div>
                      </div>
                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="felid">
                            <h3 class="fw-semibold">Order Information</h3>
                          </div>
                        </div>
                      </div>

                      <div class="row border-bottom-1 pb-3 mb-3">
                        <div class="col-md-3">
                          <div class="felid">
                            <label class="h_16 gray-colour fw-semibold">Order Date</label>
                            <p class="h_16 text-black fw-semibold"> {moment
                              .utc(orderdetails?.createdAt)
                              .format("LL")}</p>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="felid">
                            <h3 class="fw-semibold">Account Information</h3>
                          </div>
                        </div>
                      </div>

                      <div class="row border-bottom-1 pb-3 mb-3">
                        <div class="col-md-3">
                          <div class="felid">
                            <label class="h_16 gray-colour fw-semibold">Name</label>
                            <p class="h_16 text-black fw-semibold">{orderdetails?.user?.firstname + ' ' + orderdetails?.user?.lastname}</p>
                          </div>
                        </div>
                        <div class="col-md-3">
                          <div class="felid">
                            <label class="h_16 gray-colour fw-semibold">Email Address</label>
                            <p class="h_16 text-black fw-semibold">{orderdetails?.user?.email}</p>
                          </div>
                        </div>
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="felid">
                            <h3 class="fw-semibold">Address</h3>
                          </div>
                        </div>
                      </div>

                      <div class="row border-bottom-1 pb-3 mb-3">
                        <div class="col-md-6">
                          <div class="felid">
                            <label class="h_16 gray-colour fw-semibold">Billing Address</label>
                            <p class="h_16 text-black fw-semibold"> {
                              orderdetails?.shippingAddress
                                ?.billingaddress
                            }</p>
                          </div>
                        </div>
                        {orderdetails?.shippingAddress
                          ?.shippingaddress &&
                          <div class="col-md-6">
                            <div class="felid">
                              <label class="h_16 gray-colour fw-semibold">Shipping Address</label>
                              <p class="h_16 text-black fw-semibold">{orderdetails?.shippingAddress
                                ?.shippingaddress}</p>
                            </div>
                          </div>}
                      </div>

                      <div class="row mb-3">
                        <div class="col-md-12">
                          <div class="felid">
                            <h3 class="fw-semibold">Payment Information</h3>
                          </div>
                        </div>
                      </div>

                      <div class="row border-bottom-1 pb-3 mb-3">
                        <div class="col-md-6">
                          <div class="felid">
                            <label class="h_16 gray-colour fw-semibold">Payment Method</label>
                            <p class="h_16 text-black fw-semibold">  {
                              orderdetails?.paymentMethod
                                ?.paymentmethod
                            }</p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="row justify-content-center">
                  <div class="col-md-12">
                    <div class="d-block d-md-flex justify-content-between mb-4 align-items-center">
                      <h3 class="pageTitle"> Products</h3>
                    </div>
                  </div>
                </div>

                <div class="row mb-3">
                  <div class="col-12">
                    <div class="maain-tabble table-responsive">
                      <table class="table table-bordered zero-configuration">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderdetails?.orderItems?.length > 0 &&
                            orderdetails?.orderItems?.map((ord) => (
                              <tr>
                                {/* <td
                                              className="product-sku"
                                              data-title="sku"
                                            >
                                              {ord?._id}
                                            </td> */}
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
                                {/* <td
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
                                                orderdetails?.taxperproduct /
                                                  100
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
                                                orderdetails?.taxperproduct /
                                                  100
                                              ) *
                                                Number(
                                                  ord?.price * ord?.qty
                                                ).toFixed(0) +
                                                ord?.price * ord?.qty}
                                            </td> */}
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div class="row justify-content-end">
                  <div class="col-3">
                    <ul class="productBoxTotal">
                      <li>
                        <p class="h_16 text-black fw-semibold">Sub Total</p>
                        <label class="h_16 gray-colour fw-semibold">$                                      {orderdetails?.totalPrice}
                        </label>
                      </li>
                      <li>
                        <p class="h_16 text-black fw-semibold">Sub Total</p>
                        <label class="h_16 gray-colour fw-semibold">$                                      {orderdetails?.totalPrice}
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>}

    </div>
  );
};

export default OrderDetails;
