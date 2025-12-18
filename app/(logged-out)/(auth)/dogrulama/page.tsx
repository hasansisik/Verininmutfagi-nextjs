import Verification from "@/components/inner-pages/verification";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Doğrulama - Verinin Mutfağı",
   description: "E-posta adresinizi doğrulayın ve hesabınızı aktifleştirin.",
};
const index = () => {
   return (
      <Wrapper>
         <Verification />
      </Wrapper>
   )
}

export default index



