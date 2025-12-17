import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

interface Product {
    id: string;
    title: string;
    thumb?: string;
    price?: number;
}

interface WishlistState {
    wishlist: Product[];
}

// Load from localStorage (client-side only)
const loadWishlistFromStorage = (): Product[] => {
    if (typeof window !== 'undefined') {
        try {
            const stored = localStorage.getItem('wishlist');
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }
    return [];
};

// Save to localStorage
const saveWishlistToStorage = (wishlist: Product[]) => {
    if (typeof window !== 'undefined') {
        try {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        } catch (error) {
            console.error('Failed to save wishlist to localStorage:', error);
        }
    }
};

const initialState: WishlistState = {
    wishlist: [],
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState,
    reducers: {
        initializeWishlist: (state) => {
            state.wishlist = loadWishlistFromStorage();
        },
        addToWishlist: (state, { payload }: PayloadAction<Product>) => {
            const productIndex = state.wishlist.findIndex((item) => item.id === payload.id);
            if (productIndex >= 0) {
                toast.info(`${payload.title} zaten listenizde`, {
                    position: "top-right",
                });
            } else {
                state.wishlist.push(payload);
                toast.success(`${payload.title} listenize eklendi`, {
                    position: "top-right",
                });
                saveWishlistToStorage(state.wishlist);
            }
        },
        removeFromWishlist: (state, { payload }: PayloadAction<Product>) => {
            state.wishlist = state.wishlist.filter((item) => item.id !== payload.id);
            toast.error(`Listeden kaldırıldı`, {
                position: "top-right",
            });
            saveWishlistToStorage(state.wishlist);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
            saveWishlistToStorage(state.wishlist);
            toast.info("Liste temizlendi", {
                position: "top-right",
            });
        },
    },
});

export const {
    initializeWishlist,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
