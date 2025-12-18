import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

export interface SubMenu {
    title: string;
    link: string;
}

export interface MenuItemData {
    title: string;
    link: string;
    hasDropdown: boolean;
    megaMenu: boolean;
    subMenus: SubMenu[];
    order?: number;
}

export interface UpdateOrderPayload {
    items: { _id: string; order: number }[];
}

// Get all menu items
export const getAllMenuItems = createAsyncThunk(
    "menu/getAllMenuItems",
    async (_, thunkAPI) => {
        try {
            const { data } = await axios.get(`${server}/menu`);
            return data.menuItems;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Create menu item
export const createMenuItem = createAsyncThunk(
    "menu/createMenuItem",
    async (menuData: MenuItemData, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const { data } = await axios.post(`${server}/menu`, menuData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.menuItem;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Update menu item
export const updateMenuItem = createAsyncThunk(
    "menu/updateMenuItem",
    async ({ id, menuData }: { id: string; menuData: Partial<MenuItemData> }, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const { data } = await axios.patch(`${server}/menu/${id}`, menuData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data.menuItem;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Delete menu item
export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${server}/menu/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Update menu order
export const updateMenuOrder = createAsyncThunk(
    "menu/updateMenuOrder",
    async (items: UpdateOrderPayload["items"], thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            await Promise.all(
                items.map((item) =>
                    axios.patch(
                        `${server}/menu/${item._id}`,
                        { order: item.order },
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    )
                )
            );
            return items;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Clear errors
export const clearError = createAsyncThunk("menu/clearError", async () => {
    return null;
});
