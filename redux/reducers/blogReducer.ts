import { createReducer } from "@reduxjs/toolkit";
import {
    getAllBlogs,
    getBlogBySlug,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog,
    publishBlog,
    clearBlogError,
    Blog
} from "../actions/blogActions";

interface BlogState {
    blogs: Blog[];
    currentBlog: Blog | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    } | null;
}

const initialState: BlogState = {
    blogs: [],
    currentBlog: null,
    loading: false,
    error: null,
    message: null,
    pagination: null
};

export const blogReducer = createReducer(initialState, (builder) => {
    builder
        // Get All Blogs
        .addCase(getAllBlogs.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getAllBlogs.fulfilled, (state, action) => {
            state.loading = false;
            state.blogs = action.payload.blogs;
            state.pagination = action.payload.pagination;
            state.error = null;
        })
        .addCase(getAllBlogs.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Get Blog by Slug
        .addCase(getBlogBySlug.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.currentBlog = null;
        })
        .addCase(getBlogBySlug.fulfilled, (state, action) => {
            state.loading = false;
            state.currentBlog = action.payload;
            state.error = null;
        })
        .addCase(getBlogBySlug.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
            state.currentBlog = null;
        })

        // Get Blog by ID
        .addCase(getBlogById.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(getBlogById.fulfilled, (state, action) => {
            state.loading = false;
            state.currentBlog = action.payload;
            state.error = null;
        })
        .addCase(getBlogById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Create Blog
        .addCase(createBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(createBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.blogs.unshift(action.payload.blog);
            state.error = null;
        })
        .addCase(createBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Blog
        .addCase(updateBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            const index = state.blogs.findIndex(blog => blog._id === action.payload.blog._id);
            if (index !== -1) {
                state.blogs[index] = action.payload.blog;
            }
            if (state.currentBlog?._id === action.payload.blog._id) {
                state.currentBlog = action.payload.blog;
            }
            state.error = null;
        })
        .addCase(updateBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete Blog
        .addCase(deleteBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            state.blogs = state.blogs.filter(blog => blog._id !== action.payload.id);
            state.error = null;
        })
        .addCase(deleteBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Publish Blog
        .addCase(publishBlog.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(publishBlog.fulfilled, (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
            const index = state.blogs.findIndex(blog => blog._id === action.payload.blog._id);
            if (index !== -1) {
                state.blogs[index] = action.payload.blog;
            }
            state.error = null;
        })
        .addCase(publishBlog.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Clear Error
        .addCase(clearBlogError.fulfilled, (state) => {
            state.error = null;
            state.message = null;
        });
});

export default blogReducer;
