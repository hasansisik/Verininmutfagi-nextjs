"use client"
import VideoPopup from "@/modals/VideoPopup"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hook";
import InjectableSvg from "@/hooks/InjectableSvg";
import BtnArrow from "@/svg/BtnArrow";

const Sidebar = ({ single_course }: any) => {
   const { user } = useAppSelector((state) => state.user);
   const [isVideoOpen, setIsVideoOpen] = useState(false);
   const router = useRouter();
   const dispatch = useDispatch();

   // Kullanıcın bu kursa kayıtlı olup olmadığını kontrol et
   const isEnrolled = user?.enrolledCourses?.some((item: any) =>
      (item.course?._id || item.course) === (single_course?._id || single_course?.id)
   );

   const handleStartCourse = () => {
      if (single_course?.slug) {
         router.push(`/ders/${single_course.slug}`);
      }
   };

   const handleAddToCart = () => {
      if (single_course) {
         const cartItem = {
            id: single_course._id || single_course.id,
            title: single_course.title || "Kurs",
            quantity: 1,
            price: single_course.price || 0,
            thumb: single_course.thumbnail || single_course.thumb || '/assets/img/courses/course_thumb01.jpg',
         };
         dispatch(addToCart(cartItem));
      }
   };

   return (
      <>
         <div className="col-xl-3 col-lg-4">
            <div className="courses__details-sidebar">
               <div className="courses__details-video">
                  <Image
                     src={single_course.thumb || '/assets/img/courses/course_thumb01.jpg'}
                     alt={single_course.title || "video preview"}
                     width={450}
                     height={250}
                     style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                  />
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
                  </ul>
               </div>
               <div className="courses__details-enroll">
                  <div className="tg-button-wrap">
                     {isEnrolled ? (
                        <button onClick={handleStartCourse} className="btn btn-two arrow-btn">
                           Kursu İzle<BtnArrow />
                        </button>
                     ) : (
                        <button onClick={handleAddToCart} className="btn btn-two arrow-btn">
                           Sepete Ekle<BtnArrow />
                        </button>
                     )}
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
