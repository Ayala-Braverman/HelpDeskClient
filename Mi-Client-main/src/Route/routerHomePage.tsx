import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/userContext";

const RouterHomePage = () => {
  const { user } = useUserContext();
  const token = user?.token;
  const userDetails = user?.userDetails;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (userDetails?.role === "admin") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  if (userDetails?.role === "agent") {
    return <Navigate to="/agent/dashboard" replace />;
  }

  return <Navigate to="/customer/dashboard" replace />;
};

export default RouterHomePage;
