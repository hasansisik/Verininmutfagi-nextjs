"use client"
import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllCategories } from "@/redux/actions/categoryActions"

import logo from "@/public/icon.png"

const FooterCommon = () => {
   const dispatch = useAppDispatch()
   const { categories } = useAppSelector((state) => state.categoryManagement)

   useEffect(() => {
      dispatch(getAllCategories({}))
   }, [dispatch])

   // İlk 3 kategoriyi al
   const displayCategories = categories.slice(0, 3)

   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div className="logo mb-35">
                  <Link href="/"><Image src={logo} alt="Verinin Mutfağı" width={60} height={60} /></Link>
               </div>
               <div className="footer__content">
                  <p>Kod, algoritma, veri ve yapay zeka... Hepsi burada, verinin mutfağında pişiyor!</p>
                  <div className="footer__social">
                     <ul className="list-wrap">
                        <li><a href="https://www.instagram.com/verininmutfagi" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i> Instagram</a></li>
                        <li><a href="https://www.linkedin.com/company/verininmutfagi" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i> Linkedin</a></li>
                        <li><a href="https://www.youtube.com/@verininmutfagi" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i> Youtube</a></li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Verinin mutfağı Kurumsal</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/contact">İletişim</Link></li>
                     <li><Link href="/kurslar">Kurslar Eğitimler</Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Kategoriler</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     {displayCategories.length > 0 ? (
                        displayCategories.map((category) => (
                           <li key={category._id}>
                              <Link href={`/kurslar?category=${category.slug}`}>
                                 {category.name}
                              </Link>
                           </li>
                        ))
                     ) : (
                        <>
                           <li><Link href="/kurslar">Geliştirme</Link></li>
                           <li><Link href="/kurslar">Tasarım</Link></li>
                           <li><Link href="/kurslar">İşletme</Link></li>
                        </>
                     )}
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Politikalar</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
                     <li><Link href="/kullanici-sozlesmesi">Kullanıcı Sözleşmesi</Link></li>
                     <li><Link href="/cerez-politikasi">Çerez Politikası</Link></li>
                  </ul>
               </div>
            </div>
         </div>

      </>
   )
}

export default FooterCommon
