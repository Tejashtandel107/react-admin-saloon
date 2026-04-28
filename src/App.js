import { Fragment, useEffect, useRef } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/login";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ProtectedRoute from "./routes/protectedRoute";
import PrivateRoute from "./routes/privateRoute";
import Dashboard from "./pages/dashboard";
import Service from "./pages/service/index";
import Booking from "./pages/booking/index";
import SignUp from "./pages/signUp";
import { IsTokenExpired } from "./common/jwtToken";
import ErrorBoundary from "./common/ErrorBoundary";
import GlobalLoader from "./components/GlobalLoader";
import Contact from "./pages/contact/index";
import FaqPage from "./pages/faq";
import ContactUsList from "./pages/contact-us";

function App() {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token !== null) {
      const isExpired = IsTokenExpired(token);
      if (isExpired === true) {
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  }, [token, navigate]);

  return (
    <>
      <ErrorBoundary>
        <GlobalLoader />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/service" element={<Service />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact-us" element={<ContactUsList />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Login />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
        </Routes>
        <ToastContainer />
        <audio ref={audioRef} id="order-sound" src="/assets/sound/sound.mp3" />
      </ErrorBoundary>
    </>
  );
}

export default App;
