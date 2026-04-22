export type CartItem = {
    productId: string;
    name: string;
    price: number;
    quantity: number
}

export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (productId: string) => void;
    syncCartWithBackend: () => void;
    clearCart: () => void;
    updateQuantity: (productId: string, delta: number) => void;
}