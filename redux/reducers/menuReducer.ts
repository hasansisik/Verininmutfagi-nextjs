import { createReducer } from "@reduxjs/toolkit";
import {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    updateMenuOrder,
    clearError,
} from "../actions/menuActions";

interface MenuItem {
    _id: string;
    title: string;
    link: string;
    hasDropdown: boolean;
    megaMenu: boolean;
    subMenus: { title: string; link: string }[];
    order: number;
    isActive: boolean;
    createdAt: string;
}

interface MenuState {
    menuItems: MenuItem[];
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: MenuState = {
    menuItems: [],
    loading: false,
    error: null,
    message: null,
};

export const menuReducer = createReducer(initialState, (builder) => {
    builder
        // Get All Menu Items
        .addCase(getAllMenuItems.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllMenuItems.fulfilled, (state, action) => {
            state.loading = false;
            state.menuItems = action.payload;
            state.error = null;
        })
        .addCase(getAllMenuItems.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Create Menu Item
        .addCase(createMenuItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(createMenuItem.fulfilled, (state, action) => {
            state.loading = false;
            state.menuItems.push(action.payload);
            state.message = "Menü öğesi oluşturuldu";
            state.error = null;
        })
        .addCase(createMenuItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Update Menu Item
        .addCase(updateMenuItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateMenuItem.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.menuItems.findIndex(
                (item) => item._id === action.payload._id
            );
            if (index !== -1) {
                state.menuItems[index] = action.payload;
            }
            state.message = "Menü öğesi güncellendi";
            state.error = null;
        })
        .addCase(updateMenuItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Delete Menu Item
        .addCase(deleteMenuItem.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteMenuItem.fulfilled, (state, action) => {
            state.loading = false;
            state.menuItems = state.menuItems.filter(
                (item) => item._id !== action.payload
            );
            state.message = "Menü öğesi silindi";
            state.error = null;
        })
        .addCase(deleteMenuItem.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Update Menu Order
        .addCase(updateMenuOrder.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateMenuOrder.fulfilled, (state, action) => {
            state.loading = false;
            // Update the order of items in state
            action.payload.forEach((item) => {
                const index = state.menuItems.findIndex((i) => i._id === item._id);
                if (index !== -1) {
                    state.menuItems[index].order = item.order;
                }
            });
            // Sort by order
            state.menuItems.sort((a, b) => a.order - b.order);
            state.message = "Sıralama güncellendi";
            state.error = null;
        })
        .addCase(updateMenuOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        // Clear Error
        .addCase(clearError.fulfilled, (state) => {
            state.error = null;
            state.message = null;
        });
});

export default menuReducer;
