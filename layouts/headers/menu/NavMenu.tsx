"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllMenuItems } from "@/redux/actions/menuActions";

interface SubMenu {
   title: string;
   link: string;
}

interface MenuItem {
   _id: string;
   title: string;
   link: string;
   hasDropdown: boolean;
   subMenus: SubMenu[];
   order: number;
   isActive: boolean;
}

const NavMenu = () => {
   const dispatch = useAppDispatch();
   const { menuItems, loading } = useAppSelector((state) => state.menuManagement);
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

   useEffect(() => {
      dispatch(getAllMenuItems());
   }, [dispatch]);

   const toggleMenu = (menuId: string) => {
      setOpenMenuId(openMenuId === menuId ? null : menuId);
   };

   if (loading) {
      return <ul className="navigation"></ul>;
   }

   // Sadece aktif menüleri filtrele
   const activeMenuItems = menuItems.filter((menu: MenuItem) => menu.isActive);

   return (
      <ul className="navigation">
         {activeMenuItems.map((menu: MenuItem) => {
            const hasChildren = menu.hasDropdown && menu.subMenus && menu.subMenus.length > 0;
            const isOpen = openMenuId === menu._id;

            return (
               <li
                  key={menu._id}
                  className={`${hasChildren ? "menu-item-has-children" : ""}`}
               >
                  <Link href={menu.link}>{menu.title}</Link>
                  {hasChildren && (
                     <>
                        <ul className="sub-menu" style={{ display: isOpen ? "block" : "none" }}>
                           {menu.subMenus.map((subMenu, index) => {
                              return (
                                 <li key={index}>
                                    <Link href={subMenu.link}>{subMenu.title}</Link>
                                 </li>
                              );
                           })}
                        </ul>
                        <div
                           className={`dropdown-btn ${isOpen ? "open" : ""}`}
                           onClick={() => toggleMenu(menu._id)}
                        >
                           <span className="plus-line"></span>
                        </div>
                     </>
                  )}
               </li>
            );
         })}
      </ul>
   );
};

export default NavMenu;
