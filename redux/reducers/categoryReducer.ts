import { createSlice } from "@reduxjs/toolkit";
import {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory,
    updateCategoryOrder,
} from "../actions/categoryActions";

interface CategoryState {
    categories: any[];
    category: any | null;
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: CategoryState = {
    categories: [],
    category: null,
    loading: false,
    error: null,
    message: null,
};

const categorySlice = createSlice({
    name: "categoryManagement",
    initialState,
    reducers: {
        clearCategoryMessage: (state) => {
            state.message = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        // Get all categories
        builder
            .addCase(getAllCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload.categories || [];
            })
            .addCase(getAllCategories.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Get single category
        builder
            .addCase(getCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.category = action.payload;
            })
            .addCase(getCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Create category
        builder
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                state.categories.push(action.payload.category);
            })
            .addCase(createCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update category
        builder
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
                const index = state.categories.findIndex(
                    (cat) => cat._id === action.payload.category._id
                );
                if (index !== -1) {
                    state.categories[index] = action.payload.category;
                }
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Delete category
        builder
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });

        // Update category order
        builder
            .addCase(updateCategoryOrder.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategoryOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.message = action.payload.message;
            })
            .addCase(updateCategoryOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { clearCategoryMessage } = categorySlice.actions;
export default categorySlice.reducer;
