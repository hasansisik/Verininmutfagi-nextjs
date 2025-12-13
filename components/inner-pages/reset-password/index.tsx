import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import ResetPasswordArea from "./ResetPasswordArea"

const ResetPassword = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <ResetPasswordArea />
         </main>
         <FooterOne />
      </>
   )
}

export default ResetPassword


