import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = (props) => {
  const [openusersidebar, setopenusersidebar] = useState(false);

  return (
    <div >
      <div style={{ overflow: 'auto', maxHeight: '100vh' }}
        className="main-menu menu-fixed menu-light menu-accordion" data-scroll-to-active="true">
        <div className="main-menu-content ps-container ps-theme-dark" data-ps-id="a7a0450a-bf31-9659-4e93-772b18d2550f">
          <ul className="navigation navigation-main" id="main-menu-navigation" data-menu="menu-navigation">
            <li className={
              props?.match?.path == "/Dashboard"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Dashboard" target="_self"><img src="images/sideIcon1.png" alt="" /> <span className="menu-title" data-i18n>Dashboard</span></Link></li>
            <li className={
              props?.match?.path == "/Users"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Users" target="_self"><img src="images/sideIcon2.png" alt="" /><span className="menu-title">User Management</span></Link></li>
            <li className={
              props?.match?.path == "/Doctors"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Doctors" target="_self"><img src="images/sideIcon3.png" alt="" /><span className="menu-title">Doctors Management</span></Link></li>
            <li className={
              props?.match?.path == "/Products"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Products" target="_self"><img src="images/sideIcon4.png" alt="" /><span className="menu-title">Products</span></Link></li>
            <li className={
              props?.match?.path == "/Video"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Video" target="_self"><img src="images/sideIcon5.png" alt="" /><span className="menu-title">Videos</span></Link></li>
            {/* <li className={
              props?.match?.path == "/Dashboard"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Dashboard" target="_self"><img src="images/sideIcon6.png" alt="" /><span className="menu-title">Payments</span></Link></li> */}
            <li className={
              props?.match?.path == "/Orders"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Orders" target="_self"><img src="images/sideIcon7.png" alt="" /><span className="menu-title">Order Management</span></Link></li>
            <li className={
              props?.match?.path == "/Appointments"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Appointments" target="_self"><img src="images/sideIcon8.png" alt="" /><span className="menu-title">Appointments</span></Link></li>
            <li className={
              props?.match?.path == "/PromoCode"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/PromoCode" target="_self"><img src="images/sideIcon9.png" alt="" /><span className="menu-title">Promocodes</span></Link></li>
            <li className={
              props?.match?.path == "/Disputes"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Disputes" target="_self"><img src="images/sideIcon10.png" alt="" /><span className="menu-title">Disputes</span></Link></li>
            {/* <li className={
              props?.match?.path == "/Dashboard"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Dashboard" target="_self"><img src="images/sideIcon11.png" alt="" /><span className="menu-title">Affiliate Marketing Management</span></Link></li> */}
            <li className={
              props?.match?.path == "/Feedback"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Feedback" target="_self"><img src="images/sideIcon12.png" alt="" /><span className="menu-title">Feedbacks Management</span></Link></li>
            <li className={
              props?.match?.path == "/Analytics"
                ? "nav-item active "
                : "nav-item"
            }><Link to="/Analytics" target="_self"><img src="images/sideIcon10.png" alt="" /><span className="menu-title">Analytics</span></Link></li>
          </ul>
          <div className="ps-scrollbar-x-rail" style={{ left: '0px', bottom: '3px' }}><div className="ps-scrollbar-x" tabIndex={0} style={{ left: '0px', width: '0px' }} /></div><div className="ps-scrollbar-y-rail" style={{ top: '0px', right: '3px' }}><div className="ps-scrollbar-y" tabIndex={0} style={{ top: '0px', height: '0px' }} /></div></div>
      </div>

    </div>
  );
};

export default Sidebar;
