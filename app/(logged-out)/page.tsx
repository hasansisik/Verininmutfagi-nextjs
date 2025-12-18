import HomeOne from "@/components/homes/home-one";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
  title: "Verinin Mutfağı - Online Kurslar ve Eğitim Platformu",
  description: "Verinin Mutfağı ile veri bilimi, programlama ve teknoloji alanında online kurslarla kendinizi geliştirin.",
};
const index = () => {
  return (
    <Wrapper>
      <HomeOne />
    </Wrapper>
  )
}

export default index