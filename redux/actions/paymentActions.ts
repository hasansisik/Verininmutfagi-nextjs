import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

export const getAllOrders = createAsyncThunk(
    "payment/getAllOrders",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${server}/payment/all-orders`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.orders;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Ödemeler alınamadı");
        }
    }
);
