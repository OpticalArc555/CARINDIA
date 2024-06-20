/* eslint-disable no-unused-vars */
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AppLayout from "./ui/AppLayout";
import { LoginCard } from "./pages/LoginCard";
import { SimpleRegistrationForm } from "./pages/SimpleRegistrationForm";

import BuyCar from "./pages/BuyCar";
import CarDetailsById from "./pages/CarDetailsById";

import Admin from "./pages/adminpages/Admin";
import AdminMiddleware from "./middleware/AdminMiddleware";
import { onlyAdmin, onlyDealer } from "./components/config/Roles";
import AdminDealerInfo from "./pages/adminpages/AdminDealerInfo";
import AdminDealerEdit from "./pages/adminpages/AdminDealerEdit";
import DealerDashboard from "./pages/dealer/DealerDashboard";
import DealerMiddleware from "./middleware/DealerMiddleware";
import BiddingMainPage from "./pages/bidding/BiddingMainPage";
import AddDealerCar from "./pages/dealer/AddDealerCar";
import EditDealerCar from "./pages/dealer/EditDealerCar";
import BiddingAddCar from "./pages/bidding/BiddingAddCar";
import BiddingEditCar from "./pages/bidding/BiddingEditCar";
import SetTimer from "./pages/bidding/SetTimer";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiePolicy from "./pages/CookiePolicy";
import AppLayout2 from "./ui/AppLayout2";
import PendingRequest from "./pages/PendingRequest";
import OrderDealer from "./pages/dealer/OrderDealer";
import UserConfirmBooking from "./pages/UserConfirmBooking";
import DealerAllPendingRequest from "./pages/dealer/DealerAllPendingRequest";
import BiddingCarDetailsById from "./pages/bidding/BiddingCarDetailsById";
import DealerPendingRequest from "./pages/dealer/DealerPendingRequest";
import BiddingDealerPendingReq from "./pages/bidding/BiddingDealerPendingReq";
import Uploadimages2 from "./ui/UploadImages2";
import InspectorList from "./pages/adminpages/InspectorList";
import CarInspectionTable from "./pages/CarInspectionTable";
import CarVerify from "./pages/CarVerify";
import AdminInspectorEdit from "./pages/adminpages/AdminInspectorEdit";
import ChangePassword from "./pages/dealer/ChangePassword";
import DealerEdit from "./pages/dealer/DealerEdit";
import TransactionByAccount from "./pages/transaction/TransactionByAccount";
import Wallet from "./pages/transaction/Wallet";
import TransactionController from "./pages/transaction/TransactionController";
import EditImage from "./pages/dealer/EditImage";
// import AdminInspectorInfo from "./pages/adminpages/AdminInspectorInfo";


export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<AppLayout />}>
          <Route path="signin" element={<LoginCard />} />
          <Route path="signup" element={<SimpleRegistrationForm />} />
          <Route path="/changePassword" element={<ChangePassword />} />

          <Route path="/carlist" element={<BuyCar />} />
          <Route
            path="/carlist/cardetails/:carId"
            element={<CarDetailsById />}
          />
          <Route
            path="/biddinglist/cardetails/:carId"
            element={<BiddingCarDetailsById />}
          />
          <Route path="/pendinrequest/:userid" element={<PendingRequest />} />
          <Route path="/user/booking/:id" element={<UserConfirmBooking />} />
          <Route
            element={
              <AdminMiddleware allowedRoles={[...Object.values(onlyAdmin)]} />
            }
          >
            <Route path="/admin" element={<Admin />} />
            <Route path="/carverify" element={<CarVerify />} />
            <Route path="/inspector" element={<InspectorList />} />
            <Route path="/CarInspection" element={<CarInspectionTable />} />
            {/* <Route path="/admin/inspector/info/:ProfileId" element={<AdminInspectorInfo />} /> */}
            <Route
              path="/admin/dealer/info/:id"
              element={<AdminDealerInfo />}
            />
            <Route
              path="/admin/dealer/edit/:userid/:id"
              element={<AdminDealerEdit />}
            />
            <Route
              path="/admin/inspector/edit/:userid/:id"
              element={<AdminInspectorEdit />}
            />
            <Route
              path="/transactionbyaccount"
              element={<TransactionByAccount />}
            />
             <Route
              path="/wallet"
              element={<Wallet/>}
            />
            <Route
              path="/transactioncontroller"
              element={<TransactionController/>}
            />
          </Route>

          <Route
            element={
              <DealerMiddleware allowedRoles={[...Object.values(onlyDealer)]} />
            }
          >
            <Route path="/dealer/:id" element={<DealerDashboard />} />
            <Route path="/dealer/:id/addcar" element={<AddDealerCar />} />
            <Route path="/dealer/:id/uploadimage" element={<Uploadimages2 />} />
            <Route
              path="/dealer/:id/edit"
              element={<DealerEdit />}
            />

            <Route
              path="/dealer/:id/car/edit/:carId"
              element={<EditDealerCar />}
            />
            <Route path="/editimage" element={<EditImage />} />
            <Route
              path="/dealer/:id/booking/confirm"
              element={<OrderDealer />}
            />
            <Route
              path="/dealer/:id/allpending"
              element={<DealerAllPendingRequest />}
            />
            <Route
              path="/car/:CarId/pendinguser"
              element={<DealerPendingRequest />}
            />
          </Route>

          <Route path="/bidding" element={<BiddingMainPage />} />
          <Route path="/bidding/:userid/addcar" element={<BiddingAddCar />} />
          <Route path="/bidding/:id/editcar" element={<BiddingEditCar />} />
          <Route path="/bidding/:id/:carid/settimer" element={<SetTimer />} />
          <Route
            path="/car/:CarId/pendingreq"
            element={<BiddingDealerPendingReq />}
          />
        </Route>
           {/* <Route path="/trans" element={<CardDetailss/>}/> */}
        <Route element={<AppLayout2 />}>
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/cookiepolicy" element={<CookiePolicy />} />
        </Route>
        
      </Routes>
    </>
  );
}
