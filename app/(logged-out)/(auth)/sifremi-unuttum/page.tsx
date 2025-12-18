import ForgotPassword from "@/components/inner-pages/forgot-password";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Şifremi Unuttum - Verinin Mutfağı",
   description: "Şifrenizi sıfırlamak için e-posta adresinizi girin.",
};
const index = () => {
   return (
      <Wrapper>
         <ForgotPassword />
      </Wrapper>
   )
}

export default index



