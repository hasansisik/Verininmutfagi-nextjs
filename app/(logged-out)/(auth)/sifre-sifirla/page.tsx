import ResetPassword from "@/components/inner-pages/reset-password";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Şifre Sıfırla - SkillGro",
};
const index = () => {
   return (
      <Wrapper>
         <ResetPassword />
      </Wrapper>
   )
}

export default index


