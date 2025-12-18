"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

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
   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
   const [loading, setLoading] = useState(true);
   const [openMenuId, setOpenMenuId] = useState<string | null>(null);

   useEffect(() => {
      fetchMenuItems();
   }, []);

   const fetchMenuItems = async () => {
      try {
         const response = await axios.get("http://localhost:3040/v1/menu?isActive=true");
         if (response.data.success) {
            setMenuItems(response.data.menuItems);
         }
      } catch (error) {
         console.error("Menü yüklenirken hata:", error);
      } finally {
         setLoading(false);
      }
   };

   const toggleMenu = (menuId: string) => {
      setOpenMenuId(openMenuId === menuId ? null : menuId);
   };

   if (loading) {
      return <ul className="navigation"></ul>;
   }

   return (
      <ul className="navigation">
         {menuItems.map((menu) => {
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
