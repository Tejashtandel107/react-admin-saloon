import { Navigate, Outlet } from "react-router-dom";
import Layout from "../layout";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isAdmin = user?.user?.admin === true;

  // ❌ Not logged in or not admin
  if (!token || !isAdmin) {
    return <Navigate to="/" />;
  }

  // ✅ Admin access
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default ProtectedRoute;