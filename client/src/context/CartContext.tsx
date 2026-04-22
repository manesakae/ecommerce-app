import { useState, useContext, createContext, useEffect } from "react";
import { fetchCart, syncCart } from "../services/cartService";
import type { CartContextType, CartItem } from "../types/cart";
import { mergeCart } from "../utils/mergeCart";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  // ✅ Load from localStorage initially
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      //check if previously present item in cart if yes increase quantity else add in the list
      const existing = prev.find((p) => p.productId == item.productId);
      if (existing) {
        return prev.map((p) =>
          p.productId == item.productId ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };
  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((p) => p.productId !== productId));
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // 🔥 NEW: Sync cart with backend
  const syncCartWithBackend = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      // 1. Get backend cart
      const serverData = await fetchCart();
      const serverCart = serverData?.items || [];

      // 2. Get local cart
      const localCart = cart;

      // 3. Merge logic (inline for simplicity)
      const mergedCart = mergeCart(localCart, serverCart);


      // 4. Save to backend
      await syncCart(
        mergedCart.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        }))
      );

      // 5. Update state
      setCart(mergedCart);
    } catch (err) {
      console.error("Cart sync failed", err);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.productId === productId) {
            const newQty = item.quantity + delta;
  
            // remove if quantity <= 0
            if (newQty <= 0) return null;
  
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // ✅ Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Load backend cart on app start (if logged in)
  useEffect(() => {
    const loadCart = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const data = await fetchCart();

        if (data?.items) {
          setCart(data.items);
        }
      }
    };

    loadCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        syncCartWithBackend,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext)!;
};
