"use client"
import Link from "next/link"
import Image from "next/image"
import NavMenu from "./menu/NavMenu"
import React, { useState, useEffect, useRef } from "react"
import UseSticky from "@/hooks/UseSticky"
import MobileSidebar from "./menu/MobileSidebar"
import InjectableSvg from "@/hooks/InjectableSvg"
import dynamic from "next/dynamic"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"
import UserDropdown from "@/components/common/UserDropdown"

const TotalCart = dynamic(() => import("@/components/common/TotalCart"), { ssr: false });
const CustomSelect = dynamic(() => import("@/ui/CustomSelect"), { ssr: false });

import logo from "@/public/logo.png"

const HeaderOne = () => {

   const [selectedOption, setSelectedOption] = React.useState(null);
   const dispatch = useAppDispatch();
   const { user, isAuthenticated } = useAppSelector((state) => state.user);
   const [showDropdown, setShowDropdown] = useState(false);
   const dropdownRef = useRef<HTMLLIElement>(null);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setShowDropdown(false);
         }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
   }, []);

   const handleSelectChange = (option: React.SetStateAction<null>) => {
      setSelectedOption(option);
   };

   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   return (
      <>
         <header>
            <div id="header-fixed-height"></div>
            <div id="sticky-header" className={`tg-header__area ${sticky ? "sticky-menu" : ""}`}>
               <div className="container custom-container">
                  <div className="row">
                     <div className="col-12">
                        <div className="tgmenu__wrap">
                           <nav className="tgmenu__nav">
                              <div className="logo">
                                 <Link href="/"><Image src={logo} alt="Logo" width={150} height={50} /></Link>
                              </div>
                              <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                                 <NavMenu />
                              </div>
                              <div className="tgmenu__search d-none d-md-block">
                                 <CustomSelect value={selectedOption} onChange={handleSelectChange} />
                              </div>
                              <div className="tgmenu__action">
                                 <ul className="list-wrap">

                                    <li className="mini-cart-icon">
                                       <Link href="/sepet" className="cart-count">
                                          <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="img" />
                                          <TotalCart />
                                       </Link>
                                    </li>
                                    {isAuthenticated && user ? (
                                       <li className="header-btn login-btn" style={{ position: 'relative' }} ref={dropdownRef}>
                                          <button
                                             onClick={() => setShowDropdown(!showDropdown)}
                                             style={{
                                                background: 'none',
                                                border: 'none',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '8px',
                                                padding: '8px 16px',
                                                color: 'inherit'
                                             }}
                                          >
                                             <InjectableSvg src="/assets/img/icons/user.svg" alt="user" className="injectable" />
                                             <span>{user.name}</span>
                                             <i className={`fas fa-chevron-${showDropdown ? 'up' : 'down'}`} style={{ fontSize: '12px' }}></i>
                                          </button>

                                          {showDropdown && (
                                             <UserDropdown onClose={() => setShowDropdown(false)} />
                                          )}
                                       </li>
                                    ) : (
                                       <li className="header-btn login-btn">
                                          <Link href="/giris">Giriş Yap</Link>
                                       </li>
                                    )}
                                 </ul>
                              </div>
                              <div className="mobile-login-btn">
                                 <div className="mini-cart-icon">
                                    <Link href="/sepet" className="cart-count">
                                       <InjectableSvg src="/assets/img/icons/cart.svg" className="injectable" alt="cart" />
                                       <TotalCart />
                                    </Link>
                                 </div>
                                 {isAuthenticated && user ? (
                                    <Link href="/panelim" className="user-btn">
                                       <InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" />
                                    </Link>
                                 ) : (
                                    <Link href="/giris" className="user-btn">
                                       <InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" />
                                    </Link>
                                 )}
                              </div>
                              <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="fas fa-bars"></i></div>
                           </nav>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <MobileSidebar isActive={isActive} setIsActive={setIsActive} />
      </>
   )
}

export default HeaderOne
