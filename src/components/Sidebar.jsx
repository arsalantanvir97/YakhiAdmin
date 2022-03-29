import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [openusersidebar, setopenusersidebar] = useState(false);

  return (
    <div>
      <div
        className="main-menu menu-fixed menu-light menu-accordion"
        data-scroll-to-active="true"
      >
        <div
          className="main-menu-content ps-container ps-theme-dark"
          data-ps-id="bca5ebf7-643e-66d8-896f-f18522fbf1eb"
        >
          <ul
            className="navigation navigation-main"
            id="main-menu-navigation"
            data-menu="menu-navigation"
          >
            <li
              className={
                props?.match?.path == "/Dashboard"
                  ? "nav-item active "
                  : "nav-item"
              }
              style={{}}
            >
              <Link to="/Dashboard">
                <i className="fa fa-chart-area" />
                <span className="menu-title" data-i18n>
                  Dashboard
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Products" ||
                props?.match?.path == "/Categories"
                  ? "nav-item has-sub active open"
                  : `nav-item has-sub ${openusersidebar && "open"}`
              }
            >
              <Link
                to="#"
                onClick={() => {
                  setopenusersidebar(!openusersidebar);
                }}
              >
                <i className="fa fa-box" />
                <span className="menu-title" data-i18n>
                  Products
                </span>
              </Link>
              <ul className="menu-content" style={{}}>
                <li className>
                  <Link className="menu-item" to="/Products">
                    Catalog
                  </Link>
                </li>
                <li className>
                  <Link className="menu-item" to="/GeoGenetics">
                  Geo'Genetics
                  </Link>
                </li>
                <li className>
                  <Link className="menu-item" to="/Categories">
                    Categories
                  </Link>
                </li>
              </ul>
            </li>
            <li className={
                props?.match?.path == "/Orders"
                  ? "nav-item active "
                  : "nav-item"
              }>
              <Link to="/Orders">
                <i className="fa">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.938"
                    height="16.318"
                    viewBox="0 0 12.938 16.318"
                  >
                    <g
                      id="shopping-bag_1_"
                      data-name="shopping-bag (1)"
                      transform="translate(-53.023)"
                    >
                      <g
                        id="Group_44"
                        data-name="Group 44"
                        transform="translate(53.023 3.219)"
                      >
                        <g id="Group_43" data-name="Group 43">
                          <path
                            id="Path_99"
                            data-name="Path 99"
                            d="M65.954,111.242l-.729-9.182A1.147,1.147,0,0,0,64.086,101H62.647v2.133a.478.478,0,0,1-.956,0V101h-4.4v2.133a.478.478,0,0,1-.956,0V101H54.9a1.147,1.147,0,0,0-1.139,1.054l-.729,9.185a2.657,2.657,0,0,0,2.649,2.86h7.625a2.657,2.657,0,0,0,2.649-2.862Zm-4.308-4.676-2.472,2.472a.478.478,0,0,1-.676,0L57.34,107.88a.478.478,0,0,1,.676-.676l.821.82,2.134-2.134a.478.478,0,1,1,.676.676Z"
                            transform="translate(-53.023 -101.005)"
                            fill="#666"
                          />
                        </g>
                      </g>
                      <g
                        id="Group_46"
                        data-name="Group 46"
                        transform="translate(56.339)"
                      >
                        <g id="Group_45" data-name="Group 45">
                          <path
                            id="Path_100"
                            data-name="Path 100"
                            d="M160.193,0a3.158,3.158,0,0,0-3.154,3.154v.065h.956V3.154a2.2,2.2,0,1,1,4.4,0v.065h.956V3.154A3.158,3.158,0,0,0,160.193,0Z"
                            transform="translate(-157.039)"
                            fill="#666"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  Orders
                </span>
              </Link>
            </li>
            <li  className={
                props?.match?.path == "/Users"
                  ? "nav-item active "
                  : "nav-item"
              }>
              <Link to="/Users">
                <i className="fa fa-user" />
                <span className="menu-title" data-i18n>
                  Users
                </span>
              </Link>
            </li>
            <li  className={
                props?.match?.path == "/Appointments"
                  ? "nav-item active "
                  : "nav-item"
              }>
              <Link to="/Appointments">
                <i className="fa fa-calendar" />
                <span className="menu-title" data-i18n>
                Appointments
                </span>
              </Link>
            </li>
            <li className={
                props?.match?.path == "/Feedback"
                  ? "nav-item active "
                  : "nav-item"
              }>
              <Link to='/Feedback'>
                <i className="fa">
                  <svg
                    id="feedback_1_"
                    data-name="feedback (1)"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.478"
                    height="16.478"
                    viewBox="0 0 10.478 10.478"
                  >
                    <path
                      id="Path_106"
                      data-name="Path 106"
                      d="M138.077,179.879c0,.008,0,.015,0,.023a4.464,4.464,0,0,1-4.6,4.3h-1.306a3.973,3.973,0,0,0,3.762,2.476h3.7a.307.307,0,0,0,.209-.532l-.84-.779a3.542,3.542,0,0,0,.938-2.393A3.644,3.644,0,0,0,138.077,179.879Z"
                      transform="translate(-129.463 -176.198)"
                      fill="#fff"
                    />
                    <path
                      id="Path_107"
                      data-name="Path 107"
                      d="M.1,6.855a.307.307,0,0,0,.209.532h3.7A3.851,3.851,0,0,0,8,3.7,3.867,3.867,0,0,0,4.011,0,3.886,3.886,0,0,0,0,3.7,3.491,3.491,0,0,0,.938,6.077ZM2.169,1.862H5.853a.307.307,0,1,1,0,.614H2.169a.307.307,0,0,1,0-.614Zm0,1.228H5.853a.307.307,0,1,1,0,.614H2.169a.307.307,0,1,1,0-.614Zm0,1.228H5.853a.307.307,0,1,1,0,.614H2.169a.307.307,0,1,1,0-.614Z"
                      fill="#fff"
                    />
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  Feedback
                </span>
              </Link>
            </li>
            <li className={
                props?.match?.path == "/Taxes"
                  ? "nav-item active "
                  : "nav-item"
              }>
              <Link to="/Taxes">
                <i className="fa">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16.477"
                    height="16.477"
                    viewBox="0 0 10.477 10.477"
                  >
                    <g id="tax" transform="translate(-0.002 -0.001)">
                      <path
                        id="Path_108"
                        data-name="Path 108"
                        d="M343,11.626h1.785c-.323-.324-1.431-1.431-1.785-1.784Z"
                        transform="translate(-335.981 -9.64)"
                        fill="#fff"
                      />
                      <path
                        id="Path_109"
                        data-name="Path 109"
                        d="M10.172,223.005H.309a.307.307,0,0,0-.307.307v3.356a.307.307,0,0,0,.307.307h9.863a.307.307,0,0,0,.307-.307v-3.356A.307.307,0,0,0,10.172,223.005ZM3.44,224.151H2.928v1.985a.307.307,0,0,1-.614,0v-1.985H1.8a.307.307,0,0,1,0-.614H3.44a.307.307,0,0,1,0,.614Zm2.809,2.272a.307.307,0,0,1-.4-.179l-.11-.292H4.738l-.111.293a.307.307,0,1,1-.574-.217l.858-2.267a.36.36,0,0,1,.669.008l.848,2.259a.307.307,0,0,1-.179.4Zm2.43.02a.307.307,0,0,1-.25-.129l-.569-.8-.569.8a.307.307,0,1,1-.5-.357l.691-.968-.691-.968a.307.307,0,1,1,.5-.357l.569.8.569-.8a.307.307,0,1,1,.5.357l-.691.968.691.968A.307.307,0,0,1,8.679,226.443Z"
                        transform="translate(0 -218.441)"
                        fill="#fff"
                      />
                      <path
                        id="Path_110"
                        data-name="Path 110"
                        d="M73,447.721a.615.615,0,0,0,.614.614h6.262a.615.615,0,0,0,.614-.614v-.716H73Z"
                        transform="translate(-71.506 -437.857)"
                        fill="#fff"
                      />
                      <path
                        id="Path_111"
                        data-name="Path 111"
                        d="M80.492,2.6H78.22a.307.307,0,0,1-.307-.307V0h-4.3A.632.632,0,0,0,73,.635V3.95h7.49Zm-4.4.655H74.619a.307.307,0,0,1,0-.614h1.473a.307.307,0,1,1,0,.614Zm0-1.31H74.619a.307.307,0,0,1,0-.614h1.473a.307.307,0,1,1,0,.614Z"
                        transform="translate(-71.506 0)"
                        fill="#fff"
                      />
                      <path
                        id="Path_112"
                        data-name="Path 112"
                        d="M242.791,302.517h.543l-.271-.72Z"
                        transform="translate(-237.821 -295.62)"
                        fill="#fff"
                      />
                    </g>
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  Taxes
                </span>
              </Link>
            </li>
          </ul>
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
            style={{ top: "0px", right: "3px" }}
          >
            <div
              className="ps-scrollbar-y"
              tabIndex={0}
              style={{ top: "0px", height: "0px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
