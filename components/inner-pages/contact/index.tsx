import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import ContactArea from "./ContactArea"

const Contact = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="İletişim" sub_title="İletişim" />
            <ContactArea />
         </main>
         <FooterOne />
      </>
   )
}

export default Contact

