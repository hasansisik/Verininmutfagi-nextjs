import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Product {
    id: string;
    title: string;
    quantity: number;
    price?: number;
    thumb?: string;
}

interface CartState {
    cart: Product[];
    orderQuantity: number;
}

// Load from localStorage (client-side only)
const loadCartFromStorage = (): Product[] => {
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('cart');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }
    return [];
};

// Save to localStorage
const saveCartToStorage = (cart: Product[]) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }
};

const initialState: CartState = {
    cart: [],
    orderQuantity: 1,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        initializeCart: (state) => {
            state.cart = loadCartFromStorage();
        },
        addToCart: (state, { payload }: PayloadAction<Product>) => {
            const productIndex = state.cart.findIndex((item) => item.id === payload.id);
            if (productIndex >= 0) {
                toast.info(`${payload.title} zaten sepetinizde`, {
                    position: "top-right",
                });
            } else {
                const tempProduct = { ...payload, quantity: 1 };
                state.cart.push(tempProduct);
                toast.success(`${payload.title} sepete eklendi`, {
                    position: "top-right",
                });
            }
            saveCartToStorage(state.cart);
        },
        decrease_quantity: (state, { payload }: PayloadAction<Product>) => {
            // Kurs sepetinde miktar azaltma işlemi artık yok
            return;
        },
        remove_cart_product: (state, { payload }: PayloadAction<Product>) => {
            state.cart = state.cart.filter((item) => item.id !== payload.id);
            toast.error(`Sepetten kaldırıldı`, {
                position: "top-right",
            });
            saveCartToStorage(state.cart);
        },
        clear_cart: (state) => {
            if (typeof window !== 'undefined') {
                const confirmMsg = window.confirm("Sepetinizi temizlemek istediğinizden emin misiniz?");
                if (confirmMsg) {
                    state.cart = [];
                    saveCartToStorage(state.cart);
                    toast.info("Sepet temizlendi", {
                        position: "top-right",
                    });
                }
            }
        },
        order_clear_cart: (state) => {
            state.cart = [];
            saveCartToStorage(state.cart);
        },
        get_cart_products: (state) => {
            state.cart = loadCartFromStorage();
        },
    },
});

export const {
    initializeCart,
    addToCart,
    decrease_quantity,
    remove_cart_product,
    clear_cart,
    order_clear_cart,
    get_cart_products,
} = cartSlice.actions;

export default cartSlice.reducer;
