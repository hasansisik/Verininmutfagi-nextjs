"use client"
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from 'next/navigation'
import { useAppDispatch } from "@/redux/hook";
import { logout } from "@/redux/actions/userActions";

interface DataType {
   id: number;
   title: string;
   class_name?: string;
   sidebar_details: {
      id: number;
      link: string;
      icon: string;
      title: string;
   }[];
}[];

const sidebar_data: DataType[] = [
   {
      id: 1,
      title: "Hoş Geldiniz",
      sidebar_details: [
         {
            id: 1,
            link: "/panelim",
            icon: "fas fa-home",
            title: "Eğitim Paneli",
         },
         {
            id: 2,
            link: "/kayitli-kurslar",
            icon: "skillgro-book",
            title: "Kayıtlı Kurslar",
         },
      ],
   },
   {
      id: 2,
      title: "Kullanıcı",
      class_name: "mt-30",
      sidebar_details: [
         {
            id: 1,
            link: "/ayarlar",
            icon: "skillgro-settings",
            title: "Ayarlar",
         },
         {
            id: 2,
            link: "/",
            icon: "skillgro-logout",
            title: "Çıkış",
         },
      ],
   },
];

const DashboardSidebarTwo = () => {

   const pathname = usePathname();
   const dispatch = useAppDispatch();
   const router = useRouter();

   const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      await dispatch(logout());
      router.push("/");
   };

   return (
      <div className="col-lg-3">
         <div className="dashboard__sidebar-wrap">
            {sidebar_data.map((item) => (
               <React.Fragment key={item.id}>
                  <div className={`dashboard__sidebar-title mb-20 ${item.class_name}`}>
                     <h6 className="title">{item.title}</h6>
                  </div>
                  <nav className="dashboard__sidebar-menu">
                     <ul className="list-wrap">
                        {item.sidebar_details.map((list) => (
                           <li key={list.id} className={pathname === list.link ? 'active' : ''}>
                              <Link
                                 href={list.link}
                                 onClick={list.title === "Çıkış" ? handleLogout : undefined}
                              >
                                 <i className={list.icon}></i>
                                 {list.title}
                              </Link>
                           </li>
                        ))}
                     </ul>
                  </nav>
               </React.Fragment>
            ))}
         </div>
      </div>
   )
}

export default DashboardSidebarTwo
