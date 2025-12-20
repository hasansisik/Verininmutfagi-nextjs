import axios, { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "@/config";

export interface Blog {
    _id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    thumb: string;
    tag: string;
    tags: string[];
    author: {
        _id: string;
        name: string;
        surname: string;
        profile?: {
            picture: string;
        };
    };
    readTime: string;
    status: 'draft' | 'published' | 'archived';
    publishedAt?: Date;
    viewCount: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateBlogPayload {
    title: string;
    slug?: string;
    excerpt: string;
    content: string;
    thumb?: string;
    tag?: string;
    tags?: string[];
    readTime?: string;
    status?: 'draft' | 'published' | 'archived';
}

export interface UpdateBlogPayload extends CreateBlogPayload {
    id: string;
}

export interface BlogFilters {
    status?: string;
    tag?: string;
    search?: string;
    page?: number;
    limit?: number;
}

// Get All Blogs
export const getAllBlogs = createAsyncThunk(
    "blog/getAllBlogs",
    async (params: BlogFilters = {}, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = token ? {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            } : {};

            const queryString = new URLSearchParams(
                Object.entries(params).reduce((acc, [key, value]) => {
                    if (value !== undefined && value !== null) {
                        acc[key] = String(value);
                    }
                    return acc;
                }, {} as Record<string, string>)
            ).toString();

            const url = `${server}/blogs${queryString ? `?${queryString}` : ''}`;
            const response = await axios.get(url, config);
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Get Blog by Slug (Public)
export const getBlogBySlug = createAsyncThunk(
    "blog/getBlogBySlug",
    async (slug: string, thunkAPI) => {
        try {
            const response = await axios.get(`${server}/blogs/slug/${slug}`);
            return response.data.blog;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Get Blog by ID (Admin - for editing)
export const getBlogById = createAsyncThunk(
    "blog/getBlogById",
    async (id: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(`${server}/blogs/${id}`, config);
            return response.data.blog;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Create Blog (Admin only)
export const createBlog = createAsyncThunk(
    "blog/createBlog",
    async (payload: CreateBlogPayload, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.post(
                `${server}/blogs`,
                payload,
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Update Blog (Admin only)
export const updateBlog = createAsyncThunk(
    "blog/updateBlog",
    async ({ id, ...payload }: UpdateBlogPayload, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.put(
                `${server}/blogs/${id}`,
                payload,
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Delete Blog (Admin only)
export const deleteBlog = createAsyncThunk(
    "blog/deleteBlog",
    async (id: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.delete(
                `${server}/blogs/${id}`,
                config
            );
            return { id, message: response.data.message };
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Publish Blog (Admin only)
export const publishBlog = createAsyncThunk(
    "blog/publishBlog",
    async (id: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.patch(
                `${server}/blogs/${id}/publish`,
                {},
                config
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || error.message
            );
        }
    }
);

// Clear Blog Error
export const clearBlogError = createAsyncThunk(
    "blog/clearError",
    async () => {
        return null;
    }
);
