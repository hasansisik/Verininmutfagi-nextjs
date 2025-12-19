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
   const [selectedVideoId, setSelectedVideoId] = useState<string>(videoId || "");

   const handleVideoPopup = (vid: string) => {
      setSelectedVideoId(vid);
      setIsVideoOpen(true);
   };

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
                                          <div className="course-item-link" style={{ opacity: 0.7 }}>
                                             <span className="item-name">
                                                <i className="fas fa-play-circle me-2" style={{ fontSize: '24px', color: '#e0e0e0' }}></i>
                                                {lesson.title}
                                             </span>
                                             <div className="course-item-meta">
                                                <span className="item-meta duration">{lesson.duration}</span>
                                                <span className="item-meta course-item-status">
                                                   <Image src={icon_1} alt="icon" />
                                                </span>
                                             </div>
                                          </div>
                                       </li>) : (
                                       <li className="course-item open-item">
                                          <a onClick={() => handleVideoPopup(lesson.videoUrl || videoId)} style={{ cursor: "pointer" }} className="course-item-link popup-video">
                                             <span className="item-name">
                                                <i className="fas fa-play-circle me-2" style={{ fontSize: '24px', color: '#2f57ef' }}></i>
                                                {lesson.title}
                                             </span>
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
            videoId={selectedVideoId}
         />
         <style jsx global>{`
            .courses__curriculum-wrap .course-item .item-name::before {
               display: none !important;
            }
            .courses__curriculum-wrap .accordion-button:not(.collapsed) {
               color: #2f57ef !important;
            }
            .courses__curriculum-wrap .accordion-button:not(.collapsed)::after {
               color: #2f57ef !important;
            }
            /* Video Modalı Büyütme */
            .video-modal {
               max-width: 1000px !important;
               width: 90% !important;
               padding: 0 !important;
               background: #000 !important;
               border-radius: 8px;
               overflow: hidden;
            }
            .react-responsive-modal-closeButton {
               top: -40px !important;
               right: 0 !important;
               color: #fff !important;
            }
            .react-responsive-modal-closeButton svg {
               fill: #fff !important;
            }
         `}</style>
      </>
   )
}

export default Curriculum
