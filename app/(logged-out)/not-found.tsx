import NotFound from "@/components/inner-pages/error";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Sayfa Bulunamadı - Verinin Mutfağı",
   description: "Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya kurslarımıza göz atabilirsiniz.",
};
const page = () => {
   return (
      <Wrapper>
         <NotFound />
      </Wrapper>
   )
}

export default page