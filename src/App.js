import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import AddCategory from "./Screens/AddCategory";
import AddProduct from "./Screens/AddProduct";
import AllReviews from "./Screens/AllReviews";
import Categories from "./Screens/Categories";
import CategoryProducts from "./Screens/CategoryProducts";
import Dashboard from "./Screens/Dashboard";
import EditCategory from "./Screens/EditCategory";
import EditProfile from "./Screens/EditProfile";
import EditUser from "./Screens/EditUser";
import Feedback from "./Screens/Feedback";
import FeedbackDetails from "./Screens/FeedbackDetails";
import ForgotPassword from "./Screens/ForgotPassword";
import Login from "./Screens/Login";
import NewUser from "./Screens/NewUser";
import Notification from "./Screens/Notification";
import OrderDetails from "./Screens/OrderDetails";
import Orders from "./Screens/Orders";
import OrdersDelivered from "./Screens/OrdersDelivered";
import OrdersInvoice from "./Screens/OrdersInvoice";
import ProductAdd from "./Screens/ProductAdd";
import ProductEdit from "./Screens/ProductEdit";
import Products from "./Screens/Products";
import ProductView from "./Screens/ProductView";
import Profile from "./Screens/Profile";
import ResetPassword from "./Screens/ResetPassword";
import Taxes from "./Screens/Taxes";
import UpdatePassword from "./Screens/UpdatePassword";
import UserDetails from "./Screens/UserDetails";
import Users from "./Screens/Users";
import VerificationCode from "./Screens/VerificationCode";
import ViewCategory from "./Screens/ViewCategory";
import Appointments from "./Screens/Appointments";

import PrivateRoute from "./components/PrivateRoute";
import AppointmentDetails from "./Screens/AppointmentDetails";
import GeoGenetics from "./Screens/GeoGenetics";
import AddGeoGenetics from "./Screens/AddGeoGenetics";
import GeoGeneticEdit from "./Screens/GeoGeneticEdit";
import GeoGeneticsOrders from "./Screens/GeoGeneticsOrders";
import Shipments from "./Screens/Shipments";
import Documents from "./Screens/Documents";
import Subemployees from "./Screens/Subemployees";
import ShipmentDetails from "./Screens/ShipmentDetails";
import Instructions from "./Screens/Instructions";


export default function App() {
  return (
    <Router basename="/yakhi/admin">
      <Route path="/" component={Login} exact />
      <Route path="/forgotpassword" component={ForgotPassword} exact />
      <Route
        path="/verificationcode:email"
        component={VerificationCode}
        exact
      />
      <Route path="/resetPassword" component={ResetPassword} exact />
      <PrivateRoute exact path="/Dashboard" component={Dashboard} />
      <PrivateRoute exact path="/EditProfile" component={EditProfile} />
      <PrivateRoute exact path="/UpdatePassword" component={UpdatePassword} />
      <PrivateRoute exact path="/Categories" component={Categories} />
      <PrivateRoute exact path="/Orders" component={Orders} />
      <PrivateRoute
        exact
        path="/GeoGeneticsOrders"
        component={GeoGeneticsOrders}
      />
      <PrivateRoute exact path="/Users" component={Users} />
      <PrivateRoute exact path="/Shipments" component={Shipments} />
      <PrivateRoute
        exact
        path="/ShipmentDetails/:id"
        component={ShipmentDetails}
      />
      <PrivateRoute exact path="/Documents" component={Documents} />
      <PrivateRoute exact path="/Subemployees" component={Subemployees} />
      <PrivateRoute exact path="/Taxes" component={Taxes} />
      <PrivateRoute exact path="/Feedback" component={Feedback} />
      <PrivateRoute exact path="/AddProduct" component={AddProduct} />
      <PrivateRoute exact path="/AddGeoGenetics" component={AddGeoGenetics} />
      <PrivateRoute exact path="/AddCategory" component={AddCategory} />
      <PrivateRoute exact path="/NewUser" component={NewUser} />
      <PrivateRoute exact path="/Notification" component={Notification} />
      <PrivateRoute exact path="/Appointments" component={Appointments} />
      <PrivateRoute exact path="/EditCategory:id" component={EditCategory} />
      <PrivateRoute exact path="/ProductEdit:id" component={ProductEdit} />
      <PrivateRoute
        exact
        path="/GeoGeneticEdit:id"
        component={GeoGeneticEdit}
      />
      <PrivateRoute exact path="/OrderDetails:id" component={OrderDetails} />
      <PrivateRoute
        exact
        path="/FeedbackDetails:id"
        component={FeedbackDetails}
      />
      <PrivateRoute exact path="/UserDetails:id" component={UserDetails} />
      <PrivateRoute
        exact
        path="/AppointmentDetails:id"
        component={AppointmentDetails}
      />
      <PrivateRoute exact path="/EditUser:id" component={EditUser} />
      <PrivateRoute exact path="/Products" component={Products} />
      <PrivateRoute exact path="/GeoGenetics" component={GeoGenetics} />
      <PrivateRoute exact path="/Instructions" component={Instructions} />

    </Router>
  );
}
