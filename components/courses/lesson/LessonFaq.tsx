import React from "react";
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
   activeLesson?: CurriculumLesson | null;
   onLessonSelect: (lesson: CurriculumLesson) => void;
}

const LessonFaq = ({ curriculum, activeLesson, onLessonSelect }: LessonFaqProps) => {

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
                  <button
                     className={`accordion-button ${index === 0 ? '' : 'collapsed'}`}
                     type="button"
                     data-bs-toggle="collapse"
                     data-bs-target={`#collapseOne${index}`}
                     aria-expanded={index === 0 ? "true" : "false"}
                     aria-controls={`collapseOne${index}`}
                  >
                     {item.title}
                     <span>{item.lessons.length} Ders</span>
                  </button>
               </h2>
               <div
                  id={`collapseOne${index}`}
                  className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                  data-bs-parent="#accordionExample"
               >
                  <div className="accordion-body">
                     <ul className="list-wrap">
                        {item.lessons.map((lesson, i) => {
                           const isActive = activeLesson?.title === lesson.title && activeLesson?.videoUrl === lesson.videoUrl;
                           return (
                              <li key={i} className={`course-item ${isActive ? 'active' : ''}`}>
                                 <button
                                    onClick={() => onLessonSelect(lesson)}
                                    className={`course-item-link w-100 text-start ${isActive ? 'active' : ''}`}
                                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                                 >
                                    <span className="item-name" style={{ color: 'inherit', display: 'flex', alignItems: 'center' }}>
                                       <i className={`fas ${isActive ? 'fa-pause-circle' : 'fa-play-circle'} me-2`} style={{ fontSize: '24px', color: '#2f57ef', width: '30px' }}></i>
                                       {lesson.title}
                                    </span>
                                    <div className="course-item-meta">
                                       <span className="item-meta duration">{lesson.duration}</span>
                                    </div>
                                 </button>
                              </li>
                           );
                        })}
                     </ul>
                     <style>{`
                        .lesson__content .course-item-link .item-name::before {
                           display: none !important;
                        }
                        .lesson__content .course-item-link {
                           cursor: pointer !important;
                        }
                     `}</style>
                  </div>
               </div>
            </div>
         ))}
      </div>
   )
}

export default LessonFaq
