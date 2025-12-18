"use client"
import { useEffect } from "react"
import Image from "next/image"
import InjectableSvg from "@/hooks/InjectableSvg"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

import img_1 from "@/assets/img/courses/details_instructors02.jpg"

const DashboardBannerTwo = () => {
   const dispatch = useAppDispatch();
   const { user, loading } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   if (loading) {
      return (
         <div className="dashboard__top-wrap">
            <div className="dashboard__top-bg" style={{ backgroundImage: `url(/assets/img/bg/student_bg.jpg)` }}></div>
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

   return (
      <div className="dashboard__top-wrap">
         <div className="dashboard__top-bg" style={{ backgroundImage: `url(/assets/img/bg/student_bg.jpg)` }}></div>
         <div className="dashboard__instructor-info">
            <div className="dashboard__instructor-info-left">
               <div className="thumb">
                  {user?.avatar ? (
                     <Image src={user.avatar} alt={user.name || 'User'} width={100} height={100} />
                  ) : (
                     <Image src={img_1} alt="img" />
                  )}
               </div>
               <div className="content">
                  <h4 className="title">{user?.name || 'Kullanıcı'}</h4>
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
