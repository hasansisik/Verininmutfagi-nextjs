import StudentDashboard from "@/dashboard/student-dashboard/student-dashboard";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Öğrenci Paneli - Verinin Mutfağı",
   description: "Öğrenci panelinizden kurslarınızı ve ilerlemenizi takip edin.",
};
const index = () => {
   return (
      <Wrapper>
         <StudentDashboard />
      </Wrapper>
   )
}

export default index