import React from "react";

const ViewCategory = () => {
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
                          <div className="col-12 col-md-6 col-lg-6">
                            <h1>
                              <a href="categories.php">
                                <i className="fa fa-angle-left" />
                              </a>
                              Veiw Category
                            </h1>
                          </div>
                          <div className="col-12 col-sm-6 col-lg-6 text-right">
                            <a
                              href="edit-category.php"
                              className="btn btn-primary"
                            >
                              Edit
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label>Category Title</label>
                          </div>
                          <div className="col-12"> Title ABC</div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label>
                              Visible In Menu{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-12">Enter New Password</div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>
                              Position <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-12">1</div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>Number of products</label>
                          </div>
                          <div className="col-12">12</div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>
                              Visible In Menu{" "}
                              <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-12">Enter New Password</div>
                        </div>
                        <div className="row detail-row  mb-1">
                          <div className="col-12 col-md-5">
                            <h4>Description and Images</h4>
                          </div>
                        </div>
                        <div className="row detail-row">
                          <div className="col-12 lablename">
                            <label htmlFor>
                              Description <span className="text-danger">*</span>
                            </label>
                          </div>
                          <div className="col-12 col-md-5">
                            <p>
                              Lorem Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsum
                              Dolor Lorem Ipsum Dolor Lorem Ipsum Dolo Lorem
                              Ipsum Dolor Lorem Ipsum Dolor Lorem Ipsu
                            </p>
                          </div>
                        </div>
                        <div className="row detail-row ">
                          <div className="col-12 col-md-12 col-xl-12">
                            <div className="rounded-10 preview-thumbs d-inline-block">
                              <div className="download-thumb  d-inline-block position-relative mr-2">
                                <label htmlFor="picture" className="d-block">
                                  <img
                                    src="images/jacket-product.png"
                                    alt=""
                                    className="img-fluid"
                                  />
                                </label>
                              </div>
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

export default ViewCategory;
