import type React from "react";
import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: React.ReactElement;
};

export const ProtectedAdminRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (user.role != "admin") {
    return <Navigate to="/404" replace />;
  }
  return children;
};

export const ProtectedAgentRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");    
    if (user.role != "agent") 
    {
        return <Navigate to="/404" replace />;
    }

    return children;
}

export const ProtectedCustomerRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role != "customer") 
    {
        return <Navigate to="/404" replace />;
    }
    return children;
}

export const ProtectedPublicRoute = ({ children }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;;
}

export const ProtectedAdminOrAgentRoute = ({ children }: ProtectedRouteProps) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user.role != "admin" && user.role != "agent") 
    {
        return <Navigate to="/404" replace />;
    }
    return children;
}
