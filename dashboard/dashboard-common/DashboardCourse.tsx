"use client"
import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { loadUser } from "@/redux/actions/userActions"

const DashboardCourse = () => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state.user);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   const enrolledCourses = user?.enrolledCourses || [];

   if (enrolledCourses.length === 0) {
      return (
         <div className="progress__courses-wrap">
            <div className="dashboard__content-title">
               <h4 className="title">Devam Eden Kurslar</h4>
            </div>
            <div className="row">
               <div className="col-12">
                  <p className="text-center py-5">Henüz kayıtlı kursunuz bulunmamaktadır.</p>
               </div>
            </div>
         </div>
      );
   }

   return (
      <div className="progress__courses-wrap">
         <div className="dashboard__content-title">
            <h4 className="title">Devam Eden Kurslar</h4>
         </div>
         <div className="row">
            {enrolledCourses.map((enrollment: any) => {
               const course = enrollment.course;
               if (!course) return null;

               return (
                  <div key={enrollment._id || (course.slug || course._id)} className="col-xl-4 col-md-6">
                     <div className="courses__item courses__item-two shine__animate-item">
                        <div className="courses__item-thumb courses__item-thumb-two">
                           <Link href={`/kurs-detaylari/${course.slug}`} className="shine__animate-link">
                              <Image
                                 src={course.thumb || '/assets/img/courses/course_thumb01.jpg'}
                                 alt={course.title || 'Course'}
                                 width={400}
                                 height={300}
                              />
                           </Link>
                        </div>
                        <div className="courses__item-content courses__item-content-two">
                           <ul className="courses__item-meta list-wrap">
                              <li className="courses__item-tag">
                                 <Link href="/kurslar">{course.category?.name || 'Genel'}</Link>
                              </li>
                           </ul>
                           <h5 className="title">
                              <Link href={`/kurs-detaylari/${course.slug}`}>{course.title || 'Kurs Başlığı'}</Link>
                           </h5>
                           <div className="courses__item-content-bottom">
                              <div className="author-two">
                                 <Link href="#">
                                    <Image
                                       src={course.createdBy?.profile?.picture || '/assets/img/courses/course_author001.png'}
                                       alt={course.createdBy?.name || 'Instructor'}
                                       width={30}
                                       height={30}
                                    />
                                    {course.createdBy ? `${course.createdBy.name} ${course.createdBy.surname || ''}`.trim() : (course.instructors || 'Eğitmen')}
                                 </Link>
                              </div>
                              <div className="avg-rating">
                                 <i className="fas fa-star"></i> {course.rating || '0.0'}
                              </div>
                           </div>
                        </div>
                        <div className="courses__item-bottom-two">
                           <ul className="list-wrap">
                              <li><i className="flaticon-book"></i>{course.curriculum?.length || 0} Ders</li>
                              <li><i className="flaticon-clock"></i>{course.duration || '0h'}</li>
                           </ul>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   )
}

export default DashboardCourse
