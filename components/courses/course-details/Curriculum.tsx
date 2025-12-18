import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import VideoPopup from "@/modals/VideoPopup";

import icon_1 from "@/assets/img/icons/lock.svg"

interface CurriculumLesson {
   lock: boolean;
   title: string;
   duration: string;
   class_name?: string;
   videoUrl?: string;
}

interface CurriculumSection {
   id?: number;
   _id?: string;
   title: string;
   show?: string;
   collapsed?: string;
   lessons: CurriculumLesson[];
}

interface CurriculumProps {
   curriculum?: CurriculumSection[];
   videoId?: string;
}

const Curriculum = ({ curriculum, videoId }: CurriculumProps) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   if (!curriculum || !videoId) {
      return (
         <div className="courses__curriculum-wrap">
            <p>Müfredat bilgileri yükleniyor...</p>
         </div>
      );
   }

   return (
      <>
         <div className="courses__curriculum-wrap">
            <h3 className="title">Kurs Müfredatı</h3>
            <p>Kurs müfredatı, temel kavramlardan başlayarak ileri seviye konulara kadar kapsamlı bir öğrenme yolculuğu sunmaktadır. Her bölüm, önceki konuları pekiştirerek ilerlemekte ve pratik uygulamalarla desteklenmektedir.</p>
            <div className="accordion" id="accordionExample">
               {curriculum.map((item, index) => (
                  <div key={item._id || item.id || index} className="accordion-item">
                     <h2 className="accordion-header" id={`headingOne${index}`}>
                        <button className={`accordion-button ${item.collapsed || (index === 0 ? '' : 'collapsed')}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${index}`} aria-expanded={index === 0 ? "true" : "false"} aria-controls={`collapseOne${index}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapseOne${index}`} className={`accordion-collapse collapse ${item.show || (index === 0 ? 'show' : '')}`} aria-labelledby={`headingOne${index}`} data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                           <ul className="list-wrap">
                              {item.lessons.map((lesson, i) => (
                                 <React.Fragment key={i}>
                                    {lesson.lock ? (
                                       <li className="course-item">
                                          <Link href="#" className="course-item-link">
                                             <span className="item-name">{lesson.title}</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">{lesson.duration}</span>
                                                <span className="item-meta course-item-status">
                                                   <Image src={icon_1} alt="icon" />
                                                </span>
                                             </div>
                                          </Link>
                                       </li>) : (
                                       <li className="course-item open-item">
                                          <a onClick={() => setIsVideoOpen(true)} style={{ cursor: "pointer" }} className="course-item-link popup-video">
                                             <span className="item-name">{lesson.title}</span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">{lesson.duration}</span>
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
            videoId={videoId}
         />
      </>
   )
}

export default Curriculum
