import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

const API_URL = `${server}/categories`;

// Get all categories
export const getAllCategories = createAsyncThunk(
    "category/getAllCategories",
    async (filters: any, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, { params: filters });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Kategoriler alınamadı");
        }
    }
);

// Get single category
export const getCategory = createAsyncThunk(
    "category/getCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data.category;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Kategori bulunamadı");
        }
    }
);

// Create category
export const createCategory = createAsyncThunk(
    "category/createCategory",
    async (categoryData: any, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(API_URL, categoryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Kategori oluşturulamadı");
        }
    }
);

// Update category
export const updateCategory = createAsyncThunk(
    "category/updateCategory",
    async ({ id, categoryData }: { id: string; categoryData: any }, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(`${API_URL}/${id}`, categoryData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Kategori güncellenemedi");
        }
    }
);

// Delete category
export const deleteCategory = createAsyncThunk(
    "category/deleteCategory",
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.delete(`${API_URL}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Kategori silinemedi");
        }
    }
);

// Update category order
export const updateCategoryOrder = createAsyncThunk(
    "category/updateCategoryOrder",
    async (categories: any[], { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(
                `${API_URL}/reorder`,
                { categories },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Sıralama güncellenemedi");
        }
    }
);
