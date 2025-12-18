import StudentEnrolledCourses from "@/dashboard/student-dashboard/student-enrolled-courses";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Kayıtlı Kurslar - Verinin Mutfağı",
   description: "Kayıtlı olduğunuz tüm kursları görüntüleyin ve eğitiminize devam edin.",
};
const index = () => {
   return (
      <Wrapper>
         <StudentEnrolledCourses />
      </Wrapper>
   )
}

export default index