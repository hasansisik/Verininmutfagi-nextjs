'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import CourseSidebar from './CourseSidebar';
import CourseTop from './CourseTop';
import { useSearchParams } from 'next/navigation';
import UseCourses from '@/hooks/UseCourses';
import { useDispatch } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { useAppSelector } from '@/redux/hook';


const CourseArea = () => {
   const searchParams = useSearchParams();
   const query = searchParams.get('search');
   const dispatch = useDispatch();
   const { user } = useAppSelector((state) => state.user);
   const { courses: allFetchedCourses, loading } = UseCourses();
   const [displayCourses, setDisplayCourses] = useState<any[]>([]);

   useEffect(() => {
      if (allFetchedCourses.length > 0) {
         setDisplayCourses(allFetchedCourses);
      }
   }, [allFetchedCourses]);

   // Helper function to check if user is enrolled
   const isEnrolled = (courseId: string) => {
      return user?.enrolledCourses?.some((ec: any) =>
         (ec.course?._id === courseId || ec.course === courseId)
      );
   };

   // Arama filtresi uygula
   const filteredCourses = query
      ? displayCourses.filter(course =>
         course.title?.toLowerCase().includes(query.toLowerCase())
      )
      : displayCourses;

   const itemsPerPage = 12;
   const [itemOffset, setItemOffset] = useState(0);
   const endOffset = itemOffset + itemsPerPage;
   const currentItems = filteredCourses.slice(itemOffset, endOffset);
   const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);

   const startOffset = itemOffset + 1;
   const totalItems = filteredCourses.length;

   useEffect(() => {
      setItemOffset(0); // Reset pagination on filter change
   }, [filteredCourses.length]);

   const handlePageClick = (event: { selected: number }) => {
      const newOffset = (event.selected * itemsPerPage) % filteredCourses.length;
      setItemOffset(newOffset);
   };

   const [activeTab, setActiveTab] = useState(0);

   const handleTabClick = (index: number) => {
      setActiveTab(index);
   };

   const handleAddToCart = (course: any) => {
      const cartItem = {
         id: course._id,
         title: course.title,
         price: course.price || 0,
         thumb: course.thumb || '/assets/img/courses/course_thumb01.jpg',
         quantity: 1,
      };
      dispatch(addToCart(cartItem));
   };

   if (loading) {
      return (
         <section className="all-courses-area section-py-120">
            <div className="container">
               <div className="text-center">Kurslar yükleniyor...</div>
            </div>
         </section>
      );
   }

   return (
      <section className="all-courses-area section-py-120">
         <div className="container">
            <div className="row">
               <CourseSidebar allCourses={allFetchedCourses} setCourses={setDisplayCourses} />
               <div className="col-xl-9 col-lg-8">
                  <CourseTop
                     startOffset={startOffset}
                     endOffset={Math.min(endOffset, totalItems)}
                     totalItems={totalItems}
                     allCourses={displayCourses}
                     setCourses={setDisplayCourses}
                     handleTabClick={handleTabClick}
                     activeTab={activeTab}
                  />
                  <div className="tab-content" id="myTabContent">
                     <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="grid" role="tabpanel" aria-labelledby="grid-tab">
                        <div className="row courses__grid-wrap row-cols-1 row-cols-xl-3 row-cols-lg-2 row-cols-md-2 row-cols-sm-1">
                           {currentItems.length > 0 ? (
                              currentItems.map((item) => (
                                 <div key={item._id} className="col">
                                    <div className="courses__item shine__animate-item">
                                       <div className="courses__item-thumb">
                                          <Link href={`/kurs-detaylari/${item.slug}`} className="shine__animate-link">
                                             <Image src={item.thumb || '/assets/img/courses/course_thumb01.jpg'} alt={item.title} width={400} height={300} />
                                          </Link>
                                       </div>
                                       <div className="courses__item-content">
                                          <ul className="courses__item-meta list-wrap">
                                             <li className="courses__item-tag">
                                                <Link href="/kurslar">{item.category?.name || 'Kategori'}</Link>
                                             </li>
                                             <li className="avg-rating"><i className="fas fa-star"></i> {item.rating || '0.0'} ({item.ratingCount || 0} Değerlendirme)</li>
                                          </ul>
                                          <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                                          <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                                          <div className="courses__item-bottom">
                                             <div className="button">
                                                {isEnrolled(item._id) ? (
                                                   <Link href={`/ders/${item.slug}`} className="read-more">
                                                      Kursu İzle <i className="flaticon-arrow-right"></i>
                                                   </Link>
                                                ) : (
                                                   <button
                                                      onClick={() => handleAddToCart(item)}
                                                      style={{
                                                         background: 'none',
                                                         border: 'none',
                                                         padding: 0,
                                                         cursor: 'pointer',
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         gap: '8px'
                                                      }}
                                                   >
                                                      <span className="text">Sepete Ekle</span>
                                                      <i className="flaticon-arrow-right"></i>
                                                   </button>
                                                )}
                                             </div>
                                             <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="col-12 text-center py-5">
                                 <h4>Aramanızla eşleşen kurs bulunamadı.</h4>
                                 <p>Lütfen farklı anahtar kelimelerle tekrar deneyin.</p>
                              </div>
                           )}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ReactPaginate
                              breakLabel="..."
                              onPageChange={handlePageClick}
                              pageRangeDisplayed={3}
                              pageCount={pageCount}
                              renderOnZeroPageCount={null}
                              className="list-wrap"
                           />
                        </nav>
                     </div>

                     <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="list" role="tabpanel" aria-labelledby="list-tab">
                        <div className="row courses__list-wrap row-cols-1">
                           {currentItems.length > 0 ? (
                              currentItems.map((item) => (
                                 <div key={item._id} className="col">
                                    <div className="courses__item courses__item-three shine__animate-item">
                                       <div className="courses__item-thumb">
                                          <Link href={`/kurs-detaylari/${item.slug}`} className="shine__animate-link">
                                             <Image src={item.thumb || '/assets/img/courses/course_thumb01.jpg'} alt={item.title} width={400} height={300} />
                                          </Link>
                                       </div>
                                       <div className="courses__item-content">
                                          <ul className="courses__item-meta list-wrap">
                                             <li className="courses__item-tag">
                                                <Link href="/kurslar">{item.category?.name || 'Kategori'}</Link>
                                                <div className="avg-rating">
                                                   <i className="fas fa-star"></i> {item.rating || '0.0'} ({item.ratingCount || 0} Değerlendirme)
                                                </div>
                                             </li>
                                             <li className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</li>
                                          </ul>
                                          <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                                          <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                                          <p className="info">{item.desc}</p>
                                          <div className="courses__item-bottom">
                                             <div className="button">
                                                {isEnrolled(item._id) ? (
                                                   <Link href={`/ders/${item.slug}`} className="read-more">
                                                      Kursu İzle <i className="flaticon-arrow-right"></i>
                                                   </Link>
                                                ) : (
                                                   <button
                                                      onClick={() => handleAddToCart(item)}
                                                      style={{
                                                         background: 'none',
                                                         border: 'none',
                                                         padding: 0,
                                                         cursor: 'pointer',
                                                         display: 'flex',
                                                         alignItems: 'center',
                                                         gap: '8px'
                                                      }}
                                                   >
                                                      <span className="text">Sepete Ekle</span>
                                                      <i className="flaticon-arrow-right"></i>
                                                   </button>
                                                )}
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              ))
                           ) : (
                              <div className="col-12 text-center py-5">
                                 <h4>Aramanızla eşleşen kurs bulunamadı.</h4>
                                 <p>Lütfen farklı anahtar kelimelerle tekrar deneyin.</p>
                              </div>
                           )}
                        </div>
                        <nav className="pagination__wrap mt-30">
                           <ul className="list-wrap">
                              <ReactPaginate
                                 breakLabel="..."
                                 onPageChange={handlePageClick}
                                 pageRangeDisplayed={3}
                                 pageCount={pageCount}
                                 renderOnZeroPageCount={null}
                                 className="list-wrap"
                              />
                           </ul>
                        </nav>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

export default CourseArea;
