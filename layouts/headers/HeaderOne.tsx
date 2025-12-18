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
import { loadUser, logout } from "@/redux/actions/userActions"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"

const TotalCart = dynamic(() => import("@/components/common/TotalCart"), { ssr: false });
const CustomSelect = dynamic(() => import("@/ui/CustomSelect"), { ssr: false });

import logo from "@/public/logo.png"

const HeaderOne = () => {

   const [selectedOption, setSelectedOption] = React.useState(null);
   const dispatch = useAppDispatch();
   const router = useRouter();
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

   const handleLogout = async () => {
      try {
         await dispatch(logout()).unwrap();
         toast.success("Çıkış yapıldı");
         router.push("/");
         setShowDropdown(false);
      } catch (error) {
         toast.error("Çıkış yapılırken hata oluştu");
      }
   };

   const { sticky } = UseSticky();
   const [isActive, setIsActive] = useState<boolean>(false);

   const menuItemStyle: React.CSSProperties = {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      color: '#333',
      textDecoration: 'none',
      transition: 'background 0.2s',
      backgroundColor: 'transparent'
   };

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
                                             <div style={{
                                                position: 'absolute',
                                                top: '100%',
                                                right: 0,
                                                marginTop: '8px',
                                                backgroundColor: 'white',
                                                borderRadius: '8px',
                                                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                                minWidth: '200px',
                                                zIndex: 1000,
                                                overflow: 'hidden'
                                             }}>
                                                <Link
                                                   href="/panelim"
                                                   onClick={() => setShowDropdown(false)}
                                                   style={menuItemStyle}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-home" style={{ width: '16px', color: '#666' }}></i>
                                                   <span style={{ color: '#333' }}>Panelim</span>
                                                </Link>

                                                <Link
                                                   href="/panelim/ayarlar"
                                                   onClick={() => setShowDropdown(false)}
                                                   style={menuItemStyle}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-cog" style={{ width: '16px', color: '#666' }}></i>
                                                   <span style={{ color: '#333' }}>Ayarlar</span>
                                                </Link>

                                                <Link
                                                   href="/istek-listesi"
                                                   onClick={() => setShowDropdown(false)}
                                                   style={menuItemStyle}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-heart" style={{ width: '16px', color: '#666' }}></i>
                                                   <span style={{ color: '#333' }}>İstek Listem</span>
                                                </Link>

                                                <Link
                                                   href="/panelim/kayitli-kurslar"
                                                   onClick={() => setShowDropdown(false)}
                                                   style={menuItemStyle}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-book" style={{ width: '16px', color: '#666' }}></i>
                                                   <span style={{ color: '#333' }}>Kayıtlı Kurslar</span>
                                                </Link>

                                                <Link
                                                   href="/panelim/siparis-gecmisim"
                                                   onClick={() => setShowDropdown(false)}
                                                   style={menuItemStyle}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-shopping-bag" style={{ width: '16px', color: '#666' }}></i>
                                                   <span style={{ color: '#333' }}>Sipariş Geçmişim</span>
                                                </Link>

                                                <button
                                                   onClick={handleLogout}
                                                   style={{
                                                      width: '100%',
                                                      display: 'flex',
                                                      alignItems: 'center',
                                                      gap: '12px',
                                                      padding: '12px 16px',
                                                      color: '#dc3545',
                                                      textDecoration: 'none',
                                                      transition: 'background 0.2s',
                                                      background: 'none',
                                                      border: 'none',
                                                      cursor: 'pointer',
                                                      textAlign: 'left'
                                                   }}
                                                   onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                                                   onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                >
                                                   <i className="fas fa-sign-out-alt" style={{ width: '16px', color: '#dc3545' }}></i>
                                                   <span style={{ color: '#dc3545' }}>Çıkış Yap</span>
                                                </button>
                                             </div>
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
                                 {isAuthenticated && user ? (
                                    <Link href="/panelim">
                                       <InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" />
                                    </Link>
                                 ) : (
                                    <Link href="/giris">
                                       <InjectableSvg src="/assets/img/icons/user.svg" alt="" className="injectable" />
                                    </Link>
                                 )}
                              </div>
                              <div onClick={() => setIsActive(true)} className="mobile-nav-toggler"><i className="tg-flaticon-menu-1"></i></div>
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
