import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:5001/api/products/${id}`);
      setProduct(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // 🔥 Skeleton UI
  if (loading) {
    return (
      <div className="p-6 max-w-4xl mx-auto animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-80 bg-gray-300 rounded-xl"></div>
          <div className="flex flex-col gap-4">
            <div className="h-6 bg-gray-300 w-3/4 rounded"></div>
            <div className="h-4 bg-gray-300 w-1/2 rounded"></div>
            <div className="h-20 bg-gray-300 rounded"></div>
            <div className="h-10 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <p className="text-center mt-10 text-gray-500">Product not found</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* 🖼️ Product Image */}
        <div className="w-full h-80 bg-gray-100 rounded-xl flex items-center justify-center">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="object-contain h-full rounded-xl"
            />
          ) : (
            <span className="text-gray-400">No Image</span>
          )}
        </div>

        {/* 📄 Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-2xl font-semibold text-green-600">
            ${product.price}
          </p>

          <p className="text-gray-600 leading-relaxed">{product.description}</p>

          <p className="text-sm text-gray-500">Category: {product.category}</p>

          {/* CTA */}
          <button
            className="bg-black text-white py-3 rounded-xl mt-4 hover:bg-gray-800 transition"
            onClick={() =>
              addToCart({
                productId: product._id, 
                name: product.name,
                price: product.price,
                quantity: 1,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
