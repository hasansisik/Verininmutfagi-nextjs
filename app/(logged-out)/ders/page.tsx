import Lesson from "@/components/courses/lesson";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Lesson Verinin Mutfağı - Online Courses & Education React Next js Template",
   description: "Verinin Mutfağı ile veri bilimi ve analitik derslerine katılın. Online eğitim platformumuzda uzman eğitmenlerden ders alın.",
};
const index = () => {
   return (
      <Wrapper>
         <Lesson />
      </Wrapper>
   )
}

export default index