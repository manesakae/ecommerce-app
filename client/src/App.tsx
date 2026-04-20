import { Routes, Route } from "react-router-dom";
import "./App.css";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminCreateProduct from "./pages/AdminCreateProduct";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
    <NavBar/>
      <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/admin/create-product" element={<AdminCreateProduct />} />
      <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;
