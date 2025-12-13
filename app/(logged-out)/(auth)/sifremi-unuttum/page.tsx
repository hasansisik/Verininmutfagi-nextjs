import ForgotPassword from "@/components/inner-pages/forgot-password";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Şifremi Unuttum - SkillGro",
};
const index = () => {
   return (
      <Wrapper>
         <ForgotPassword />
      </Wrapper>
   )
}

export default index

