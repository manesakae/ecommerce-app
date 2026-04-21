import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const PrivateRoute = ({ roles }: { roles?: string[] }) => {
  const location = useLocation();
  const isAuthenticated = localStorage.getItem("token");
  const user = getUserFromToken();

  if (!isAuthenticated) return <Navigate to="/login"  state={{ from : location}} />;

  // if roles are provided check access
  if(roles && !roles.includes(user.role)) return <Navigate to="/"  />;
  // if (role && user.role !== role) return <Navigate to="/"  />;

  return <Outlet />;
};

export default PrivateRoute;
