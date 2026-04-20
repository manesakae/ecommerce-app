import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:5001/api/products/${id}`
      );
      setProduct(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">Product not found</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{product.name}</h1>

      <p className="text-lg mb-2">${product.price}</p>

      <p className="text-gray-600 mb-4">{product.description}</p>

      <p className="text-sm text-gray-500">
        Category: {product.category}
      </p>

      <button className="bg-black text-white px-4 py-2 mt-4">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetails;