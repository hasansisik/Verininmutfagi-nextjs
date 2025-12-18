import ResetPassword from "@/components/inner-pages/reset-password";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Şifre Sıfırla - Verinin Mutfağı",
   description: "Yeni şifrenizi belirleyin ve hesabınıza tekrar erişim sağlayın.",
};
const index = () => {
   return (
      <Wrapper>
         <ResetPassword />
      </Wrapper>
   )
}

export default index



