import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");

  const isAdmin = user?.user?.admin === true;

  return token && isAdmin ? (
    <Navigate to="/dashboard" />
  ) : (
    <Outlet />
  );
}

export default PrivateRoute;