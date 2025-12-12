"use client"
import VideoPopup from "@/modals/VideoPopup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import InjectableSvg from "@/hooks/InjectableSvg";
import BtnArrow from "@/svg/BtnArrow";

import img_1 from "@/assets/img/courses/course_thumb02.jpg"

const Sidebar = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="col-xl-3 col-lg-4">
            <div className="courses__details-sidebar">
               <div className="courses__details-video">
                  <Image src={img_1} alt="img" />
                  <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="popup-video"><i className="fas fa-play"></i></a>
               </div>
               <div className="courses__cost-wrap">
                  <span>Bu Kurs Ücreti:</span>
                  <h2 className="title">₺18.00 <del>₺32.00</del></h2>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Kurs içeriği:</h5>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon01.svg" alt="img" className="injectable" />
                        Seviye
                        <span>İleri</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon02.svg" alt="img" className="injectable" />
                        Süre
                        <span>11sa 20dk</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        Dersler
                        <span>12</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon05.svg" alt="img" className="injectable" />
                        Sertifikalar
                        <span>Var</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon06.svg" alt="img" className="injectable" />
                        Mezun Sayısı
                        <span>25K</span>
                     </li>
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     <Link href="/courses" className="btn btn-two arrow-btn">
                       Kursa Başla<BtnArrow />
                     </Link>
                  </div>
               </div>
            </div>
         </div>
         <VideoPopup
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoId="b2Az7_lLh3g"
         />
      </>
   )
}

export default Sidebar
