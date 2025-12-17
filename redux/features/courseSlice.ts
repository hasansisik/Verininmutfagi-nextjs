import { createSlice } from "@reduxjs/toolkit";

interface Course {
    id: string;
    title: string;
    category: string;
    price?: number;
}

interface CourseState {
    courses: Course[];
}

const initialState: CourseState = {
    courses: [],
};

const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload;
        },
    },
});

export const { setCourses } = courseSlice.actions;
export const selectCourses = (state: { courses: CourseState }) => state.courses.courses;
export default courseSlice.reducer;
