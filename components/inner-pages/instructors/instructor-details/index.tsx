import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import InstructorDetailsArea from "./InstructorDetailsArea"

const InstructorsDetails = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <InstructorDetailsArea />
         </main>
         <FooterOne />
      </>
   )
}

export default InstructorsDetails
