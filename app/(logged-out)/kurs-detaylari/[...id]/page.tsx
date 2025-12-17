import type { Metadata } from "next";
import { notFound } from "next/navigation";

import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import CourseDetailsArea from "@/components/courses/course-details/CourseDetailsArea";
import courses_data from "@/data/inner-data/InnerCourseData";
import FooterOne from "@/layouts/footers/FooterOne";
import HeaderOne from "@/layouts/headers/HeaderOne";
import Wrapper from "@/layouts/Wrapper";

export const metadata: Metadata = {
   title: "Course Details Verinin Mutfağı - Online Courses & Education React Next js Template",
};

type Props = {
   params: Promise<{ id: string[] }>;
};

export default async function Page({ params }: Props) {

   const { id } = await params;
   const courseSlug = id[0];

   console.log('Searching for course with slug:', courseSlug);
   console.log('Available courses:', courses_data.map(c => ({ id: c.id, slug: c.slug, title: c.title })));

   const courses = courses_data;
   const single_course = courses.find((item) => item.slug === courseSlug);

   console.log('Found course:', single_course ? single_course.title : 'NOT FOUND');

   if (!single_course) {
      notFound();
   }

   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <CourseDetailsArea single_course={single_course} />
         </main>
         <FooterOne />
      </Wrapper>
   )
}