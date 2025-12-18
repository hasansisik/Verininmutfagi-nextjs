import React from "react";
import Image from "next/image";
import Link from "next/link";

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

interface LessonFaqProps {
   curriculum?: CurriculumSection[];
}

const LessonFaq = ({ curriculum }: LessonFaqProps) => {

   if (!curriculum || curriculum.length === 0) {
      return (
         <div className="accordion" id="accordionExample">
            <p>Müfredat yükleniyor...</p>
         </div>
      );
   }

   return (
      <div className="accordion" id="accordionExample">
         {curriculum.map((item, index) => (
            <div key={item._id || item.id || index} className="accordion-item">
               <h2 className="accordion-header">
                  <button className={`accordion-button ${item.collapsed || (index === 0 ? '' : 'collapsed')}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${index}`} aria-expanded={index === 0 ? "true" : "false"} aria-controls={`collapseOne${index}`}>
                     {item.title}
                     <span>{item.lessons.length} Ders</span>
                  </button>
               </h2>
               <div id={`collapseOne${index}`} className={`accordion-collapse collapse ${item.show || (index === 0 ? 'show' : '')}`} data-bs-parent="#accordionExample">
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
                                    <Link href="#" className="course-item-link popup-video">
                                       <span className="item-name">{lesson.title}</span>
                                       <div className="course-item-meta">
                                          <span className="item-meta duration">{lesson.duration}</span>
                                       </div>
                                    </Link>
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
   )
}

export default LessonFaq
