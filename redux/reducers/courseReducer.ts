import { createReducer } from "@reduxjs/toolkit";
import {
    getAllCourses,
    getCourse,
    getCourseBySlug,
    createCourse,
    updateCourse,
    deleteCourse,
    uploadVideo,
    clearError,
} from "../actions/courseActions";

interface Course {
    _id: string;
    slug: string;
    title: string;
    category: any;
    price: number;
    price_type?: string;
    thumb?: string;
    rating?: number;
    ratingCount?: number;
    instructors?: string;
    skill_level?: string;
    isActive?: boolean;
    // ... other fields
}

interface CourseState {
    courses: Course[];
    course: Course | null;
    loading: boolean;
    error: string | null;
    message: string | null;
    uploadingVideo: boolean;
    videoUrl: string | null;
}

const initialState: CourseState = {
    courses: [],
    course: null,
    loading: false,
    error: null,
    message: null,
    uploadingVideo: false,
    videoUrl: null,
};

export const courseReducer = createReducer(initialState, (builder) => {
    builder
        // Get all courses
        .addCase(getAllCourses.pending, (state) => {
            state.loading = true;
        })
        .addCase(getAllCourses.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = action.payload;
        })
        .addCase(getAllCourses.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Get single course
        .addCase(getCourse.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.course = action.payload;
        })
        .addCase(getCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Get course by slug
        .addCase(getCourseBySlug.pending, (state) => {
            state.loading = true;
        })
        .addCase(getCourseBySlug.fulfilled, (state, action) => {
            state.loading = false;
            state.course = action.payload;
        })
        .addCase(getCourseBySlug.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Create course
        .addCase(createCourse.pending, (state) => {
            state.loading = true;
        })
        .addCase(createCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.courses.push(action.payload);
            state.message = "Kurs başarıyla oluşturuldu";
        })
        .addCase(createCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update course
        .addCase(updateCourse.pending, (state) => {
            state.loading = true;
        })
        .addCase(updateCourse.fulfilled, (state, action) => {
            state.loading = false;
            const index = state.courses.findIndex((c) => c._id === action.payload._id);
            if (index !== -1) {
                state.courses[index] = action.payload;
            }
            state.message = "Kurs başarıyla güncellendi";
        })
        .addCase(updateCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete course
        .addCase(deleteCourse.pending, (state) => {
            state.loading = true;
        })
        .addCase(deleteCourse.fulfilled, (state, action) => {
            state.loading = false;
            state.courses = state.courses.filter((c) => c._id !== action.payload);
            state.message = "Kurs başarıyla silindi";
        })
        .addCase(deleteCourse.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Upload video
        .addCase(uploadVideo.pending, (state) => {
            state.uploadingVideo = true;
        })
        .addCase(uploadVideo.fulfilled, (state, action) => {
            state.uploadingVideo = false;
            state.videoUrl = action.payload.videoUrl;
            state.message = "Video başarıyla yüklendi";
        })
        .addCase(uploadVideo.rejected, (state, action) => {
            state.uploadingVideo = false;
            state.error = action.payload as string;
        })

        // Clear error
        .addCase(clearError.fulfilled, (state) => {
            state.error = null;
            state.message = null;
        });
});
