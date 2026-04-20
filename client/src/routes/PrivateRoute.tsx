import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const PrivateRoute = ({ role }: { role?: string }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const user = getUserFromToken();

  if (!isAuthenticated) return <Navigate to="/login"  state={{ from : location}} />;
  if (role && user.role !== role) return <Navigate to="/"  />;

  return <Outlet />;
};

export default PrivateRoute;
