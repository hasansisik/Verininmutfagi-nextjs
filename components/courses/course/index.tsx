import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import CourseArea from "./CourseArea"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"

const Course = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Tüm Kurslar" sub_title="Kurslar" />
            <CourseArea />
         </main>
         <FooterOne />
      </>
   )
}

export default Course
