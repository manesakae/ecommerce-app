import { Link, useNavigate } from "react-router-dom";
import { getUserFromToken } from "../utils/auth";

const NavBar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex gap-4 p-4 border-b">
      <Link to="/" className="font-bold">
        Home
      </Link>
      {!user ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <span className="text-sm text-gray-600">👤 {user.role}</span>

          <button
            onClick={handleLogout}
            className="bg-black text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        </>
      )}

      {user && user.role === "admin" && (
        <Link to="/admin/create-product" className="text-sm">
          Create Product
        </Link>
      )}
    </div>
  );
};

export default NavBar;
