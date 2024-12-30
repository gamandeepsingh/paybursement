import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import { PrivateRoute } from "./RouterGuard";
import App from "../App";
import Loader from "@/components/Loader/Loader";
import Employees from "@/pages/Employees";
import EmployeeDetails from "@/pages/EmployeeDetails";
const Dashboard = lazy(() => import("../pages/Dashboard"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Home = lazy(() => import("../pages/Home"));

const router = createBrowserRouter([
    {
        path:"/",
        element: <App/>,
        children:[
            {
                path: "/",
                element: <Home/>
            },
            {
                path: "/sign-in",
                element: <SignIn/>
            },
            {
                path: "/sign-up",
                element: <SignUp/>
            },
            {
                path: "/loader",
                element: <Loader/>
            },
            {
                path:"/",
                element:<PrivateRoute/>,
                children:[
                    {
                        path:"/dashboard",
                        element:<Dashboard/>
                    },
                    {
                        path:"/employees",
                        element:<Employees/>
                    },
                    {
                        path:"/employee/:id",
                        element:<EmployeeDetails/>
                    },
                ]
            }
        ]
    }
]);

export default router;