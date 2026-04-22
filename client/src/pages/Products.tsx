import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProductSkeleton from "../components/Productskeleton";
import { fetchProducts } from "../services/productService";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await fetchProducts({ page, limit: 6, category });
      setProducts(data.products);
      setTotalPages(data.pages);
    } finally {
      setLoading(false);
    }
  };

  const filterByCategory = (e: any) => {
    setPage(1);
    setCategory(e.target.value);
  }

  useEffect(() => {
    loadProducts();
  }, [page, category]);

  return (
    <div className="p-6">
       {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* Filter */}
      <select
        className="border p-2 mb-4"
        onChange={(e) => filterByCategory(e)}
      >
        <option value="">All</option>
        <option value="stationary">Stationary</option>
        <option value="other">Other</option>
      </select>

      {/* Empty State */}
      {!loading && products.length === 0 && (
        <p className="text-center mt-4 text-gray-500">No products found</p>
      )}

      {/* Grid */}
      <div className="grid grid-cols-3 gap-4">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map((p) => (
              <div
                key={p._id}
                className="border p-4 rounded cursor-pointer"
                on
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <h2 className="font-bold">{p.name}</h2>
                <p>${p.price}</p>
                <p className="text-sm text-gray-500">{p.category}</p>
              </div>
            ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Prev
          </button>

          <span className="text-sm text-gray-600">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-4 py-2 rounded-md bg-gray-200 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
