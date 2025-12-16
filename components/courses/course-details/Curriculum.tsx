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
}

interface CurriculumSection {
   id: number;
   title: string;
   show?: string;
   collapsed?: string;
   lessons: CurriculumLesson[];
}

interface CurriculumProps {
   curriculum: CurriculumSection[];
   videoId: string;
}

const Curriculum = ({ curriculum, videoId }: CurriculumProps) => {

   const [isVideoOpen, setIsVideoOpen] = useState(false);

   return (
      <>
         <div className="courses__curriculum-wrap">
            <h3 className="title">Kurs Müfredatı</h3>
            <p>Kurs müfredatı, temel kavramlardan başlayarak ileri seviye konulara kadar kapsamlı bir öğrenme yolculuğu sunmaktadır. Her bölüm, önceki konuları pekiştirerek ilerlemekte ve pratik uygulamalarla desteklenmektedir.</p>
            <div className="accordion" id="accordionExample">
               {curriculum.map((item) => (
                  <div key={item.id} className="accordion-item">
                     <h2 className="accordion-header" id={`headingOne${item.id}`}>
                        <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                           {item.title}
                        </button>
                     </h2>
                     <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} aria-labelledby={`headingOne${item.id}`} data-bs-parent="#accordionExample">
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
