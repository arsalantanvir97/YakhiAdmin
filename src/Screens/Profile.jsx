import React from "react";

const Profile = () => {
  return (
    <div>
      <div className="app-content content  dashboard">
        <div className="content-wrapper">
          <div className="content-body">
            {/* Basic form layout section start */}
            <section id="configuration" className="my-profile">
              <div className="row">
                <div className="col-12">
                  <div className="card rounded">
                    <div className="card-body p-md-2 p-lg-3 p-xl-4">
                      <div className="page-title">
                        <div className="row">
                          <div className="col-12">
                            <h1>Profile</h1>
                          </div>
                        </div>
                      </div>
                      <div className="user-block">
                        <div className="row justify-content-center">
                          <div className="col-12 col-lg-10 col-md-8 col-xl-5 light-primary-bg text-center">
                            <div className="d-flex justify-content-center mb-3">
                              <div className="profile-img text-center">
                                <img
                                  src="images/avatar.png"
                                  className="img-fluid ml-0"
                                  alt=""
                                />
                                <div className="primary-text text-center mt-2">
                                  <a href="edit-profile.php" className>
                                    Edit Profile
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="row detail-row d-flex align-items-center justify-content-around px-5">
                              <div className="col-md-6 col-12 text-left mb-1 lablename">
                                <label htmlFor>First Name:</label>
                              </div>
                              <div className="col-md-6 col-12 text-left mb-1">
                                Mark
                              </div>
                              <div className="col-md-6 col-12 text-left mb-1 lablename">
                                <label htmlFor>Last Name:</label>
                              </div>
                              <div className="col-md-6 col-12 text-left mb-1">
                                Williams
                              </div>
                              <div className="col-md-6 col-12 text-left mb-1 lablename">
                                <label htmlFor>Email Address:</label>
                              </div>
                              <div className="col-md-6 col-12 text-left mb-1">
                                test@email.co
                              </div>
                            </div>
                            <div className="row detail-row d-flex align-items-center mb-1 pt-2">
                              <div className="col-12">
                                <a
                                  href="update-password.php"
                                  className="btn btn-primary"
                                >
                                  Change Password
                                </a>
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

export default Profile;
