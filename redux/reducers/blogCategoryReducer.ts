import { createReducer } from '@reduxjs/toolkit';
import {
    getAllBlogCategories,
    getBlogCategory,
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    BlogCategory
} from '../actions/blogCategoryActions';

interface BlogCategoryState {
    categories: BlogCategory[];
    currentCategory: BlogCategory | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: BlogCategoryState = {
    categories: [],
    currentCategory: null,
    loading: false,
    error: null,
    message: null,
};

export const blogCategoryReducer = createReducer(initialState, (builder) => {
    builder
        // Get all categories
        .addCase(getAllBlogCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllBlogCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = action.payload.categories;
        })
        .addCase(getAllBlogCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Get single category
        .addCase(getBlogCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBlogCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.currentCategory = action.payload.category;
        })
        .addCase(getBlogCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Create category
        .addCase(createBlogCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createBlogCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories.push(action.payload.category);
            state.message = action.payload.message;
        })
        .addCase(createBlogCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update category
        .addCase(updateBlogCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateBlogCategory.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.categories.findIndex(c => c._id === action.payload.category._id);
            if (index !== -1) {
                state.categories[index] = action.payload.category;
            }
            state.message = action.payload.message;
        })
        .addCase(updateBlogCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete category
        .addCase(deleteBlogCategory.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteBlogCategory.fulfilled, (state, action) => {
            state.loading = false;
            state.categories = state.categories.filter(c => c._id !== action.payload.id);
            state.message = action.payload.message;
        })
        .addCase(deleteBlogCategory.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
});
