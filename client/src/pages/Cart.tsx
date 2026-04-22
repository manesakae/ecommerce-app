import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6">🛒 Your Cart</h1>

        {cart.length === 0 ? (
          <div className="text-center mt-20 text-gray-500">
            <p className="text-lg">Your cart is empty</p>
            <p className="text-sm">Start adding some products</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center border rounded-xl p-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Left */}
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-lg">{item.name}</h2>
                    <p className="text-gray-500 text-sm">${item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.productId, -1)}
                        disabled={item.quantity === 1}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                      >
                        −
                      </button>

                      <span className="w-6 text-center font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.productId, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Subtotal */}
                    <p className="text-sm text-gray-600 mt-1">
                      Subtotal: ${item.price * item.quantity}
                    </p>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="text-red-500 text-sm hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="mt-8 border-t pt-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Total</h2>
              <h2 className="text-2xl font-bold">${total}</h2>
            </div>

            {/* Checkout Button */}
            {/* <button className="w-full mt-6 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
            Proceed to Checkout
          </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
