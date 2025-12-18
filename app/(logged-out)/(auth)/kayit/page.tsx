import Registration from "@/components/inner-pages/registration";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Kayıt Ol - Verinin Mutfağı",
   description: "Verinin Mutfağı'na üye olun ve binlerce kursa erişim sağlayın.",
};
const index = () => {
   return (
      <Wrapper>
         <Registration />
      </Wrapper>
   )
}

export default index