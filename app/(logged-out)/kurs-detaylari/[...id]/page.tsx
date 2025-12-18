"use client"

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import { server } from "@/config";

import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import CourseDetailsArea from "@/components/courses/course-details/CourseDetailsArea";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export default function Page() {
   const params = useParams();
   const courseSlug = Array.isArray(params.id) ? params.id[0] : params.id;

   const [course, setCourse] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   const [notFoundFlag, setNotFoundFlag] = useState(false);

   useEffect(() => {
      fetchCourse();
   }, [courseSlug]);

   const fetchCourse = async () => {
      try {
         const response = await axios.get(`${server}/courses`);
         if (response.data.success) {
            const foundCourse = response.data.courses.find((item: any) => item.slug === courseSlug);
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
            <CourseDetailsArea single_course={course} />
         </main>
         <FooterOne />
      </Wrapper>
   )
}