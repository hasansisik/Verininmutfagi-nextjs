import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3040/v1";

export const getAllOrders = createAsyncThunk(
    "payment/getAllOrders",
    async (_, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(`${API_URL}/payment/all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.orders;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || "Ödemeler alınamadı");
        }
    }
);
