import React from "react";

const ProductView = () => {
  return (
    <div>
      <div className="app-content dashboard content">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="page-view-page">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title mb-3">
                        <div className="row">
                          <div className="col-12 col-md-6 col-lg-9">
                            <h1>Product Details</h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-3 text-right">
                            <a
                              href="product-edit.php"
                              className="btn btn-primary"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="product-gallery">
                        <div className="row">
                          <div className="col-12 col-xl-6">
                            <div className="product-preview text-center">
                              <img
                                src="images/product-preview.png"
                                alt=""
                                className="h-100"
                              />
                            </div>
                            <div className="d-flex mt-2">
                              <div className="preview-thumbs text-center">
                                <img
                                  src="images/product-thumb-1.png"
                                  alt=""
                                  className="h-100"
                                />
                              </div>
                              <div className="preview-thumbs text-center">
                                <img
                                  src="images/product-thumb-2.png"
                                  alt=""
                                  className="h-100"
                                />
                              </div>
                              <div className="preview-thumbs text-center">
                                <img
                                  src="images/product-thumb-3.png"
                                  alt=""
                                  className="h-100"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-12 col-xl-6 pt-2">
                            <h3 className="product-title mb-1">
                              ABC Product Name
                            </h3>
                            <div className="product-rating mb-1">
                              <div
                                className="star-rating"
                                role="img"
                                aria-label="Rated 4.00 out of 5"
                              >
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star" />
                                <i className="fas fa-star" />
                              </div>
                            </div>
                            <div className="product-meta">
                              <span className="status-wrapper">
                                Status: <span className="status">Active</span>
                              </span>
                              <span className="price">
                                Price per unit:{" "}
                                <span className="price-amount amount">
                                  <span className="price-currencySymbol">
                                    $
                                  </span>
                                  100.00
                                </span>
                              </span>
                            </div>
                            <div className="product-meta mt-3">
                              <span className="posted-in">
                                Category:{" "}
                                <a href="#" rel="tag">
                                  ABC
                                </a>
                              </span>
                              <span className="sku-wrapper">
                                SKU # <span className="sku">123</span>
                              </span>
                              <span className="product-variations">
                                <select className="js-example-placeholder-single form-control">
                                  <option>Select Quality Range</option>
                                  <option>Base Range</option>
                                  <option>Range A - 10</option>
                                  <option>Range B - 20</option>
                                </select>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="product-summary">
                        <div className="description">
                          <div className="row">
                            <div className="col-12 ">
                              <h3>Product Specification</h3>
                              <p>
                                Lorem ipsum dolor sit amet, consetetur
                                sadipscing elitr, sed diam nonumy eirmod tempor
                                invidunt ut labore et dolore magna aliquyam
                                erat, sed diam voluptua. At vero eos et accusam
                                et justo duo dolores et ea rebum. Stet clita
                                kasd gubergren, no sea takimata sanctus est
                                Lorem ipsum dolor sit amet. Lorem ipsum dolor
                                sit amet, consetetur sadipscing elitr, sed diam
                                nonumy eirmod tempor invidunt ut labore et
                                dolore magna aliquyam erat, sed diam voluptua.
                                At vero eos et accusam et justo duo dolores et
                                ea rebum. Stet clita kasd gubergren, no sea
                                takimata sanctus est Lorem ipsum dolor sit amet.
                              </p>
                              {/* <ul>
                                                <li>15 Amp</li>
                                                <li>12 Volt</li>
                                                <li>N/E LA3 Charging</li>
                                                <li>18-20 Ah Battery Type : Standard ACID & AGM</li>
                                                <li>Solid Metal Housing</li>
                                                <li>Standard Lead Acid</li>
                                                <li>Ammeter Included</li>
                                            </ul> */}
                            </div>
                          </div>
                        </div>
                        {/* <div class="additional-information">
                                    <div class="row">
                                        <div class="col-12 product-attributes">
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <th>Size:</th>
                                                        <td>L, XL. S</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Colors:</th>
                                                        <td>
                                                            <p>Red, Orange, Yellow, Green, Blue</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div> */}
                        <div className="rating-wrapper">
                          <div className="row d-flex review-ratings">
                            <div className="col-12 col-lg-4 col-xl-5">
                              <h3>Reviews</h3>
                              <h4 className="primary-text mt-2">4.5 Star</h4>
                              <div
                                className="star-rating mt-1 mb-1"
                                role="img"
                                aria-label="Rated 4.00 out of 5"
                              >
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star rated" />
                                <i className="fas fa-star" />
                                <i className="far fa-star" />
                                <div className="reviews-count">
                                  4.5 Ratings &amp; 2 Reviews
                                </div>
                              </div>
                            </div>
                            <div className="col-12 col-lg-8 col-xl-7 mt-2">
                              <div className="counter-container flex-row d-flex flex-md-row flex-column">
                                <a
                                  href="#"
                                  title
                                  className="d-flex flex-md-row flex-column"
                                >
                                  <span className="counter-label">5 stars</span>
                                  <span className="counter-back">
                                    <span
                                      className="counter-bar"
                                      style={{ width: "50%" }}
                                    />
                                  </span>
                                </a>
                                <span className="counter-count">50%</span>
                              </div>
                              <div className="counter-container flex-row d-flex flex-md-row flex-column">
                                <a
                                  href="#"
                                  title
                                  className="d-flex flex-md-row flex-column"
                                >
                                  <span className="counter-label">4 stars</span>
                                  <span className="counter-back">
                                    <span
                                      className="counter-bar"
                                      style={{ width: "40%" }}
                                    />
                                  </span>
                                </a>
                                <span className="counter-count">40%</span>
                              </div>
                              <div className="counter-container flex-row d-flex flex-md-row flex-column">
                                <a
                                  href="#"
                                  className="d-flex flex-md-row flex-column"
                                  title="Click to see reviews that provided a rating of 3 stars"
                                >
                                  <span className="counter-label">3 stars</span>
                                  <span className="counter-back">
                                    <span className="counter-bar" />
                                  </span>
                                </a>
                                <span className="counter-count">0%</span>
                              </div>
                              <div className="counter-container flex-row d-flex flex-md-row flex-column">
                                <a
                                  href="#"
                                  title
                                  className="d-flex flex-md-row flex-column"
                                >
                                  <span className="counter-label">2 stars</span>
                                  <span className="counter-back">
                                    <span className="counter-bar" />
                                  </span>
                                </a>
                                <span className="counter-count">0%</span>
                              </div>
                              <div className="counter-container flex-row d-flex flex-md-row flex-column">
                                <a
                                  href="#"
                                  title
                                  className="d-flex flex-md-row flex-column"
                                >
                                  <span className="counter-label">1 star</span>
                                  <span className="counter-back">
                                    <span className="counter-bar" />
                                  </span>
                                </a>
                                <span className="counter-count">0%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="reviews" className="reviews">
                          <div id="comments">
                            <ol className="commentlist p-0">
                              <li className="review">
                                <div className="row">
                                  <div className="comment-text col-sm-1">
                                    <img
                                      className="rounded-circle"
                                      src="images/post-avatar.png"
                                    />
                                  </div>
                                  <div className="comment-text col-sm-9">
                                    <h4 className="primary-text mb-0">
                                      Ben Döring
                                    </h4>
                                    <small>Oct 27 - 8 Minutes read</small>
                                    <p className="meta">
                                      Lorem ipsum dolor sit amet, consetetur
                                      sadipscing elitr, sed diam nonumy eirmod
                                      tempor invidunt ut labore et dolore magna
                                      aliquyam erat, sed diam voluptua. At vero
                                      eos et accusam et justo duo dolores et ea
                                      rebum. Stet clita kasd gubergren, no sea
                                      takimata sanctus est Lorem ipsum dolor sit
                                      amet. Lorem ipsum dolor sit amet
                                    </p>
                                    <div
                                      className="star-rating mt-1"
                                      role="img"
                                      aria-label="Rated 4.00 out of 5"
                                    >
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star" />
                                      <i className="far fa-star" />
                                    </div>
                                  </div>
                                  <div className="comment-dlt-btn col-sm-2 align-self-center mt-1 mt-sm-0 text-center">
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </li>
                              <li className="review">
                                <div className="row">
                                  <div className="comment-text col-sm-1">
                                    <img
                                      className="rounded-circle"
                                      src="images/post-avatar.png"
                                    />
                                  </div>
                                  <div className="comment-text col-sm-9">
                                    <h4 className="primary-text mb-0">
                                      Ben Döring
                                    </h4>
                                    <small>Oct 27 - 8 Minutes read</small>
                                    <p className="meta">
                                      Lorem ipsum dolor sit amet, consetetur
                                      sadipscing elitr, sed diam nonumy eirmod
                                      tempor invidunt ut labore et dolore magna
                                      aliquyam erat, sed diam voluptua. At vero
                                      eos et accusam et justo duo dolores et ea
                                      rebum. Stet clita kasd gubergren, no sea
                                      takimata sanctus est Lorem ipsum dolor sit
                                      amet. Lorem ipsum dolor sit amet
                                    </p>
                                    <div
                                      className="star-rating mt-1"
                                      role="img"
                                      aria-label="Rated 4.00 out of 5"
                                    >
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star rated" />
                                      <i className="fas fa-star" />
                                      <i className="far fa-star" />
                                    </div>
                                  </div>
                                  <div className="comment-dlt-btn col-sm-2 align-self-center mt-1 mt-sm-0 text-center">
                                    <button
                                      type="button"
                                      className="btn delet"
                                      data-toggle="modal"
                                      data-target=".delete-review"
                                    >
                                      <i
                                        className="fa fa-trash-alt"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                              </li>
                              <li className="all-reviews text-right">
                                <a href="all-reviews.php">View all Reviews</a>
                              </li>
                            </ol>
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

export default ProductView;
