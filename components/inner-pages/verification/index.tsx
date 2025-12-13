import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import VerificationArea from "./VerificationArea"

const Verification = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <VerificationArea />
         </main>
         <FooterOne />
      </>
   )
}

export default Verification


