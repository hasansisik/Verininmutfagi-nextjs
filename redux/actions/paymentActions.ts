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

export const getPaymentToken = createAsyncThunk(
    "payment/getToken",
    async (paymentData: any, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(`${server}/payment/get-token`, paymentData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.msg || error.message);
        }
    }
);

export const verifyOrder = createAsyncThunk(
    "payment/verifyOrder",
    async (merchant_oid: string, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.post(
                `${server}/payment/verify-order`,
                { merchant_oid },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Ödeme doğrulanamadı");
        }
    }
);
