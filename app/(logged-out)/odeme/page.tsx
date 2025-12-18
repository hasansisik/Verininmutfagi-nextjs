import CheckOut from "@/components/inner-shop/check-out";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Ödeme - Verinin Mutfağı",
   description: "Güvenli ödeme sayfamızdan kurs satın alımınızı tamamlayın.",
};
const page = () => {
   return (
      <Wrapper>
         <CheckOut />
      </Wrapper>
   )
}

export default page