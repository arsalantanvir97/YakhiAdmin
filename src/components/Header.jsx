import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { baseURL, imageURL } from "../utils/api";
import moment from "moment";
import { adminInfo } from "../Recoil";
import { useRecoilState } from "recoil";
import { closeModals } from "../utils/closeModals";

export default function Header(props) {
  const history = useHistory()
  const [adminData, setadminData] = useRecoilState(adminInfo);
  const logOutHandler = () => {
    setadminData(null)
    closeModals()
    localStorage.removeItem("token");
    history.replace("/");
  }
  return (
    <>
      <div>
        <nav className="header-navbar navbar-expand-md navbar navbar-with-menu fixed-top navbar-light navbar-border">
          <div className="navbar-wrapper">
            <div className="navbar-header">
              <ul className="nav navbar-nav flex-row">
                <li className="nav-item mobile-menu d-md-none mr-auto">   <Link
                  to="/Dashboard" className="nav-link nav-menu-main menu-toggle hidden-xs is-active" ><i className="ft-menu font-large-1" /></Link>
                </li>
                <li className="nav-item"> <Link to="/Dashboard" className="navbar-brand" > <img className="brand-logo img-fluid" alt="stack admin logo" src="images/loginLogo.png" /> </Link> </li>
                <li className="nav-item d-md-none"> <Link to='#' className="nav-link open-navbar-container" data-bs-toggle="collapse" data-bs-target="#navbar-mobile"><i className="fa fa-ellipsis-v" /></Link> </li>
              </ul>
            </div>
            <div className="navbar-container content">
              <div className="collapse navbar-collapse" id="navbar-mobile">
                <ul className="nav navbar-nav me-auto float-start">
                </ul>
                <ul className="nav navbar-nav float-end nav-right align-items-center">
                  {/* <li class="dropdown dropdown-notification nav-item">
							<a class="nav-link nav-link-label" href="#" data-bs-toggle="dropdown">
							<i class="fas fa-comment-dots"></i>
								<span class="badge badge-pill badge-default badge-accent badge-default badge-up">4</span>
							</a>
							<ul class="dropdown-menu dropdown-menu-media dropdown-menu-right notificationDiv">
								<li class="scrollable-container media-list ps-container ps-theme-dark ps-active-y" data-ps-id="a385dd14-315a-f80c-bd87-398bda7b376e">
									<a href="notifications.php">
										<div class="media">
											<div class="media-left">
												<div class="noti-img">
													<img src="images/userImage.png" alt="" class="img-fluid">
												</div>
											</div>
											<div class="media-body">
												<h6 class="media-heading">You have new notification!</h6>
												<p class="notification-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar sic tempor. </p>
												<div class="notificationBelowInfo">
													<small>
														<time class="media-meta" datetime="2015-06-11T18:29:20+08:00">5 secs ago</time>
													</small>
												</div>
											</div>

										</div>
									</a>

									<div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 3px;">
										<div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div>
									</div>
									<div class="ps-scrollbar-y-rail" style="top: 0px; height: 255px; right: 0px;">
										<div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 132px;"></div>
									</div>
								</li>
								<li class="dropdown-menu-footer"><a class="dropdown-item notification text-right text-underline" href="notifications.php">View All</a></li>
							</ul>
						</li> */}
                  <li className="dropdown dropdown-notification nav-item">
                    <Link to='/Notification' className="nav-link nav-link-label" data-bs-toggle="dropdown" aria-expanded="true">
                      <i onClick={() => {
                        history?.push('/Notification')
                      }} className="fal fa-bell" /> <span className="badge badge-pill badge-default badge-danger badge-default badge-up"></span> </Link>

                  </li>
                  <li className="dropdown dropdown-user nav-item">
                    <a className="dropdown-toggle nav-link dropdown-user-link" href="#" data-bs-toggle="dropdown">
                      <span className="avatar avatar-online"> <img src={
                        adminData?.userImage &&
                          adminData?.userImage !== null
                          ? `${imageURL}${adminData?.userImage}`
                          : "images/profile-avatar.png"
                      } alt="avatar" /> </span>
                      <div className="user-details">
                        <div className="userName">                        {adminData?.firstName + " " + adminData?.lastName}
                        </div>
                        {/* <div class="userRole">Admin</div> */}
                      </div>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right">
                      <Link to="/EditProfile" className="dropdown-item" ><i className="fa fa-user" />My Profile</Link>
                      <a className="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target=".logout"><i className="fa fa-power-off" />Logout</a>
                    </div>
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
                    <button
                      type="button"
                      onClick={logOutHandler}
                      className="btn btn-secondary mr-1"
                    >
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
      <div className="default-modal modal fade logout" tabIndex={-1} aria-labelledby="exampleModalCenterTitle" style={{ display: 'none' }} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content p-0">
            <div className="head-green">
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <i aria-hidden="true" className="fa fa-times" />
              </button>
              <img src="images/logout_icon.png" />
            </div>
            <div className="modal-body py-0 row">
              <div className="col-md-12 py-4 text-center">
                <p className="mb-0">Are You Sure You Want To Logout Of Your Account?</p>
              </div>
              <div className="col-md-12 button text-center mb-5">
                <Link to='#'                       onClick={logOutHandler}
  data-bs-toggle="modal" data-bs-target=".logout2" className="btn_darkbluep mt-0 d-inline-block px-5 me-1">Yes</Link>
                <Link to='#' className="btn_orangebor mt-0 d-inline-block px-5 ml-1">No</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
