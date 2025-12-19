"use client"

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCourseBySlug } from "@/redux/actions/courseActions";

import Lesson from "@/components/courses/lesson";
import Wrapper from "@/layouts/Wrapper";

export default function Page() {
    const params = useParams();
    const slug = params.slug as string;
    const dispatch = useAppDispatch();

    const { course, loading } = useAppSelector((state) => state.courseManagement);
    const [notFoundFlag, setNotFoundFlag] = useState(false);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                await dispatch(getCourseBySlug(slug)).unwrap();
            } catch (error) {
                console.error("Kurs yüklenirken hata:", error);
                setNotFoundFlag(true);
            }
        };

        fetchCourse();
    }, [slug, dispatch]);

    if (loading) {
        return (
            <Wrapper>
                <div className="container">
                    <div className="text-center py-5">Yükleniyor...</div>
                </div>
            </Wrapper>
        );
    }

    if (notFoundFlag || !course) {
        notFound();
    }

    return (
        <Wrapper>
            <Lesson course={course} />
        </Wrapper>
    );
}
