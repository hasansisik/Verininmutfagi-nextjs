import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import CourseDetailsArea from "./CourseDetailsArea"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
const CourseDetails = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Resolving Conflicts Between Designers And Engineers" sub_title="Courses" />
            <CourseDetailsArea />
         </main>
         <FooterOne />
      </>
   )
}

export default CourseDetails
