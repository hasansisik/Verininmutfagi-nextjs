"use client"
import VideoPopup from "@/modals/VideoPopup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import InjectableSvg from "@/hooks/InjectableSvg";
import BtnArrow from "@/svg/BtnArrow";

import img_1 from "@/assets/img/courses/course_thumb02.jpg"

const Sidebar = ({ single_course }: any) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const dispatch = useDispatch();

   const handleAddToCart = () => {
      if (single_course) {
         const cartItem = {
            id: String(single_course.id),
            title: single_course.title || "Kurs",
            quantity: 1,
            price: single_course.price || 0,
         };
         dispatch(addToCart(cartItem));
      }
   };

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
                  <h2 className="title">
                     {single_course.price === 0 ? (
                        <>Ücretsiz {single_course.originalPrice > 0 && <del>₺{single_course.originalPrice.toFixed(2)}</del>}</>
                     ) : (
                        <>₺{single_course.price.toFixed(2)} {single_course.originalPrice > single_course.price && <del>₺{single_course.originalPrice.toFixed(2)}</del>}</>
                     )}
                  </h2>
               </div>
               <div className="courses__information-wrap">
                  <h5 className="title">Kurs içeriği:</h5>
                  <ul className="list-wrap">
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon01.svg" alt="img" className="injectable" />
                        Seviye
                        <span>{single_course.skill_level}</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon02.svg" alt="img" className="injectable" />
                        Süre
                        <span>{single_course.duration}</span>
                     </li>
                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon03.svg" alt="img" className="injectable" />
                        Dersler
                        <span>{single_course.totalLessons}</span>
                     </li>

                     <li>
                        <InjectableSvg src="/assets/img/icons/course_icon06.svg" alt="img" className="injectable" />
                        Mezun Sayısı
                        <span>{single_course.graduates}</span>
                     </li>
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     <button onClick={handleAddToCart} className="btn btn-two arrow-btn">
                        Kursa Başla<BtnArrow />
                     </button>
                  </div>
               </div>
            </div>
         </div>
         <VideoPopup
            isOpen={isVideoOpen}
            onClose={() => setIsVideoOpen(false)}
            videoId={single_course.videoId}
         />
      </>
   )
}

export default Sidebar
