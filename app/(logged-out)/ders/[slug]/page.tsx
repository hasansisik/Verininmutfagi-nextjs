"use client"

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { server } from "@/config";

import Lesson from "@/components/courses/lesson";
import Wrapper from "@/layouts/Wrapper";

export default function Page() {
    const params = useParams();
    const slug = params.slug as string;

    const [course, setCourse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [notFoundFlag, setNotFoundFlag] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [slug]);

    const fetchCourse = async () => {
        try {
            const response = await axios.get(`${server}/courses`);
            if (response.data.success) {
                const foundCourse = response.data.courses.find((item: any) => item.slug === slug);
                if (foundCourse) {
                    setCourse(foundCourse);
                } else {
                    setNotFoundFlag(true);
                }
            }
        } catch (error) {
            console.error("Kurs yüklenirken hata:", error);
            setNotFoundFlag(true);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <Wrapper>
                <div className="container">
                    <div className="text-center py-5">Ders yükleniyor...</div>
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
    )
}
