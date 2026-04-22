import type { CartItem } from './../types/cart';
export const mergeCart = (localCart: CartItem[], serverCart: CartItem[]): CartItem[] => {
    const map = new Map<string, CartItem>();

    // Add serverCart to  first
    serverCart.forEach((item) => {
        map.set(item.productId, { ...item });
    });

    // merger local cart
    localCart.forEach((item) => {
        if (map.has(item.productId)) {
            const existing = map.get(item.productId)!;
            map.set(item.productId, { ...existing, quantity: existing.quantity + item.quantity })
        } else {
            map.set(item.productId, { ...item })
        }
    })
    return Array.from(map.values());
}