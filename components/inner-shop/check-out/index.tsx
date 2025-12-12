import HeaderOne from "@/layouts/headers/HeaderOne"
import CheckOutArea from "./CheckOutArea"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import FooterOne from "@/layouts/footers/FooterOne"

const CheckOut = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Ödeme" sub_title="Ödeme" />
            <CheckOutArea />
         </main>
         <FooterOne />
      </>
   )
}

export default CheckOut
