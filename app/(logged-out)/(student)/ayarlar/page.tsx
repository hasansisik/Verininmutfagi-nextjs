import StudentSetting from "@/dashboard/student-dashboard/student-setting";
import Wrapper from "@/layouts/Wrapper";

export const metadata = {
   title: "Ayarlar - Verinin Mutfağı",
   description: "Hesap ayarlarınızı ve tercihlerinizi yönetin.",
};
const index = () => {
   return (
      <Wrapper>
         <StudentSetting />
      </Wrapper>
   )
}

export default index