import Image from "next/image"
import Link from "next/link"

import instructor_img from "@/assets/img/courses/course_instructors.png"

interface InstructorDetail {
   name: string;
   designation: string;
   rating: number;
   bio: string;
   image: string;
}

interface InstructorsProps {
   instructorDetails: InstructorDetail[];
}

const Instructors = ({ instructorDetails }: InstructorsProps) => {
   return (
      <div className="courses__instructors-wrap">
         {instructorDetails.map((instructor, index) => (
            <div key={index} className={index > 0 ? "mt-4" : ""}>
               <div className="courses__instructors-thumb">
                  <Image src={instructor_img} alt={instructor.name} />
               </div>
               <div className="courses__instructors-content">
                  <h2 className="title">{instructor.name}</h2>
                  <span className="designation">{instructor.designation}</span>
                  <p className="avg-rating"><i className="fas fa-star"></i>{instructor.rating} (Değerlendirme)</p>
                  <p>{instructor.bio}</p>
               </div>
            </div>
         ))}
      </div>
   )
}

export default Instructors
