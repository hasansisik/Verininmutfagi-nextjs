"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
   const pathname = usePathname();
   const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
   const [loading, setLoading] = useState(true);

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

   const isActive = (href: string) => pathname === href;

   const isAnyChildActive = (subMenus: SubMenu[] = []) =>
      subMenus.some((sub) => pathname === sub.link);

   if (loading) {
      return <ul className="navigation"></ul>;
   }

   return (
      <ul className="navigation">
         {menuItems.map((menu) => {
            const hasChildren = menu.hasDropdown && menu.subMenus && menu.subMenus.length > 0;
            const isParentActive = isActive(menu.link) || isAnyChildActive(menu.subMenus);

            return (
               <li
                  key={menu._id}
                  className={`${hasChildren ? "menu-item-has-children" : ""} ${isParentActive ? "active" : ""}`}
               >
                  <Link href={menu.link}>{menu.title}</Link>
                  {hasChildren && (
                     <ul className="sub-menu">
                        {menu.subMenus.map((subMenu, index) => {
                           const isSubActive = isActive(subMenu.link);
                           return (
                              <li key={index} className={isSubActive ? "active" : ""}>
                                 <Link href={subMenu.link}>{subMenu.title}</Link>
                              </li>
                           );
                        })}
                     </ul>
                  )}
               </li>
            );
         })}
      </ul>
   );
};

export default NavMenu;
