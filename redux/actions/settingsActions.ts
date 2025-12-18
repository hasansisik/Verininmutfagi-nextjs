import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "@/config";

export const getSettings = createAsyncThunk(
    "settings/getSettings",
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.get(`${server}/settings`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.settings;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Ayarlar alınamadı");
        }
    }
);

export const updateSettings = createAsyncThunk(
    "settings/updateSettings",
    async (settingsData: any, thunkAPI) => {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await axios.patch(`${server}/settings`, settingsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.settings;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Ayarlar güncellenemedi");
        }
    }
);
