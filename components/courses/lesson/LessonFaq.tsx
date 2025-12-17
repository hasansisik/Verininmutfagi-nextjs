import React from "react";
import Image from "next/image";
import Link from "next/link";

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
         {curriculum.map((item) => (
            <div key={item.id} className="accordion-item">
               <h2 className="accordion-header">
                  <button className={`accordion-button ${item.collapsed}`} type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${item.id}`} aria-expanded="true" aria-controls={`collapseOne${item.id}`}>
                     {item.title}
                     <span>{item.lessons.length} Ders</span>
                  </button>
               </h2>
               <div id={`collapseOne${item.id}`} className={`accordion-collapse collapse ${item.show}`} data-bs-parent="#accordionExample">
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
