import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../components/Productskeleton";
import { fetchProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts({ page, limit: 6, category });
      setProducts(data.products);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [page, category]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <select
        className="border p-2 mb-4"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All</option>
        <option value="stationary">Stationary</option>
        <option value="other">Other</option>
      </select>

      {!loading && products.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No products found</p>
      )}
      <div className="grid grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((p) => (
            <div key={p._id} className="border p-4 rounded cursor-pointer" on onClick={()=> navigate(`/product/${p._id}`)}>
                <h2 className="font-bold">{p.name}</h2>
                <p>${p.price}</p>
                <p className="text-sm text-gray-500">{p.category}</p>
              </div>
            ))}
      </div>

      <div className="flex gap-2 mt-4">
        <button
          className="bg-gray-200 px-3"
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
        >
          Prev
        </button>

        <button
          className="bg-gray-200 px-3"
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
