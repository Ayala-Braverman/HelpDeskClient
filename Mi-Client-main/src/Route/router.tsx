import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import AgentDashboard from "../pages/Dashboard/AgentDashboard";
import AdminDashboard from "../pages/Dashboard/AdminDashboard";
import RouterHomePage from "./routerHomePage";

import {
    CreateTicket,
    UpdateTicketWrapper,
    DeleteTicketWrapper
} from "../services/Tickets/TicketFunctions";

import {
    GetTicketByIdWrapper,
    ShowTickets
} from "../Components/TicketsComponents";

import LoginForm, { Logout } from "../services/Login/login_logout";
import RegisterForm from "../services/Login/register";

import { CreateUser } from "../services/users/usersFunctions";
import { ShowUsers, GetUserByIdWarpper } from "../Components/UsersComponents";
import { AddStatusOrPriorityForm } from "../services/Status_priority/StatusOrPriority";
import { Error404 } from "../pages/Page404";

import {
    ProtectedAdminRoute,
    ProtectedAgentRoute,
    ProtectedCustomerRoute,
    ProtectedPublicRoute,
    ProtectedAdminOrAgentRoute
} from "./ProtectedRoute";

import { ShowPriorityOrStatusWrapper } from "../Components/showStatusOrPriority";
import { ManagePrioritiesAndStatusesWrapper } from "../Components/ManagePrioritiesAndStatuses";


export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            // ===== public =====
            {
                path: "/tickets",
                element: (
                    <ProtectedPublicRoute>
                        <ShowTickets />
                    </ProtectedPublicRoute>
                )
            },
            {
                path: "/ticket/:id",
                element: (
                    <ProtectedPublicRoute>
                        <GetTicketByIdWrapper />
                    </ProtectedPublicRoute>
                )
            },
            { path: "/login", element: <LoginForm /> },
            { path: "/register", element: <RegisterForm /> },
            { path: "/logout", element: <Logout /> },
            { path: "/404", element: <Error404 /> },


            {
                path: "/*",
                element: <Navigate to="/404" replace />
            },
            
            {
                path: "/",
                element: <RouterHomePage />,
            },


            // ===== customer =====
            {
                path: "/customer/dashboard",
                element: (
                    <ProtectedCustomerRoute>
                        <CustomerDashboard />
                    </ProtectedCustomerRoute>
                )
            },
            {
                path: "/ticket/new",
                element: (
                    <ProtectedCustomerRoute>
                        <CreateTicket />
                    </ProtectedCustomerRoute>
                )
            },

            // ===== agent =====
            {
                path: "/agent/dashboard",
                element: (
                    <ProtectedAgentRoute>
                        <AgentDashboard />
                    </ProtectedAgentRoute>
                )
            },

            // ===== admin =====
            {
                path: "/admin/dashboard",
                element: (
                    <ProtectedAdminRoute>
                        <AdminDashboard />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/users",
                element: (
                    <ProtectedAdminRoute>
                        <ShowUsers />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/createUser",
                element: (
                    <ProtectedAdminRoute>
                        <CreateUser />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/createPriority",
                element: (
                    <ProtectedAdminRoute>
                        <AddStatusOrPriorityForm type="priorities" />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/createStatus",
                element: (
                    <ProtectedAdminRoute>
                        <AddStatusOrPriorityForm type="statuses" />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/manage/:type",
                element: (
                    <ProtectedAdminRoute>
                        <ManagePrioritiesAndStatusesWrapper />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/user/:id",
                element: (
                    <ProtectedAdminRoute>
                        <GetUserByIdWarpper />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/deleteTicket/:id",
                element: (
                    <ProtectedAdminRoute>
                        <DeleteTicketWrapper />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/praiorities/:type",
                element: (
                    <ProtectedAdminRoute>
                        <ShowPriorityOrStatusWrapper />
                    </ProtectedAdminRoute>
                )
            },
            {
                path: "/statuses/:type",
                element: (
                    <ProtectedAdminRoute>
                        <ShowPriorityOrStatusWrapper />
                    </ProtectedAdminRoute>
                )
            },
            // ===== admin or agent =====
            {
                path: "/ticket/update/:id",
                element: (
                    <ProtectedAdminOrAgentRoute>
                        <UpdateTicketWrapper />
                    </ProtectedAdminOrAgentRoute>
                )
            }
        ]
    }
]);
