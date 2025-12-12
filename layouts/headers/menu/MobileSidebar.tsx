import Image from "next/image"
import Link from "next/link"
import MobileMenu from "./MobileMenu"

import logo from "@/assets/img/logo/logo.svg"

interface MobileMenuProps {
   isActive: boolean;
   setIsActive: (isActive: boolean) => void;
}

const MobileSidebar = ({ isActive, setIsActive }: MobileMenuProps) => {

   return (
      <div className={isActive ? "mobile-menu-visible" : ""}>
         <div className="tgmobile__menu">
            <nav className="tgmobile__menu-box">
               <div onClick={() => setIsActive(false)} className="close-btn"><i className="tg-flaticon-close-1"></i></div>
               <div className="nav-logo">
                  <Link href="/"><Image src={logo} alt="Logo" /></Link>
               </div>
               <div className="tgmobile__search">
                  <form action="#">
                     <input type="text" placeholder="Search here..." />
                     <button><i className="fas fa-search"></i></button>
                  </form>
               </div>
               <div className="tgmobile__menu-outer">
                  <MobileMenu />
               </div>
              
            </nav>
         </div>
         <div className="tgmobile__menu-backdrop"></div>
      </div>
   )
}

export default MobileSidebar
