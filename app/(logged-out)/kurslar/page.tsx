import Course from "@/components/courses/course";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Kurslar - Verinin Mutfağı",
   description: "Tüm kurslarımızı keşfedin. Veri bilimi, programlama, analitik ve daha fazlası.",
};
const page = () => {
   return (
      <Wrapper>
         <Course />
      </Wrapper>
   )
}

export default page