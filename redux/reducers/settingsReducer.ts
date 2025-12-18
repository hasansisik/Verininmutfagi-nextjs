import { createReducer } from "@reduxjs/toolkit";
import { getSettings, updateSettings } from "../actions/settingsActions";

interface SettingsState {
    settings: any;
    loading: boolean;
    error: string | null;
    message: string | null;
}

const initialState: SettingsState = {
    settings: null,
    loading: false,
    error: null,
    message: null,
};

export const settingsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(getSettings.pending, (state) => {
            state.loading = true;
        })
        .addCase(getSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.settings = action.payload;
        })
        .addCase(getSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
        .addCase(updateSettings.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateSettings.fulfilled, (state, action) => {
            state.loading = false;
            state.settings = action.payload;
            state.message = "Ayarlar başarıyla güncellendi";
        })
        .addCase(updateSettings.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
});
