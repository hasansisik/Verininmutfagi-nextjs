"use client"
import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { server } from "@/config";

const tab_title: string[] = ["Tüm Kurslar", "Tasarım", "İşletme", "Geliştirme"];

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
  const [activeTab, setActiveTab] = useState(0);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${server}/courses`);
      if (response.data.success) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.error("Kurslar yüklenirken hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const getFilteredCourses = (category?: string) => {
    if (!category) return courses;
    return courses.filter(item => item.category?.name === category);
  };

  if (loading) {
    return (
      <section className={`courses-area ${style ? "section-py-120" : "section-pt-120 section-pb-90"}`}>
        <div className="container">
          <div className="text-center">Kurslar yükleniyor...</div>
        </div>
      </section>
    );
  }

  return (
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
                  {tab_title.map((tab, index) => (
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
          {/* Tüm Kurslar */}
          <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="all-tab-pane" role="tabpanel" aria-labelledby="all-tab">
            <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
              {getFilteredCourses().map((item) => (
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
                        <li className="avg-rating"><i className="fas fa-star"></i> 4.5 (120 Değerlendirme)</li>
                      </ul>
                      <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                      <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href={`/kurs-detaylari/${item.slug}`}>
                            <span className="text">Hemen Kaydol</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                        <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!style &&
              <div className="courses__nav">
                <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
              </div>
            }
          </div>

          {/* Tasarım */}
          <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="design-tab-pane" role="tabpanel" aria-labelledby="design-tab">
            <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
              {getFilteredCourses("Sanat ve Tasarım").map((item) => (
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
                        <li className="avg-rating"><i className="fas fa-star"></i> 4.5 (120 Değerlendirme)</li>
                      </ul>
                      <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                      <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href={`/kurs-detaylari/${item.slug}`}>
                            <span className="text">Hemen Kaydol</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                        <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!style &&
              <div className="courses__nav">
                <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
              </div>
            }
          </div>

          {/* İşletme */}
          <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="business-tab-pane" role="tabpanel" aria-labelledby="business-tab">
            <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
              {getFilteredCourses("İşletme").map((item) => (
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
                        <li className="avg-rating"><i className="fas fa-star"></i> 4.5 (120 Değerlendirme)</li>
                      </ul>
                      <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                      <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href={`/kurs-detaylari/${item.slug}`}>
                            <span className="text">Hemen Kaydol</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                        <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!style &&
              <div className="courses__nav">
                <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
              </div>
            }
          </div>

          {/* Geliştirme */}
          <div className={`tab-pane fade ${activeTab === 3 ? 'show active' : ''}`} id="development-tab-pane" role="tabpanel" aria-labelledby="development-tab">
            <Swiper {...setting} modules={[Autoplay, Navigation]} className="swiper courses-swiper-active">
              {getFilteredCourses("Geliştirme").map((item) => (
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
                        <li className="avg-rating"><i className="fas fa-star"></i> 4.5 (120 Değerlendirme)</li>
                      </ul>
                      <h5 className="title"><Link href={`/kurs-detaylari/${item.slug}`}>{item.title}</Link></h5>
                      <p className="author">Eğitmen: <Link href="#">{item.instructors || 'Eğitmen'}</Link></p>
                      <div className="courses__item-bottom">
                        <div className="button">
                          <Link href={`/kurs-detaylari/${item.slug}`}>
                            <span className="text">Hemen Kaydol</span>
                            <i className="flaticon-arrow-right"></i>
                          </Link>
                        </div>
                        <h5 className="price">{item.price_type === 'Ücretsiz' || item.price === 0 ? 'Ücretsiz' : `₺${item.price}`}</h5>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            {!style &&
              <div className="courses__nav">
                <div className="courses-button-prev"><i className="flaticon-arrow-right"></i></div>
                <div className="courses-button-next"><i className="flaticon-arrow-right"></i></div>
              </div>
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default CourseArea
