import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Loader from "./components/Loader";
import AddEvent from "./Screens/AddEvent";
import EditEventt from "./Screens/EditEventt";
import Events from "./Screens/Events";

const AddCategory = lazy(() => import("./Screens/AddCategory"));
const AddProduct = lazy(() => import("./Screens/AddProduct"));
const AllReviews = lazy(() => import("./Screens/AllReviews"));
const Categories = lazy(() => import("./Screens/Categories"));
const CategoryProducts = lazy(() => import("./Screens/CategoryProducts"));
const Dashboard = lazy(() => import("./Screens/Dashboard"));
const EditCategory = lazy(() => import("./Screens/EditCategory"));
const EditProfile = lazy(() => import("./Screens/EditProfile"));
const EditUser = lazy(() => import("./Screens/EditUser"));
const Feedback = lazy(() => import("./Screens/Feedback"));
const FeedbackDetails = lazy(() => import("./Screens/FeedbackDetails"));
const ForgotPassword = lazy(() => import("./Screens/ForgotPassword"));
const Login = lazy(() => import("./Screens/Login"));
const NewUser = lazy(() => import("./Screens/NewUser"));
const Notification = lazy(() => import("./Screens/Notification"));
const OrderDetails = lazy(() => import("./Screens/OrderDetails"));
const Orders = lazy(() => import("./Screens/Orders"));
const OrdersDelivered = lazy(() => import("./Screens/OrdersDelivered"));
const OrdersInvoice = lazy(() => import("./Screens/OrdersInvoice"));
const ProductEdit = lazy(() => import("./Screens/ProductEdit"));
const Products = lazy(() => import("./Screens/Products"));
const ProductView = lazy(() => import("./Screens/ProductView"));
const Profile = lazy(() => import("./Screens/Profile"));
const ResetPassword = lazy(() => import("./Screens/ResetPassword"));
const Taxes = lazy(() => import("./Screens/Taxes"));
const UpdatePassword = lazy(() => import("./Screens/UpdatePassword"));
const UserDetails = lazy(() => import("./Screens/UserDetails"));
const VerificationCode = lazy(() => import("./Screens/VerificationCode"));
const ViewCategory = lazy(() => import("./Screens/ViewCategory"));
const Appointments = lazy(() => import("./Screens/Appointments"));
const AppointmentDetails = lazy(() => import("./Screens/AppointmentDetails"));
const GeoGenetics = lazy(() => import("./Screens/GeoGenetics"));
const Users = lazy(() => import("./Screens/Users"));
const AddGeoGenetics = lazy(() => import("./Screens/AddGeoGenetics"));
const GeoGeneticEdit = lazy(() => import("./Screens/GeoGeneticEdit"));
const GeoGeneticsOrders = lazy(() => import("./Screens/GeoGeneticsOrders"));
const Shipments = lazy(() => import("./Screens/Shipments"));
const Documents = lazy(() => import("./Screens/Documents"));
const Subemployees = lazy(() => import("./Screens/Subemployees"));
const ShipmentDetails = lazy(() => import("./Screens/ShipmentDetails"));
const Instructions = lazy(() => import("./Screens/Instructions"));
const PromoCode = lazy(() => import("./Screens/PromoCode"));
const AddPromoCode = lazy(() => import("./Screens/AddPromoCode"));
const Faqs = lazy(() => import("./Screens/Faqs"));

export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router basename="/admin">
        <Route path="/" component={Login} exact />
        <PrivateRoute path="/Events" component={Events} exact />
        <PrivateRoute path="/EditEventt/:id" component={EditEventt} exact />
        <PrivateRoute path="/AddEvent" component={AddEvent} exact />

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
        <PrivateRoute exact path="/PromoCode" component={PromoCode} />
        <PrivateRoute exact path="/EditCategory/:id" component={EditCategory} />
        <PrivateRoute exact path="/ProductEdit/:id" component={ProductEdit} />
        <PrivateRoute
          exact
          path="/GeoGeneticEdit/:id"
          component={GeoGeneticEdit}
        />
        <PrivateRoute exact path="/OrderDetails/:id" component={OrderDetails} />
        <PrivateRoute
          exact
          path="/FeedbackDetails:id"
          component={FeedbackDetails}
        />
        <PrivateRoute exact path="/UserDetails/:id" component={UserDetails} />
        <PrivateRoute
          exact
          path="/AppointmentDetails/:id"
          component={AppointmentDetails}
        />
        <PrivateRoute exact path="/EditUser/:id" component={EditUser} />
        <PrivateRoute exact path="/Products" component={Products} />
        <PrivateRoute exact path="/AddPromoCode" component={AddPromoCode} />
        <PrivateRoute exact path="/GeoGenetics" component={GeoGenetics} />
        <PrivateRoute exact path="/Instructions" component={Instructions} />
        <PrivateRoute exact path="/Faqs" component={Faqs} />

      </Router>
    </Suspense>
  );
}
