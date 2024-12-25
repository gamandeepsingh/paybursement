import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import { PrivateRoute } from "./RouterGuard";

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