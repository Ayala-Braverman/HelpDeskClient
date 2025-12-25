import type React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../Context/userContext";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  if (user?.userDetails?.role != "admin") {
    return <Navigate to="/404" replace />;
  }
  return children;
};

export const ProtectedAgentRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
    if (user?.userDetails?.role != "agent") 
    {
        return <Navigate to="/404" replace />;
    }

    return children;
}

export const ProtectedCustomerRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
    if (user?.userDetails?.role != "customer") 
    {
        return <Navigate to="/404" replace />;
    }
    return children;
}

export const ProtectedPublicRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
  const token = user?.token;
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;;
}

export const ProtectedAdminOrAgentRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useUserContext();
    if (user?.userDetails?.role != "admin" && user?.userDetails?.role != "agent") 
    {
        return <Navigate to="/404" replace />;
    }
    return children;
}
