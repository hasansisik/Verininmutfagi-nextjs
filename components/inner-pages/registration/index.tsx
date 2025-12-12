import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import RegistrationArea from "./RegistrationArea"

const Registration = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <RegistrationArea />
         </main>
         <FooterOne />
      </>
   )
}

export default Registration

