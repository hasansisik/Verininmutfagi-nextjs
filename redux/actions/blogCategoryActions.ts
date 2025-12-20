import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { server } from '@/config';

export interface BlogCategory {
    _id: string;
    name: string;
    slug: string;
    description?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBlogCategoryPayload {
    name: string;
    slug: string;
    description?: string;
    isActive?: boolean;
}

export interface UpdateBlogCategoryPayload extends CreateBlogCategoryPayload {
    id: string;
}

// Get all blog categories
export const getAllBlogCategories = createAsyncThunk(
    'blogCategory/getAll',
    async (params: { isActive?: boolean } = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();
            if (params.isActive !== undefined) {
                queryParams.append('isActive', params.isActive.toString());
            }

            const response = await axios.get(
                `${server}/blog-categories${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Kategoriler yüklenemedi');
        }
    }
);

// Get single blog category
export const getBlogCategory = createAsyncThunk(
    'blogCategory/getOne',
    async (id: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${server}/blog-categories/${id}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Kategori yüklenemedi');
        }
    }
);

// Create blog category
// Create blog category
export const createBlogCategory = createAsyncThunk(
    'blogCategory/create',
    async (payload: CreateBlogCategoryPayload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            // console.log('🏗️ Creating category...', { payload, token: token ? 'Token exists' : 'No token', server });

            const response = await axios.post(
                `${server}/blog-categories`,
                payload,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            /* console.error('❌ Create Blog Category Error Details:', {
                status: error.response?.status,
                data: error.response?.data,
                message: error.message,
                config: error.config
            }); */
            return rejectWithValue(error.response?.data?.message || 'Kategori oluşturulamadı');
        }
    }
);

// Update blog category
export const updateBlogCategory = createAsyncThunk(
    'blogCategory/update',
    async (payload: UpdateBlogCategoryPayload, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");
            const { id, ...data } = payload;

            const response = await axios.patch(
                `${server}/blog-categories/${id}`,
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Kategori güncellenemedi');
        }
    }
);

// Delete blog category
export const deleteBlogCategory = createAsyncThunk(
    'blogCategory/delete',
    async (id: string, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("accessToken");

            const response = await axios.delete(
                `${server}/blog-categories/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return { ...response.data, id };
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Kategori silinemedi');
        }
    }
);
