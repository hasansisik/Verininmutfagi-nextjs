import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Lesson from "@/components/courses/lesson";
import courses_data from "@/data/inner-data/InnerCourseData";
import Wrapper from "@/layouts/Wrapper";

export const metadata: Metadata = {
    title: "Lesson Verinin Mutfağı - Online Courses & Education React Next js Template",
    description: "Verinin Mutfağı ile veri bilimi ve analitik derslerine katılın. Online eğitim platformumuzda uzman eğitmenlerden ders alın.",
};

type Props = {
    params: Promise<{ slug: string }>;
};

export default async function Page({ params }: Props) {
    const { slug } = await params;

    console.log('Searching for lesson with slug:', slug);
    console.log('Available courses:', courses_data.map(c => ({ id: c.id, slug: c.slug, title: c.title })));

    const course = courses_data.find((item) => item.slug === slug);

    console.log('Found course for lesson:', course ? course.title : 'NOT FOUND');

    if (!course) {
        notFound();
    }

    return (
        <Wrapper>
            <Lesson course={course} />
        </Wrapper>
    )
}
