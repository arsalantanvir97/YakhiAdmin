import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/adminActions";
import { imageURL } from "../utils/api";
import moment from "moment";
import { markReadAllNotif } from "../actions/notifAction";

export default function Header(props) {
  const dispatch = useDispatch();
  const adminLogin = useSelector((state) => state.adminLogin);
  const { adminInfo } = adminLogin;
  const Notif = useSelector((state) => state.Notif);
  const { notifcationdata } = Notif;
  const logOutHandler = async () => {
    dispatch(logout());
  };
  useEffect(() => {
    console.log("notifcationdata", notifcationdata);
  }, [notifcationdata]);

  useEffect(() => {
    console.log("props", props);
  }, [props]);
  return (
    <>
      <div>
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
          <div className="navbar-wrapper">
            <div className="navbar-header">
              <ul className="nav navbar-nav flex-row">
                <li className="nav-item mobile-menu d-md-none mr-auto">
                  <Link
                    to="/Dashboard"
                    className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                  >
                    <i className="ft-menu font-large-1" />
                  </Link>
                </li>
                <li className="nav-item">
                  {" "}
                  <Link to="/Dashboard" className="navbar-brand">
                    {" "}
                    <img
                      className="brand-logo img-fluid"
                      alt="stack admin logo"
                      src="images/logo.png"
                    />{" "}
                  </Link>{" "}
                </li>
                <li className="nav-item d-md-none">
                  {" "}
                  <a
                    className="nav-link open-navbar-container"
                    data-toggle="collapse"
                    data-target="#navbar-mobile"
                  >
                    <i className="fa fa-ellipsis-v" />
                  </a>{" "}
                </li>
              </ul>
            </div>
            <div className="navbar-container content">
              <div className="collapse navbar-collapse" id="navbar-mobile">
                <ul className="nav navbar-nav mr-auto float-left"></ul>
                <ul className="nav navbar-nav float-right">
                  <li className="dropdown dropdown-notification nav-item">
                    <a
                      className="nav-link nav-link-label"
                      href="#"
                      data-toggle="dropdown"
                      aria-expanded="true"
                    >
                      <i className="fa fa-bell" />{" "}
                      <span className="badge badge-pill badge-default badge-danger badge-default badge-up">
                        5
                      </span>{" "}
                    </a>
                    <ul className="dropdown-menu dropdown-menu-media dropdown-menu-right">
                      <li className="dropdown-menu-header">
                        <h6 className="dropdown-header m-0 d-flex justify-content-between align-items-center">
                          {" "}
                          <span className="grey darken-2">
                            Notifications
                          </span>{" "}
                          <a
                            href="notifications.php"
                            className="primary-text float-right m-0"
                          >
                            View all
                          </a>{" "}
                        </h6>
                      </li>
                      <li
                        className="scrollable-container media-list ps-container ps-theme-dark"
                        data-ps-id="d5fef0e9-91e2-3ba9-4f25-864856e1fad0"
                      >
                        <a href="javascript:void(0)">
                          <div className="media pb-0">
                            <div className="media-left align-self-start">
                              <i className="fa fa-bell" />
                            </div>
                            <div className="media-body">
                              <p className="media-heading">
                                Lorem ipsum dolor sit amet, consectetur elit.
                                Aenean{" "}
                              </p>
                            </div>
                            <small>
                              <time
                                className="media-meta primary-text"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                2 hrs ago{" "}
                              </time>
                            </small>
                          </div>
                        </a>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </li>
                      <li
                        className="scrollable-container media-list ps-container ps-theme-dark"
                        data-ps-id="f275f0ff-02bc-e216-c752-9111c88db0f0"
                      >
                        <a href="javascript:void(0)">
                          <div className="media pb-0">
                            <div className="media-left align-self-start">
                              <i className="fa fa-bell" />
                            </div>
                            <div className="media-body">
                              <p className="media-heading">
                                Lorem ipsum dolor sit amet, consectetur elit.
                                Aenean{" "}
                              </p>
                            </div>
                            <small>
                              <time
                                className="media-meta primary-text"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                2 hrs ago{" "}
                              </time>
                            </small>
                          </div>
                        </a>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </li>
                      <li
                        className="scrollable-container media-list ps-container ps-theme-dark"
                        data-ps-id="d68fd9ec-0a27-eddb-e630-4df4c2ab5f64"
                      >
                        <a href="javascript:void(0)">
                          <div className="media pb-0">
                            <div className="media-left align-self-start">
                              <i className="fa fa-bell" />
                            </div>
                            <div className="media-body">
                              <p className="media-heading">
                                Lorem ipsum dolor sit amet, consectetur elit.
                                Aenean{" "}
                              </p>
                            </div>
                            <small>
                              <time
                                className="media-meta primary-text"
                                dateTime="2015-06-11T18:29:20+08:00"
                              >
                                2 hrs ago{" "}
                              </time>
                            </small>
                          </div>
                        </a>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-x-rail"
                          style={{ left: "0px", bottom: "3px" }}
                        >
                          <div
                            className="ps-scrollbar-x"
                            tabIndex={0}
                            style={{ left: "0px", width: "0px" }}
                          />
                        </div>
                        <div
                          className="ps-scrollbar-y-rail"
                          style={{ top: "0px", right: "0px" }}
                        >
                          <div
                            className="ps-scrollbar-y"
                            tabIndex={0}
                            style={{ top: "0px", height: "0px" }}
                          />
                        </div>
                      </li>
                    </ul>
                  </li>
                  <li className="dropdown dropdown-user nav-item">
                    <a
                      className="dropdown-toggle nav-link dropdown-user-link"
                      href="#"
                      data-toggle="dropdown"
                    >
                      <span className="avatar avatar-online">
                        {" "}
                        <img
                          src={
                            adminInfo?.userImage &&
                            adminInfo?.userImage !== null
                              ? `${imageURL}${adminInfo?.userImage}`
                              : "images/avatar.jpg"
                          }
                          alt="avatar"
                        />{" "}
                      </span>
                      <span className="user-name">
                        {adminInfo?.firstName + " " + adminInfo?.lastName}
                      </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link to="/EditProfile" className="dropdown-item">
                        <i className="fa fa-user" />
                        My Profile
                      </Link>
                      <a
                        className="dropdown-item"
                        data-toggle="modal"
                        data-target=".profile-logout"
                      >
                        <i className="fa fa-sign-out-alt" />
                        LogOut
                      </a>
                    </div>
                  </li>
                  <li className="nav-item d-none d-md-block">
                    <a
                      className="nav-link nav-menu-main menu-toggle hidden-xs is-active"
                      href="#"
                    >
                      <i className="ft-menu" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </div>
      <div
        className="modal fade profile-logout p-0"
        tabIndex
        role
        aria-labelledby
        data-backdrop="static"
        style={{ display: "none" }}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel" />
              <button
                type="button"
                className="btn close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row">
                  <div className="col-12 text-center">
                    <i className="fa fa-question red" />
                    <h3>Are you sure you want to logout?</h3>
                    <button type="button" onClick={logOutHandler} className="btn btn-secondary mr-1">
                      yes
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary ml-1"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      No
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
