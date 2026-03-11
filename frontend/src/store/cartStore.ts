import { create } from 'zustand';

export interface CartItem {
    product: string; // Product ID
    title: string;
    image: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (item: CartItem) => void;
    removeItem: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    clearCart: () => void;
    getTotal: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
    items: [],

    addItem: (newItem) => set((state) => {
        const existingItem = state.items.find(item => item.product === newItem.product);
        if (existingItem) {
            return {
                items: state.items.map(item =>
                    item.product === newItem.product
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            };
        }
        return { items: [...state.items, newItem] };
    }),

    removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.product !== productId)
    })),

    updateQuantity: (productId, quantity) => set((state) => {
        if (quantity <= 0) {
            return {
                items: state.items.filter(item => item.product !== productId)
            };
        }
        return {
            items: state.items.map(item =>
                item.product === productId ? { ...item, quantity } : item
            )
        };
    }),

    clearCart: () => set({ items: [] }),

    getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }
}));
