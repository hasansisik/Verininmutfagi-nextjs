import Login from "@/components/inner-pages/login";
import Registration from "@/components/inner-pages/registration";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Giriş Yap - Verinin Mutfağı",
   description: "Verinin Mutfağı hesabınıza giriş yapın ve kurslarınıza devam edin.",
};
const index = () => {
   return (
      <Wrapper>
         <Login />
      </Wrapper>
   )
}

export default index