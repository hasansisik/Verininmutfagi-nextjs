import Image from "next/image"
import Link from "next/link"

import instructor_img from "@/assets/img/courses/course_instructors.png"

const Instructors = () => {
   return (
      <div className="courses__instructors-wrap">
         <div className="courses__instructors-thumb">
            <Image src={instructor_img} alt="img" />
         </div>
         <div className="courses__instructors-content">
            <h2 className="title">Ahmet Yılmaz</h2>
            <span className="designation">Yazılım Geliştirme Uzmanı</span>
            <p className="avg-rating"><i className="fas fa-star"></i>4.8 (Değerlendirme)</p>
            <p>10 yılı aşkın deneyime sahip yazılım geliştirme uzmanı. Web teknolojileri, mobil uygulama geliştirme ve modern programlama dilleri konularında uzmanlaşmıştır. Binlerce öğrenciye eğitim vermiş ve birçok başarılı projeye imza atmıştır.</p>
           
         </div>
      </div>
   )
}

export default Instructors
