"use client"
import Link from "next/link";
import LessonFaq from "./LessonFaq";
import LessonNavTav from "./LessonNavTav";
import dynamic from "next/dynamic";

const LessonVideo = dynamic(() => import("./LessonVideo"), { ssr: false });

const LessonArea = () => {

   return (
      <section className="lesson__area section-pb-120">
         <div className="container-fluid p-0">
            <div className="row gx-0">
               <div className="col-xl-3 col-lg-4">
                  <div className="lesson__content">
                     <h2 className="title">Kurs İçeriği</h2>
                     <LessonFaq />
                  </div>
               </div>
               <div className="col-xl-9 col-lg-8">
                  <div className="lesson__video-wrap">
                     <div className="lesson__video-wrap-top">
                        <div className="lesson__video-wrap-top-left">
                           <Link href="#"><i className="flaticon-arrow-right"></i></Link>
                           <span>Eksiksiz Tasarım Kursu: Sıfırdan Uzmanlığa!</span>
                        </div>
                        <div className="lesson__video-wrap-top-right">
                           <Link href="#"><i className="fas fa-times"></i></Link>
                        </div>
                     </div>
                     <LessonVideo />
                     <div className="lesson__next-prev-button">
                        <button className="prev-button" title="Basit Bir React Uygulaması Oluştur"><i className="flaticon-arrow-right"></i></button>
                        <button className="next-button" title="Herkes İçin React"><i className="flaticon-arrow-right"></i></button>
                     </div>
                  </div>
                  <LessonNavTav />
               </div>
            </div>
         </div>
      </section>
   )
}

export default LessonArea;
