"use client"
import enroll_course_data from "@/data/dashboard-data/InstructorEnrollCourseData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

const my_courses: string[] = ["Publish", "Pendig", "Draft",];

const setting = {
   slidesPerView: 3,
   spaceBetween: 30,
   observer: true,
   observeParents: true,
   loop: true,
   breakpoints: {
      '1500': {
         slidesPerView: 3,
      },
      '1200': {
         slidesPerView: 3,
      },
      '992': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '768': {
         slidesPerView: 2,
         spaceBetween: 24,
      },
      '576': {
         slidesPerView: 1.5,
      },
      '0': {
         slidesPerView: 1,
      },
   },
}

interface StyleType {
   style?: boolean;
}

const InstructorEnrolledCourseContent = ({ style }: StyleType) => {

   const [isLoop, setIsLoop] = useState(false);
   useEffect(() => {
      setIsLoop(true);
   }, []);

   // Student için tüm kursları birleştir (tab olmadan)
   const allCourses = style ? enroll_course_data[0]?.course_details || [] : enroll_course_data.flatMap(course => course.course_details);

   return (
      <div className="col-lg-9">
         <div className="dashboard__content-wrap dashboard__content-wrap-two">
            <div className="dashboard__content-title">
               <h4 className="title">{style ? "Kurslarım" : "Kayıtlı Kurslar"}</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  {!style && (
                     <Swiper
                        {...setting}
                        modules={[Navigation]}
                        loop={isLoop} className="swiper dashboard-courses-active">
                        {allCourses.map((item) => (
                           <SwiperSlide key={item.id} className="swiper-slide">
                              <div className="courses__item courses__item-two shine__animate-item">
                                 <div className="courses__item-thumb courses__item-thumb-two">
                                    <Link href="/kurs-detaylari" className="shine__animate-link">
                                       <Image src={item.thumb} alt="img" />
                                    </Link>
                                 </div>
                                 <div className="courses__item-content courses__item-content-two">
                                    <ul className="courses__item-meta list-wrap">
                                       <li className="courses__item-tag">
                                          <Link href="course">{item.tag}</Link>
                                       </li>
                                       {item.price && <li className="price"><del>₺{item.old_price}.00</del>₺{item.price}.00</li>}
                                    </ul>
                                    <h5 className="title"><Link href="/kurs-detaylari">{item.title}</Link></h5>
                                    <div className="courses__item-content-bottom">
                                       <div className="author-two">
                                          <Link href="/instructor-details"><Image src={item.avatar_thumb} alt="img" />{item.avatar_name}</Link>
                                       </div>
                                       <div className="avg-rating">
                                          <i className="fas fa-star"></i> {item.review}
                                       </div>
                                    </div>
                                 </div>
                                 <div className="courses__item-bottom-two">
                                    <ul className="list-wrap">
                                       <li><i className="flaticon-book"></i>{item.book}</li>
                                       <li><i className="flaticon-clock"></i>{item.time}</li>
                                       <li><i className="flaticon-mortarboard"></i>{item.mortarboard}</li>
                                    </ul>
                                 </div>
                              </div>
                           </SwiperSlide>
                        ))}
                     </Swiper>
                  )}
                  {style && (
                     <div className="dashboard__nav-wrap mb-40">
                        <ul className="nav nav-tabs" id="courseTab" role="tablist">
                           {my_courses.map((tab, index) => (
                              <li key={index} className="nav-item" role="presentation">
                                 <button className={`nav-link ${index === 0 ? "active" : ""}`}>{tab}</button>
                              </li>
                           ))}
                        </ul>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

export default InstructorEnrolledCourseContent
