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
            <li
              className={
                props?.match?.path == "/Orders"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
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
            <li
              className={
                props?.match?.path == "/GeoGeneticsOrders"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/GeoGeneticsOrders">
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
                  Geo'Genetics Orders
                </span>
              </Link>
            </li>

            <li
              className={
                props?.match?.path == "/Users" ? "nav-item active " : "nav-item"
              }
            >
              <Link to="/Users">
                <i className="fa fa-user" />
                <span className="menu-title" data-i18n>
                  Users
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Appointments"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Appointments">
                <i className="fa fa-calendar" />
                <span className="menu-title" data-i18n>
                  Appointments
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Feedback"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Feedback">
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
            <li
              className={
                props?.match?.path == "/Taxes" ? "nav-item active " : "nav-item"
              }
            >
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
            <li
              className={
                props?.match?.path == "/Documents"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Documents">
                <i className="fa">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15.883"
                    height="20.199"
                    viewBox="0 0 15.883 20.199"
                  >
                    <g id="document" transform="translate(2651.707 -74.225)">
                      <path
                        id="Path_9140"
                        data-name="Path 9140"
                        d="M-2638.04,93.923h-11.7a.244.244,0,0,0-.049-.025,1.666,1.666,0,0,1-1.414-1.757q0-7.7,0-15.392a1.68,1.68,0,0,1,1.795-1.774h7.208V75.2q0,1.785,0,3.57a1.68,1.68,0,0,0,1.791,1.759h3.835v4.585q0,3.543,0,7.085a1.667,1.667,0,0,1-1.124,1.629C-2637.812,93.864-2637.927,93.891-2638.04,93.923Zm-5.853-10.029q1.659,0,3.317,0a.572.572,0,0,0,.565-.32.551.551,0,0,0-.535-.79c-1.037,0-2.074,0-3.11,0q-1.781,0-3.561,0a.567.567,0,0,0-.552.311.553.553,0,0,0,.54.8C-2646.116,83.9-2645,83.894-2643.893,83.894Zm0,2.22q1.658,0,3.317,0a.571.571,0,0,0,.564-.321.552.552,0,0,0-.538-.789c-1.18,0-2.361,0-3.541,0q-1.565,0-3.129,0a.566.566,0,0,0-.551.312.553.553,0,0,0,.543.8C-2646.115,86.117-2645,86.115-2643.891,86.115Zm.019,1.11c-1.112,0-2.223,0-3.335,0a.573.573,0,0,0-.574.336.556.556,0,0,0,.563.774q1.771,0,3.542,0,1.556,0,3.11,0a.566.566,0,0,0,.552-.311.553.553,0,0,0-.54-.8C-2641.661,87.223-2642.766,87.225-2643.872,87.225Zm-1.146,2.22c-.73,0-1.461,0-2.191,0a.806.806,0,0,0-.37.1.516.516,0,0,0-.23.594.559.559,0,0,0,.573.413q2.191,0,4.383,0c.394,0,.652-.224.649-.56s-.259-.55-.659-.55Z"
                        fill="#666"
                        stroke="rgba(0,0,0,0)"
                        strokeWidth={1}
                      />
                      <path
                        id="Path_9141"
                        data-name="Path 9141"
                        d="M-2579.543,82.18h-3.707a.617.617,0,0,1-.689-.683c0-1.251,0-2.5,0-3.711Z"
                        transform="translate(-57.489 -2.355)"
                        fill="#666"
                        stroke="rgba(0,0,0,0)"
                        strokeWidth={1}
                      />
                    </g>
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  Documents
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Shipments"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Shipments">
                <i className="fa">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="20.162"
                    height="17.611"
                    viewBox="0 0 20.162 17.611"
                  >
                    <defs>
                      <clipPath id="clip-path">
                        <rect width="20.162" height="17.611" fill="none" />
                      </clipPath>
                    </defs>
                    <g id="shipments" transform="translate(-69.5 -709.48)">
                      <g
                        id="shipments-2"
                        data-name="shipments"
                        transform="translate(69.5 709.48)"
                        clipPath="url(#clip-path)"
                      >
                        <g
                          id="shipments-3"
                          data-name="shipments"
                          transform="translate(2346.199 -646.422)"
                        >
                          <path
                            id="Path_9142"
                            data-name="Path 9142"
                            d="M-2343.24,661.916a2.256,2.256,0,0,1-1.737-.411,1.973,1.973,0,0,1-.722-1.6q0-4.02,0-8.039,0-1.449,0-2.9a1.932,1.932,0,0,1,2.037-2.04q4.441,0,8.882,0a1.924,1.924,0,0,1,2.025,2.025c0,.482,0,.963,0,1.464.1,0,.183.011.266.012.787,0,1.574,0,2.361,0a1.949,1.949,0,0,1,1.895,1.228c.485,1.052,1,2.092,1.472,3.15a2.407,2.407,0,0,1,.209.92c.022,1.41.014,2.82.008,4.23a1.952,1.952,0,0,1-.982,1.737,3.226,3.226,0,0,0-1.231-2.267,3.124,3.124,0,0,0-2.458-.644,3.232,3.232,0,0,0-2.716,3.133h-2.882a3.256,3.256,0,0,0-3.344-3.174A3.244,3.244,0,0,0-2343.24,661.916Zm12.691-5.94c.436,0,.872,0,1.308,0a.8.8,0,0,0,.756-1.233c-.376-.742-.758-1.48-1.128-2.225a.812.812,0,0,0-.779-.492c-.506,0-1.012-.007-1.518,0a.8.8,0,0,0-.841.856q0,1.121,0,2.242a.8.8,0,0,0,.848.851C-2331.452,655.979-2331,655.976-2330.549,655.976Zm-9.6-3.569c-.131-.2-.245-.374-.362-.547a.8.8,0,0,0-1.13-.293.81.81,0,0,0-.2,1.168c.236.366.478.729.719,1.093a.818.818,0,0,0,1.224.285c.559-.323,1.116-.65,1.674-.977.4-.232.8-.458,1.187-.7a.751.751,0,0,0,.357-.824.747.747,0,0,0-.573-.612.853.853,0,0,0-.691.123C-2338.669,651.549-2339.4,651.969-2340.147,652.407Z"
                            fill="#fff"
                            stroke="rgba(0,0,0,0)"
                            strokeWidth={1}
                          />
                          <path
                            id="Path_9143"
                            data-name="Path 9143"
                            d="M-2253.033,741.442a1.6,1.6,0,0,1-1.587-1.6,1.609,1.609,0,0,1,1.618-1.594,1.608,1.608,0,0,1,1.575,1.613A1.6,1.6,0,0,1-2253.033,741.442Z"
                            transform="translate(-77.698 -77.909)"
                            fill="#fff"
                            stroke="rgba(0,0,0,0)"
                            strokeWidth={1}
                          />
                          <path
                            id="Path_9144"
                            data-name="Path 9144"
                            d="M-2314.813,739.856a1.594,1.594,0,0,1-1.6,1.586,1.6,1.6,0,0,1-1.593-1.618,1.609,1.609,0,0,1,1.612-1.577A1.6,1.6,0,0,1-2314.813,739.856Z"
                            transform="translate(-23.627 -77.909)"
                            fill="#fff"
                            stroke="rgba(0,0,0,0)"
                            strokeWidth={1}
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  shipment{" "}
                </span>
              </Link>
            </li>
            <li
              className={
                props?.match?.path == "/Subemployees"
                  ? "nav-item active "
                  : "nav-item"
              }
            >
              <Link to="/Subemployees">
                <i className="fa">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.986"
                    height="21.439"
                    viewBox="0 0 17.986 21.439"
                  >
                    <g
                      id="subemployee"
                      transform="translate(2539.471 -590.684)"
                    >
                      <path
                        id="Path_9145"
                        data-name="Path 9145"
                        d="M-2530.476,690.345h-7.784c-.389,0-.5-.092-.569-.465a8.478,8.478,0,0,1,4.7-9.123,8.483,8.483,0,0,1,11.863,5.528,8.244,8.244,0,0,1,.142,3.628c-.061.335-.177.432-.521.432Zm3.476-5.785c-.361,0-.722,0-1.083,0-.327,0-.463.141-.465.473,0,.617-.007,1.235,0,1.853a1.54,1.54,0,0,0,1.536,1.53,1.538,1.538,0,0,0,1.546-1.519c.01-.625,0-1.251,0-1.877,0-.316-.141-.456-.454-.459C-2526.278,684.557-2526.638,684.56-2527,684.56Z"
                        transform="translate(0 -78.722)"
                        fill="#666"
                        stroke="rgba(0,0,0,0)"
                        strokeWidth={1}
                      />
                      <path
                        id="Path_9146"
                        data-name="Path 9146"
                        d="M-2495.559,595.809a4.631,4.631,0,0,1-4.626,4.63,4.632,4.632,0,0,1-4.632-4.625,4.63,4.63,0,0,1,4.625-4.63A4.632,4.632,0,0,1-2495.559,595.809Z"
                        transform="translate(-30.289)"
                        fill="#666"
                        stroke="rgba(0,0,0,0)"
                        strokeWidth={1}
                      />
                    </g>
                  </svg>
                </i>
                <span className="menu-title" data-i18n>
                  Sub Employee{" "}
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
