import { useState, useContext, createContext } from "react";
import type { CartContextType, CartItem } from "../types/cart";

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: any) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart((prev)=>{
        //check if previously present item in cart if yes increase quantity else add in the list
        const existing = prev.find((p)=>p._id == item._id);
        if(existing) {
            return prev.map((p)=> p._id == item._id ? {...p, quantity: p.quantity+1} : p);
        }
        return [...prev, {...item, quantity: 1}];
  });
  };
  const removeFromCart = (id: string) => {
    setCart((prev)=> prev.filter((p)=> p._id !== id))
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
    return useContext(CartContext)!;
}
