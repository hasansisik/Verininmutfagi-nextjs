import DashboardBannerTwo from "@/dashboard/dashboard-common/DashboardBannerTwo"
import DashboardSidebarTwo from "@/dashboard/dashboard-common/DashboardSidebarTwo"
import InstructorHistoryContent from "@/dashboard/instructor-dashboard/instructor-history/InstructorHistoryContent"

const StudentHistoryArea = () => {
   return (
      <section className="dashboard__area section-pb-120" style={{ background: "#ffffff" }}>
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <InstructorHistoryContent />
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentHistoryArea
