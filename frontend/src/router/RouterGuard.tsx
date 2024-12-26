import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
  const currentUser = useSelector((state: RootState) => state.user.currentUser) || JSON.parse(localStorage.getItem("user") || "{}");
  
  // Check if the currentUser has meaningful data (e.g., an `id` or `email` property)
  const isAuthenticated = currentUser && typeof currentUser === "object" && Object.keys(currentUser).length > 0 ;

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};
