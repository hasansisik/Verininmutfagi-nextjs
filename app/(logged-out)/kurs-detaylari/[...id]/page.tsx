"use client"

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getCourseBySlug } from "@/redux/actions/courseActions";

import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import CourseDetailsArea from "@/components/courses/course-details/CourseDetailsArea";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export default function Page() {
   const params = useParams();
   const courseSlug = Array.isArray(params.id) ? params.id[0] : params.id;
   const dispatch = useAppDispatch();

   const { course, loading } = useAppSelector((state) => state.courseManagement);
   const [notFoundFlag, setNotFoundFlag] = useState(false);

   useEffect(() => {
      const fetchCourse = async () => {
         if (!courseSlug) {
            setNotFoundFlag(true);
            return;
         }

         try {
            await dispatch(getCourseBySlug(courseSlug)).unwrap();
         } catch (error) {
            console.error("Kurs yüklenirken hata:", error);
            setNotFoundFlag(true);
         }
      };

      fetchCourse();
   }, [courseSlug, dispatch]);

   if (loading) {
      return (
         <Wrapper>
            <HeaderOne />
            <main className="main-area fix">
               <div className="container">
                  <div className="text-center py-5">Yükleniyor...</div>
               </div>
            </main>
            <FooterOne />
         </Wrapper>
      );
   }

   if (notFoundFlag || !course) {
      notFound();
   }

   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title={course.title} sub_title="Kurs Detayları" />
            <CourseDetailsArea course={course} />
         </main>
         <FooterOne />
      </Wrapper>
   );
}