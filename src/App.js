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
const Analytics = lazy(() => import("./Screens/Analytics"));
const PromoCodeEdit = lazy(() => import("./Screens/PromoCodeEdit"));
const Tags = lazy(() => import("./Screens/Tags"));
const EditTag = lazy(() => import("./Screens/EditTag"));
const Revenue = lazy(() => import("./Screens/Revenue"));


const Doctors = lazy(() => import("./Screens/Doctors"));
const DoctorCategories = lazy(() => import("./Screens/DoctorCategories"));
const AddDoctorCategory = lazy(() => import("./Screens/AddDoctorCategory"));
const EditDoctorCategory = lazy(() => import("./Screens/EditDoctorCategory"));
const AddDoctor = lazy(() => import("./Screens/AddDoctor"));
const EditDoctor = lazy(() => import("./Screens/EditDoctor"));

const DoctorDetails = lazy(() => import("./Screens/DoctorDetails"));
const DoctorAvailibilites = lazy(() => import("./Screens/DoctorAvailibilites"));

const DoctorPassword = lazy(() => import("./Screens/DoctorPassword"));

const AddVideo = lazy(() => import("./Screens/AddVideo"));
const VideoDetails = lazy(() => import("./Screens/VideoDetails"));
const AnalyticsOrder = lazy(() => import("./Screens/AnalyticsOrder"));
const AnalysisProducts = lazy(() => import("./Screens/AnalysisProducts"));
const AnalysisCategories = lazy(() => import("./Screens/AnalysisCategories"));
const AnalyticsVariation = lazy(() => import("./Screens/AnalyticsVariation"));

const AddTax = lazy(() => import("./Screens/AddTax"));

const EditTax = lazy(() => import("./Screens/EditTax"));
const Coupans = lazy(() => import("./Screens/Coupans"));

const AddCoupan = lazy(() => import("./Screens/AddCoupan"));

const Disputes = lazy(() => import("./Screens/Disputes"));


export default function App() {
  return (
    <Suspense fallback={<Loader />}>
      <Router basename="/admin">
        <Route path="/" component={Login} exact />
        <PrivateRoute path="/Events" component={Events} exact />
        <PrivateRoute path="/EditEventt/:id" component={EditEventt} exact />
        <PrivateRoute path="/EditTag/:id" component={EditTag} exact />

        <PrivateRoute path="/AddEvent" component={AddEvent} exact />
        <PrivateRoute path="/Analytics" component={Analytics} exact />
        <PrivateRoute path="/GeoGeneticsOrders" component={GeoGeneticsOrders} exact />
        <PrivateRoute path="/AddCoupan" component={AddCoupan} exact />
        <PrivateRoute path="/Disputes" component={Disputes} exact />

        
        <Route path="/forgotpassword" component={ForgotPassword} exact />
        <Route
          path="/verificationcode:email"
          component={VerificationCode}
          exact
        />
        <Route path="/resetPassword" component={ResetPassword} exact />
        <PrivateRoute exact path="/Dashboard" component={Dashboard} />
        <PrivateRoute exact path="/EditProfile" component={EditProfile} />
        <PrivateRoute exact path="/DoctorCategories" component={DoctorCategories} />
        <PrivateRoute exact path="/AddDoctor" component={AddDoctor} />
        <PrivateRoute exact path="/AddTax" component={AddTax} />
        <PrivateRoute exact path="/Coupans" component={Coupans} />


        <PrivateRoute exact path="/AddVideo" component={AddVideo} />
        <PrivateRoute exact path="/AnalyticsOrder" component={AnalyticsOrder} />
        <PrivateRoute exact path="/AnalyticsVariation" component={AnalyticsVariation} />

        <PrivateRoute exact path="/AddDoctorCategory" component={AddDoctorCategory} />
        <PrivateRoute exact path="/UpdatePassword" component={UpdatePassword} />
        <PrivateRoute exact path="/Categories" component={Categories} />
        <PrivateRoute exact path="/Orders" component={Orders} />
        <PrivateRoute exact path="/Doctors" component={Doctors} />
        <PrivateRoute exact path="/Users" component={Users} />
        <PrivateRoute exact path="/Shipments" component={Shipments} />
        <PrivateRoute exact path="/AnalysisProducts" component={AnalysisProducts} />
        <PrivateRoute exact path="/Tags" component={Tags} />
        <PrivateRoute exact path="/AnalysisCategories" component={AnalysisCategories} />
        <PrivateRoute
          exact
          path="/ShipmentDetails/:id"
          component={ShipmentDetails}
        />
        <PrivateRoute exact path="/Documents" component={Documents} />
        <PrivateRoute exact path="/Revenue" component={Revenue} />

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
        <PrivateRoute exact path="/DoctorDetails/:id" component={DoctorDetails} />
        <PrivateRoute exact path="/DoctorAvailibilites/:id" component={DoctorAvailibilites} />
        <PrivateRoute exact path="/DoctorPassword/:id" component={DoctorPassword} />

        <PrivateRoute exact path="/VideoDetails/:id" component={VideoDetails} />

        <PrivateRoute exact path="/ProductEdit/:id" component={ProductEdit} />
        <PrivateRoute exact path="/EditTax/:id" component={EditTax} />
        <PrivateRoute exact path="/PromoCodeEdit/:id" component={PromoCodeEdit} />
        <PrivateRoute exact path="/EditDoctor/:id" component={EditDoctor} />

        <PrivateRoute exact path="/EditDoctorCategory/:id" component={EditDoctorCategory} />

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
        <PrivateRoute exact path="/Video" component={Instructions} />
        <PrivateRoute exact path="/Faqs" component={Faqs} />

      </Router>
    </Suspense>
  );
}
