"use client"
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllCourses } from "@/redux/actions/courseActions";
import { getAllCategories } from "@/redux/actions/categoryActions";
import { useDispatch } from 'react-redux';

// slider setting
const setting = {
  slidesPerView: 4,
  loop: true,
  spaceBetween: 30,
  observer: true,
  observeParents: true,
  autoplay: false,
  // Navigation arrows
  navigation: {
    nextEl: '.courses-button-next',
    prevEl: '.courses-button-prev',
  },
  breakpoints: {
    '1500': {
      slidesPerView: 4,
    },
    '1200': {
      slidesPerView: 4,
    },
    '992': {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    '768': {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    '576': {
      slidesPerView: 1,
    },
    '0': {
      slidesPerView: 1,
    },
  },
};

interface StyleType {
  style?: boolean;
}

const CourseArea = ({ style }: StyleType) => {
  const dispatch = useAppDispatch();
  const cartDispatch = useDispatch();
  const { courses, loading: coursesLoading } = useAppSelector((state) => state.courseManagement);
  const { categories, loading: categoriesLoading } = useAppSelector((state) => state.categoryManagement);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getAllCourses({ isActive: true }));
    dispatch(getAllCategories({ isActive: true }));
  }, [dispatch]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const getFilteredCourses = (categoryId?: string) => {
    let filtered = courses.filter(item => item.isActive !== false);
    if (!categoryId) return filtered;
    return filtered.filter(item => item.category?._id === categoryId || item.category === categoryId);
  };

  const loading = coursesLoading || categoriesLoading;

  if (loading) {
    return (
      <section className={`courses-area ${style ? "section-py-120" : "section-pt-120 section-pb-90"}`}>
        <div className="container">
          <div className="text-center">Kurslar yükleniyor...</div>
        </div>
      </section>
    );
  }

  // Aktif kategorileri filtrele (en az bir kursu olanları veya hepsini gösterebiliriz)
  const activeCategories = categories.filter(cat => cat.isActive);
  const tabs = ["Tüm Kurslar", ...activeCategories.map(cat => cat.name)];

  return (
    <>
      <section className={`courses-area ${style ? "section-py-120" : "section-pt-120 section-pb-90"}`} >
        <div className="container">
          <div className="section__title-wrap">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <div className="section__title text-center mb-40">
                  <span className="sub-title">En İyi Kurslar</span>
                  <h2 className="title">Dünyanın En İyi Kurslarını Keşfedin</h2>
                  <p className="desc">Size uygun kursları bulun ve kariyerinizde yeni bir sayfa açın</p>
                </div>
                <div className="courses__nav">
                  <ul className="nav nav-tabs" id="courseTab" role="tablist">
                    {tabs.map((tab, index) => (
                      <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                        <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="tab-content" id="courseTabContent">
            {/* Tüm Kurslar ve Kategori Bazlı Sekmeler */}
            {tabs.map((tab, index) => {
              const categoryId = index === 0 ? undefined : activeCategories[index - 1]?._id;
              const filteredCourses = getFilteredCourses(categoryId);

              return (
                <div key={index} className={`tab-pane fade ${activeTab === index ? 'show active' : ''}`} id={`tab-${index}`} role="tabpanel">
                  <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
                    {filteredCourses.map((item) => (
                      <SwiperSlide key={item._id} className="swiper-slide">
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
                              <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  {!style && filteredCourses.length > 0 &&
                    <div className="courses__nav">
                      <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                      <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
                    </div>
                  }
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <style jsx global>{`
      .courses-swiper-active {
        padding: 0 70px !important;
        margin: 0 -70px !important;
      }
      .courses__nav .courses-button-prev {
        left: 0 !important;
        z-index: 10 !important;
      }
      .courses__nav .courses-button-next {
        right: 0 !important;
        z-index: 10 !important;
      }
      @media (max-width: 1300px) {
        .courses-swiper-active {
          padding: 0 50px !important;
          margin: 0 -50px !important;
        }
        .courses__nav .courses-button-prev {
          left: -10px !important;
        }
        .courses__nav .courses-button-next {
          right: -10px !important;
        }
      }
      @media (max-width: 767.98px) {
        .courses-swiper-active {
          padding: 0 !important;
          margin: 0 !important;
        }
        .courses__nav {
          display: flex !important;
          justify-content: center !important;
          gap: 20px !important;
          margin-top: 20px !important;
        }
        .courses__nav .courses-button-prev,
        .courses__nav .courses-button-next {
          position: relative !important;
          left: auto !important;
          right: auto !important;
          top: auto !important;
          transform: none !important;
        }
      }
        .courses__nav .nav {
          gap: 20px 30px !important;
          justify-content: center !important;
          border: none !important;
        }
        .courses__nav .nav .nav-item .nav-link::after {
          bottom: -10px !important;
        }
        @media (max-width: 767.98px) {
          .courses__nav .nav {
            gap: 15px 20px !important;
          }
          .courses__nav .nav .nav-item .nav-link::after {
            bottom: -5px !important;
          }
        }
      `}</style>
    </>
  )
}

export default CourseArea
