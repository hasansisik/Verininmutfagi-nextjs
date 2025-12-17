import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import LessonArea from "./LessonArea"

interface LessonProps {
   course: any;
}

const Lesson = ({ course }: LessonProps) => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <LessonArea course={course} />
         </main>
         <FooterOne />
      </>
   )
}

export default Lesson
