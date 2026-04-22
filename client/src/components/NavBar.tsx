import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { syncCart } from "../services/cartService";
import { getUserFromToken } from "../utils/auth";


const NavBar = () => {
  const navigate = useNavigate();
  const user = getUserFromToken();
  const { cart, clearCart } = useCart();

  const handleLogout = async () => {
    await syncCart(cart);
    localStorage.removeItem("token");
    clearCart();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm">
      {/* Left - Logo */}
      <Link to="/" className="text-xl font-bold text-blue-600">
        Ecommerce app
      </Link>

      {/* Middle - Navigation */}
      <div className="flex items-center gap-6 text-gray-700">
        <Link to="/" className="hover:text-blue-600 transition">
          Home
        </Link>

        {user && user.role === "admin" && (
          <Link
            to="/admin/create-product"
            className="hover:text-blue-600 transition"
          >
            Create Product
          </Link>
        )}
      </div>

      {/* Right - Auth */}
      <div className="flex items-center gap-4">
        {!user ? (
          <>
            <Link to="/cart">Cart ({cart.length})</Link>
            <Link
              to="/login"
              className="px-3 py-1 border rounded hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <Link to="/cart">Cart ({cart.length})</Link>
            <span className="text-sm text-gray-600">👤 {user.role}</span>

            <button
              onClick={handleLogout}
              className="px-3 py-1 bg-black text-white rounded hover:bg-gray-800"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
