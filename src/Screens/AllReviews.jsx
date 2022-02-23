import React from 'react'

const AllReviews = () => {
  return (
    <div><div className="app-content dashboard content">
    <div className="content-wrapper">
      <div className="content-body">
        {/* Basic form layout section start */}
        <section id="configuration" className="page-view-page">
          <div className="row">
            <div className="col-12">
              <div className="card rounded">
                <div className="card-body p-md-2 p-lg-3 p-xl-4">
                  <div className="page-title mb-0">
                    <div className="row">
                      <div className="col-12 col-md-6 col-lg-9">
                        <h1>All Reviews</h1>
                      </div>
                    </div>
                  </div>
                  <div className="product-summary">
                    <div id="reviews" className="reviews">
                      <div id="comments">
                        <ol className="commentlist p-0">
                          <li className="review">
                            <div className="row">
                              <div className="comment-text col-sm-1 mb-2">
                                <img className="rounded-circle" src="images/post-avatar.png" />
                              </div>
                              <div className="comment-text col-sm-9">
                                <h4 className="primary-text mb-0">Ben Döring</h4>
                                <small>Oct 27 - 8 Minutes read</small>
                                <p className="meta">
                                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                </p>
                                <div className="star-rating mt-1" role="img" aria-label="Rated 4.00 out of 5">
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star" />
                                  <i className="far fa-star" />
                                </div>
                              </div>
                              <div className="comment-dlt-btn col-sm-2 align-self-center mt-1 mt-sm-0 text-center">
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </li>
                          <li className="review">
                            <div className="row">
                              <div className="comment-text col-sm-1 mb-2">
                                <img className="rounded-circle" src="images/post-avatar.png" />
                              </div>
                              <div className="comment-text col-sm-9">
                                <h4 className="primary-text mb-0">Ben Döring</h4>
                                <small>Oct 27 - 8 Minutes read</small>
                                <p className="meta">
                                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                </p>
                                <div className="star-rating mt-1" role="img" aria-label="Rated 4.00 out of 5">
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star" />
                                  <i className="far fa-star" />
                                </div>
                              </div>
                              <div className="comment-dlt-btn col-sm-2 align-self-center mt-1 mt-sm-0 text-center">
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </li>
                          <li className="review">
                            <div className="row">
                              <div className="comment-text col-sm-1 mb-2">
                                <img className="rounded-circle" src="images/post-avatar.png" />
                              </div>
                              <div className="comment-text col-sm-9">
                                <h4 className="primary-text mb-0">Ben Döring</h4>
                                <small>Oct 27 - 8 Minutes read</small>
                                <p className="meta">
                                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet
                                </p>
                                <div className="star-rating mt-1" role="img" aria-label="Rated 4.00 out of 5">
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star rated" />
                                  <i className="fas fa-star" />
                                  <i className="far fa-star" />
                                </div>
                              </div>
                              <div className="comment-dlt-btn col-sm-2 align-self-center mt-1 mt-sm-0 text-center">
                                <button type="button" className="btn delet" data-toggle="modal" data-target=".delete-review">
                                  <i className="fa fa-trash-alt" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
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
  )
}

export default AllReviews