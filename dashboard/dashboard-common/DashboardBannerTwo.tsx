"use client"
import { useEffect } from "react"
import Image from "next/image"
import InjectableSvg from "@/hooks/InjectableSvg"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

const DashboardBannerTwo = () => {
   const dispatch = useAppDispatch();
   const { user, loading } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   if (loading) {
      return (
         <div className="dashboard__top-wrap">
            <div
               className="dashboard__top-bg"
               style={{
                  backgroundImage: `url(/cover.png)`,
                  position: 'relative',
                  boxShadow: 'none'
               }}
            >
               <style jsx>{`
                .dashboard__top-bg::before,
                .dashboard__top-bg::after {
                   display: none !important;
                   content: none !important;
                   background: none !important;
                }
             `}</style>
            </div>
            <div className="dashboard__instructor-info">
               <div className="dashboard__instructor-info-left">
                  <div className="content">
                     <h4 className="title">Yükleniyor...</h4>
                  </div>
               </div>
            </div>
         </div>
      );
   }

   const profilePicture = user?.profile?.picture || "https://res.cloudinary.com/da2qwsrbv/image/upload/v1768314363/Ads%C4%B1z_tasar%C4%B1m_24_s6sudk.png";
   const fullName = user ? `${user.name} ${user.surname || ''}`.trim() : 'Kullanıcı';

   return (
      <div className="dashboard__top-wrap">
         <div
            className="dashboard__top-bg"
            style={{
               backgroundImage: `url(/cover.png)`,
               position: 'relative',
               boxShadow: 'none'
            }}
         >
            <style jsx>{`
                .dashboard__top-bg::before,
                .dashboard__top-bg::after {
                   display: none !important;
                   content: none !important;
                   background: none !important;
                }
             `}</style>
         </div>
         <div className="dashboard__instructor-info">
            <div className="dashboard__instructor-info-left">
               <div className="thumb">
                  <Image
                     src={profilePicture}
                     alt={fullName}
                     width={100}
                     height={100}
                     style={{ objectFit: 'cover', borderRadius: '50%' }}
                  />
               </div>
               <div className="content">
                  <h4 className="title">{fullName}</h4>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        {user?.enrolledCourses?.length || 0} Kursa Kayıtlı
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   )
}

export default DashboardBannerTwo
