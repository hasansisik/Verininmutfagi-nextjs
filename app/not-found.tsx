import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import ErrorArea from "@/components/inner-pages/error/ErrorArea";
import Wrapper from "@/layouts/Wrapper";
import "./(logged-out)/logged-out.scss";

export const metadata = {
   title: "Sayfa Bulunamadı - Verinin Mutfağı",
   description: "Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya kurslarımıza göz atabilirsiniz.",
};
const page = () => {
   return (
      <Wrapper>
         <HeaderOne />
         <main className="main-area fix">
            <ErrorArea />
         </main>
         <FooterOne />
      </Wrapper>
   )
}

export default page

