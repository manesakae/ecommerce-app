import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        
        {/* Title */}
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          🛒 Your Cart
        </h1>

        {/* Empty state */}
        {cart.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            Your cart is empty
          </p>
        )}

        {/* Cart items */}
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center border rounded-lg p-4 hover:shadow-sm transition"
            >
              <div>
                <h2 className="font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.quantity}
                </p>
              </div>

              <button
                onClick={() => removeFromCart(item._id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {/* Total section */}
        {cart.length > 0 && (
          <div className="mt-6 border-t pt-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Total
            </h2>
            <span className="text-xl font-bold text-blue-600">
              ${total.toFixed(2)}
            </span>
          </div>
        )}

        {/* Checkout button */}
        {/* {cart.length > 0 && (
          <button className="mt-6 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        )} */}
      </div>
    </div>
  );
};

export default Cart;