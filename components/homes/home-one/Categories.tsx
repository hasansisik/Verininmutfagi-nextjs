"use client"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Link from "next/link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as LucideIcons from 'lucide-react';
import { getAllCategories } from '@/redux/actions/categoryActions';

interface CategoryType {
   _id: string;
   slug: string;
   name: string;
   icon: string;
   description: string;
   courseCount: number;
   isActive: boolean;
}

// slider setting
const setting = {
   slidesPerView: 6,
   spaceBetween: 44,
   loop: true,
   // Navigation arrows
   navigation: {
      nextEl: '.categories-button-next',
      prevEl: '.categories-button-prev',
   },
   breakpoints: {
      '1500': {
         slidesPerView: 6,
      },
      '1200': {
         slidesPerView: 5,
      },
      '992': {
         slidesPerView: 4,
         spaceBetween: 30,
      },
      '768': {
         slidesPerView: 3,
         spaceBetween: 25,
      },
      '576': {
         slidesPerView: 2,
      },
      '0': {
         slidesPerView: 2,
         spaceBetween: 20,
      },
   },
};

const Categories = () => {
   const dispatch = useDispatch<any>();
   const categoryState = useSelector((state: any) => state.categoryManagement);
   const categories = categoryState?.categories || [];
   const loading = categoryState?.loading;

   useEffect(() => {
      dispatch(getAllCategories({ isActive: true }));
   }, [dispatch]);

   if (loading) {
      return (
         <section className="categories-area section-py-120" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
            <div className="container">
               <div className="row justify-content-center">
                  <div className="col-xl-5 col-lg-7">
                     <div className="section__title text-center mb-40">
                        <span className="sub-title">Kurs Kategorileri</span>
                        <h2 className="title">Yükleniyor...</h2>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      );
   }

   return (
      <section className="categories-area section-py-120" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-5 col-lg-7">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">Kurs Kategorileri</span>
                     <h2 className="title">İlginizi Çeken Kategorileri Keşfedin</h2>
                     <p className="desc">Size uygun kursu bulmak için kategorilerimizi inceleyin</p>
                  </div>
               </div>
            </div>

            <div className="row">
               <div className="col-12">
                  <div className="categories__wrap" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
                     <Swiper {...setting} modules={[Navigation]} className="swiper categories-active">
                        {categories?.map((item: CategoryType) => {
                           // Dynamically get icon from Lucide
                           // Fallback to Code2 if not found
                           const IconComponent = (LucideIcons as any)[item.icon] || LucideIcons.Code2;

                           return (
                              <SwiperSlide key={item._id} className="swiper-slide">
                                 <div className="categories__item">
                                    <Link href={`/kurslar?kategori=${item.slug}`}>
                                       <div className="icon remove-stars">
                                          <IconComponent size={48} strokeWidth={1.5} />
                                       </div>
                                       <span className="name">{item.name}</span>
                                       <span className="courses">({item.courseCount})</span>
                                    </Link>
                                 </div>
                              </SwiperSlide>
                           );
                        })}
                     </Swiper>

                     <div className="categories__nav">
                        <button className="categories-button-prev">
                           <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M15 7L1 7M1 7L7 1M1 7L7 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </button>
                        <button className="categories-button-next">
                           <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 7L15 7M15 7L9 1M15 7L9 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default Categories
