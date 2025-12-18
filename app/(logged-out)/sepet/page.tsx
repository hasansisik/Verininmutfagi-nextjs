import Cart from "@/components/inner-shop/cart";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Sepetim - Verinin Mutfağı",
   description: "Alışveriş sepetinizdeki kursları görüntüleyin ve ödeme işlemini tamamlayın.",
};
const page = () => {
   return (
      <Wrapper>
         <Cart />
      </Wrapper>
   )
}

export default page