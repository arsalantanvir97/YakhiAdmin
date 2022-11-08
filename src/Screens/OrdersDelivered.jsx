import React from 'react'

const OrdersDelivered = () => {
  return (
    <div><div className="app-content dashboard content">
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
                        <h1><a href="orders.php"><i className="fa fa-angle-left" /></a>Order Details</h1>
                      </div>
                    </div>
                  </div>
                  <div className="order-block mb-1">
                    <div className="row ">
                      <div className="col-12">
                        <h3>Order &amp; Account</h3>
                      </div>
                      <div className="col-12">
                        <div className="card light-primary-bg">
                          <div className="card-header">
                            <h4>Order Information</h4>
                          </div>
                          <div className="card-body">
                            <div className="row">
                              <div className="col-12 mb-2">
                                <h4>Order Date</h4>
                                <p>mm/dd/yyyy</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h4>Order Status</h4>
                                <p> Delivered</p>
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
                                <p>Abc</p>
                              </div>
                            </div>
                            <div className="row">
                              <div className="col-12">
                                <h4>Email</h4>
                                <p>test@email.com</p>
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
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. .</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="order-block mb-1">
                    <div className="row ">
                      <h3 className="col-md-6 col-12">Payment and Shipping</h3>
                      <div className="col-md-6 col-12 align-self-end text-right">
                        <a href="orders-invoice.php" className="btn btn-primary">Print Invoice</a>
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
                                <p>Card</p>
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
                                <p>$10.00</p>
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
                                  <th className="product-color">Color</th>
                                  <th className="product-color">Size</th>
                                  <th className="product-quantity">Qty</th>
                                  <th className="product-price-per">Price per unit</th>
                                  <th className="product-price">Price </th>
                                  <th className="product-subtotal">Sub Total</th>
                                  <th className="product-tax">Tax Amount</th>
                                  <th className="product-tax-amount">Tax Percent</th>
                                  <th className="product-total">Total</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td className="product-sku" data-title="sku">1sdnk</td>
                                  <td className="product-name">Product abc</td>
                                  <td className="product-color" data-title="sku">Red</td>
                                  <td className="product-color" data-title="size">Large</td>
                                  <td className="product-quantity" data-title="quantity">1</td>
                                  <td className="product-price-per" data-title="sku">$00.00</td>
                                  <td className="product-price" data-title="sku">$00.00</td>
                                  <td className="product-subtotal" data-title="subtotal">$00.00</td>
                                  <td className="product-tax" data-title="tax">$20.00</td>
                                  <td className="product-tax-amount" data-title="tax-amount">$00.00</td>
                                  <td className="product-total" data-title="total">$00.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row info-block justify-content-end">
                    <div className="col-12 col-md-4 col-lg-3 d-flex justify-content-end">
                      <table cellSpacing={0} className="table total-table table-borderless mt-5">
                        <tbody>
                          <tr className="cart-subtotal">
                            <th>Sub Total</th>
                            <td data-title="Subtotal"><span className="amount"><span className="currencySymbol">$</span>44.00</span></td>
                          </tr>
                          <tr className="cart-subtotal">
                            <th>Shipping </th>
                            <td data-title="Subtotal"><span className="amount"><span className="currencySymbol">$</span>0.00</span></td>
                          </tr>
                          <tr className="order-total">
                            <th>Tax</th>
                            <td data-title="Total"><span className="amount"><span className="currencySymbol">$</span>$52.80</span> </td>
                          </tr>
                          <tr className="order-total light-primary-bg">
                            <th>Total</th>
                            <td data-title="Total"><span className="amount"><span className="currencySymbol">$</span>$52.80</span> </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div></section>
      </div>
    </div>
  </div>
  </div>
  )
}

export default OrdersDelivered