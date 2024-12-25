import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

type State = {
  user: {
    currentUser: any;
  };
}

export const PrivateRoute = () => {
  const { currentUser } = useSelector((state:State) => state.user);

  // return currentUser ? <Outlet /> : <Navigate to="/sign-in" />;
  return  <Outlet />;
};
