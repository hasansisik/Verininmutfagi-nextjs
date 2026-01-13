"use client"
import { useEffect } from "react"
import Count from "@/components/common/Count"
import DashboardBannerTwo from "@/dashboard/dashboard-common/DashboardBannerTwo"
import DashboardCourse from "@/dashboard/dashboard-common/DashboardCourse"
import DashboardSidebarTwo from "@/dashboard/dashboard-common/DashboardSidebarTwo"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

const StudentDashboardArea = () => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   const dashboardStats = [
      {
         id: 1,
         icon: "skillgro-book",
         count: user?.enrolledCourses?.length || 0,
         title: "Kayıtlı Kurslar"
      },
      {
         id: 2,
         icon: "skillgro-video-tutorial",
         count: user?.credits || 0,
         title: "Kredi bakiyenizi eğitim olarak değiştirin",
         link: "/krediyi-kullan",
         linkText: "Krediyi Kullan"
      },
      {
         id: 3,
         icon: "skillgro-graduated",
         count: user?.orders?.filter((order: any) => order.status === 'completed')?.length || 0,
         title: "Tamamlanan Siparişler"
      }
   ];

   return (
      <section className="dashboard__area section-pb-120" style={{ background: "#ffffff" }}>
         <div className="container">
            <DashboardBannerTwo />
            <div className="dashboard__inner-wrap">
               <div className="row">
                  <DashboardSidebarTwo />
                  <div className="col-lg-9">
                     <div className="dashboard__count-wrap">
                        <div className="dashboard__content-title">
                           <h4 className="title">Kontrol Paneli</h4>
                        </div>
                        <div className="row">
                           {dashboardStats.map((item: any) => (
                              <div key={item.id} className="col-lg-4 col-md-4 col-sm-6">
                                 <div className="dashboard__counter-item" style={item.id === 2 ? { background: 'var(--tg-theme-primary)', color: '#fff' } : {}}>
                                    <div className="icon">
                                       <i className={item.icon} style={item.id === 2 ? { color: '#fff' } : {}}></i>
                                    </div>
                                    <div className="content">
                                       <span className="count" style={item.id === 2 ? { color: '#fff' } : {}}><Count number={item.count} /></span>
                                       <p style={{ marginTop: "14px", color: item.id === 2 ? '#fff' : 'inherit' }}>{item.title}</p>
                                       {item.link && (
                                          <a href={item.link} style={{
                                             color: '#fff',
                                             textDecoration: 'underline',
                                             fontSize: '14px',
                                             display: 'block',
                                             marginTop: '5px'
                                          }}>
                                             {item.linkText}
                                          </a>
                                       )}
                                    </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                     <DashboardCourse />
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default StudentDashboardArea
