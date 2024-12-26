import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Dashboard from "../pages/Dashboard";
import { PrivateRoute } from "./RouterGuard";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Home from "@/pages/Home";

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
                path:"/",
                element:<PrivateRoute/>,
                children:[
                    {
                        path:"/dashboard",
                        element:<Dashboard/>
                    }
                ]
            }
        ]
    }
]);

export default router;