import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import dynamic from "next/dynamic";

const LessonVideo = dynamic(() => import("./LessonVideo"), { ssr: false });

interface LessonAreaProps {
   course: any;
}

const LessonArea = ({ course }: LessonAreaProps) => {
   const [activeLesson, setActiveLesson] = useState<any>(null);

   // Düzleştirilmiş ders listesi (Navigation için)
   const allLessons = useMemo(() => {
      return course?.curriculum?.reduce((acc: any[], section: any) => {
         return [...acc, ...section.lessons];
      }, []) || [];
   }, [course?.curriculum]);

   useEffect(() => {
      if (allLessons.length > 0 && !activeLesson) {
         setActiveLesson(allLessons[0]);
      }
   }, [allLessons, activeLesson]);

   const handleNext = () => {
      const currentIndex = allLessons.findIndex((l: any) => l.title === activeLesson?.title && l.videoUrl === activeLesson?.videoUrl);
      if (currentIndex < allLessons.length - 1) {
         setActiveLesson(allLessons[currentIndex + 1]);
      }
   };

   const handlePrev = () => {
      const currentIndex = allLessons.findIndex((l: any) => l.title === activeLesson?.title && l.videoUrl === activeLesson?.videoUrl);
      if (currentIndex > 0) {
         setActiveLesson(allLessons[currentIndex - 1]);
      }
   };

   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                  <div className="lesson__content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
                     <h2 className="title">Kurs İçeriği</h2>
                     <LessonFaq
                        curriculum={course?.curriculum}
                        activeLesson={activeLesson}
                        onLessonSelect={(lesson) => setActiveLesson(lesson)}
                     />
                  </div>
               </div>
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                           <Link href={`/kurs-detaylari/${course?.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="fas fa-chevron-left" style={{ transform: 'rotate(0deg)', display: 'inline-block' }}></i>
                           </Link>
                           <span>{course?.title || 'Kurs Başlığı'} - {activeLesson?.title}</span>
                        </div>
                        <div className="lesson__video-wrap-top-right">
                           <Link href={`/kurs-detaylari/${course?.slug}`}><i className="fas fa-times"></i></Link>
                        </div>
                     </div>
                     <LessonVideo
                        key={activeLesson?.videoUrl || 'initial'}
                        videoId={activeLesson?.videoUrl}
                        thumb={course?.thumb}
                        title={activeLesson?.title}
                     />
                     <div className="lesson__next-prev-button">
                        <button
                           className="prev-button"
                           onClick={handlePrev}
                           disabled={allLessons.findIndex((l: any) => l.title === activeLesson?.title) === 0}
                           title="Önceki Ders"
                           style={{ transform: 'translateY(-50%) rotate(0deg)' }}
                        >
                           <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                           className="next-button"
                           onClick={handleNext}
                           disabled={allLessons.findIndex((l: any) => l.title === activeLesson?.title) === allLessons.length - 1}
                           title="Sonraki Ders"
                           style={{ transform: 'translateY(-50%) rotate(0deg)' }}
                        >
                           <i className="fas fa-chevron-right"></i>
                        </button>
                     </div>
                  </div>
                  <LessonNavTav course={course} />
               </div>
            </div>
         </div>
      </section>
   )
}

export default LessonArea;
