import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

// Get all courses
export const getAllCourses = createAsyncThunk(
    "courses/getAll",
    async (filters: { category?: string; isActive?: boolean; popular?: boolean } = {}, thunkAPI) => {
        try {
            const params = new URLSearchParams();
            if (filters.category) params.append("category", filters.category);
            if (filters.isActive !== undefined) params.append("isActive", String(filters.isActive));
            if (filters.popular !== undefined) params.append("popular", String(filters.popular));

            const { data } = await axios.get(`${server}/courses?${params.toString()}`);
            return data.courses;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Get single course
export const getCourse = createAsyncThunk(
    "courses/getOne",
    async (id: string, thunkAPI) => {
        try {
            const { data } = await axios.get(`${server}/courses/${id}`);
            return data.course;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Get course by slug
export const getCourseBySlug = createAsyncThunk(
    "courses/getBySlug",
    async (slug: string, thunkAPI) => {
        try {
            const { data } = await axios.get(`${server}/courses/slug/${slug}`);
            return data.course;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Create course
export const createCourse = createAsyncThunk(
    "courses/create",
    async (courseData: any, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const { data } = await axios.post(`${server}/courses`, courseData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.course;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Update course
export const updateCourse = createAsyncThunk(
    "courses/update",
    async ({ id, courseData }: { id: string; courseData: any }, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const { data } = await axios.patch(`${server}/courses/${id}`, courseData, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return data.course;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Delete course
export const deleteCourse = createAsyncThunk(
    "courses/delete",
    async (id: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            await axios.delete(`${server}/courses/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            return id;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Upload video
export const uploadVideo = createAsyncThunk(
    "courses/uploadVideo",
    async (videoFile: File, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const formData = new FormData();
            formData.append("video", videoFile);

            const { data } = await axios.post(`${server}/courses/upload-video`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
        }
    }
);

// Clear errors
export const clearError = createAsyncThunk("courses/clearError", async () => {
    return null;
});
