import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";

import icon_1 from "@/assets/img/icons/lock.svg"

interface DataType {
   id: number;
   title: string;
   show?: string;
   collapsed?: string;
   faq_details: {
      class_name?: string;
      lock: boolean;
      title: string;
      duration: string;
   }[]
}[]

const faq_data: DataType[] = [
   {
      id: 1,
      title: "Giriş",
      show: "show",
      faq_details: [
         {
            class_name: "open-item",
            lock: false,
            title: "Kurs Kurulumu",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Basit Bir React Uygulaması Oluşturma",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Hepimiz İçin React",
            duration: "10:48"
         },
      ]
   },
   {
      id: 2,
      title: "Temel Kavramlar",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Kurs Kurulumu",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Basit Bir React Uygulaması Oluşturma",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Hepimiz İçin React",
            duration: "10:48"
         },
      ]
   },
   {
      id: 3,
      title: "Final Değerlendirmesi",
      collapsed: "collapsed",
      faq_details: [
         {
            lock: true,
            title: "Kurs Kurulumu",
            duration: "03:03"
         },
         {
            lock: true,
            title: "Basit Bir React Uygulaması Oluşturma",
            duration: "07:48"
         },
         {
            lock: true,
            title: "Hepimiz İçin React",
            duration: "10:48"
         },
      ]
   },
];

const Curriculum = () => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="courses__curriculum-wrap">
            <h3 className="title">Kurs Müfredatı</h3>
            <p>Kurs müfredatı, temel kavramlardan başlayarak ileri seviye konulara kadar kapsamlı bir öğrenme yolculuğu sunmaktadır. Her bölüm, önceki konuları pekiştirerek ilerlemekte ve pratik uygulamalarla desteklenmektedir.</p>
            <div className="accordion" id="accordionExample">
               {faq_data.map((item) => (
                  <div key={item.id} className="accordion-item">
                     <h2 className="accordion-header" id={`headingOne${item.id}`}>
                        <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} aria-labelledby={`headingOne${item.id}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                           <ul className="list-wrap">
                              {item.faq_details.map((list, i) => (
                                 <React.Fragment key={i}>
                                    {list.lock ? (
                                       <li className="course-item">
                                          <Link href="#" className="course-item-link">
                                             <span className="item-name">{list.title}</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">{list.duration}</span>
                                                <span className="item-meta course-item-status">
                                                   <Image src={icon_1} alt="icon" />
                                                </span>
                                             </div>
                                          </Link>
                                       </li>) : (
                                       <li className="course-item open-item">
                                          <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="course-item-link popup-video">
                                             <span className="item-name">Kurs Kurulumu</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">03:03</span>
                                             </div>
                                          </a>
                                       </li>
                                    )}
                                 </React.Fragment>
                              ))}
                           </ul>
                        </div>
                     </div>
                  </div>
               ))}
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

export default Curriculum
