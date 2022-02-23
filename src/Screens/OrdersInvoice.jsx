import React from "react";

const OrdersInvoice = () => {
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
                              <a href="orders.php">
                                <i className="fa fa-angle-left" />
                              </a>
                              Invoice
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="order-block order-product-block mb-3">
                        <div className="row ">
                          <div className="col-12 col-sm-6">
                            <h3 className="text-capitalize">Order #001</h3>
                          </div>
                          <div className="col-12 col-sm-6 text-right">
                            <h3 className="post-date">
                              Placed on: mm/dd/yy 00:00:00
                            </h3>
                          </div>
                          <div className="col-12">
                            <div className="media d-sm-flex d-block align-items-center mb-2">
                              <div className="media-left">
                                <div className="rounded-10 preview-thumbs d-inline-block">
                                  <div className="download-thumb  d-inline-block position-relative mr-2">
                                    <label
                                      htmlFor="picture"
                                      className="d-block"
                                    >
                                      <img
                                        src="images/gloves-product.png"
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="media-body">
                                <h3>ABC Product</h3>
                                <ul>
                                  <li>
                                    <label>Cost:</label> $ 00
                                  </li>
                                  <li>
                                    <label>Cost per Unit:</label> $ 00
                                  </li>
                                  <li>
                                    <label>Qty:</label> 1
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="media d-sm-flex d-block align-items-center">
                              <div className="media-left">
                                <div className="rounded-10 preview-thumbs d-inline-block">
                                  <div className="download-thumb  d-inline-block position-relative mr-2">
                                    <label
                                      htmlFor="picture"
                                      className="d-block"
                                    >
                                      <img
                                        src="images/gloves-product.png"
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="media-body">
                                <h3>ABC Product</h3>
                                <ul>
                                  <li>
                                    <label>Cost:</label> $ 00
                                  </li>
                                  <li>
                                    <label>Cost per Unit:</label> $ 00
                                  </li>
                                  <li>
                                    <label>Qty:</label> 1
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="order-block mb-1">
                        <div className="row ">
                          <div className="col-12">
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Shipping Address</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 col-md-6 col-xl-4">
                                    <ul className="address-field">
                                      <li>Rikkard Ambrose</li>
                                      <li>ABC Street</li>
                                      <li>Zip Code</li>
                                      <li>Country</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="card light-primary-bg">
                              <div className="card-header">
                                <h4>Shipping Address</h4>
                              </div>
                              <div className="card-body">
                                <div className="row">
                                  <div className="col-12 col-md-6 col-xl-4">
                                    <ul className="address-field">
                                      <li>Rikkard Ambrose</li>
                                      <li>ABC Street</li>
                                      <li>Zip Code</li>
                                      <li>Country</li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row info-block ">
                        <div className="col-12 col-md-4 col-lg-3 light-primary-bg">
                          <table
                            cellSpacing={0}
                            className="table total-table table-borderless"
                          >
                            <tbody>
                              <tr>
                                <th colSpan={2} className="text-center header">
                                  <h3>Total Summary</h3>
                                </th>
                              </tr>
                              <tr className="cart-subtotal">
                                <th>Sub Total</th>
                                <td data-title="Subtotal">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    44.00
                                  </span>
                                </td>
                              </tr>
                              <tr className="cart-subtotal">
                                <th>Shipping </th>
                                <td data-title="Subtotal">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    0.00
                                  </span>
                                </td>
                              </tr>
                              <tr className="order-total">
                                <th>Tax</th>
                                <td data-title="Total">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    $52.80
                                  </span>{" "}
                                </td>
                              </tr>
                              <tr className="order-total">
                                <th>Total</th>
                                <td data-title="Total">
                                  <span className="amount">
                                    <span className="currencySymbol">$</span>
                                    $52.80
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

export default OrdersInvoice;
