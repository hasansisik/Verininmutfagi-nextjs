import { createReducer } from "@reduxjs/toolkit";
import { getAllOrders } from "../actions/paymentActions";

interface PaymentState {
    allOrders: any[];
    loading: boolean;
    error: string | null;
}

const initialState: PaymentState = {
    allOrders: [],
    loading: false,
    error: null,
};

export const paymentReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getAllOrders.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.allOrders = action.payload;
        })
        .addCase(getAllOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
});
