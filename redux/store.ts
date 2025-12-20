// redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { courseReducer } from "./reducers/courseReducer";
import categoryReducer from "./reducers/categoryReducer";
import menuReducer from "./reducers/menuReducer";
import cartReducer from "./features/cartSlice";
import wishlistReducer from "./features/wishlistSlice";
import courseSliceReducer from "./features/courseSlice";
import { paymentReducer } from "./reducers/paymentReducer";
import { settingsReducer } from "./reducers/settingsReducer";
import { blogReducer } from "./reducers/blogReducer";
import { blogCategoryReducer } from "./reducers/blogCategoryReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    courses: courseSliceReducer,
    courseManagement: courseReducer,
    categoryManagement: categoryReducer,
    menuManagement: menuReducer,
    paymentManagement: paymentReducer,
    settingsManagement: settingsReducer,
    blogManagement: blogReducer,
    blogCategoryManagement: blogCategoryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
