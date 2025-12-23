import { Navigate } from "react-router-dom";

const RouterHomePage = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (user.role === "agent") {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return <Navigate to="/customer/dashboard" replace />;
};

export default RouterHomePage;
