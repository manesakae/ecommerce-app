export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number
}

export type CartContextType = {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
}