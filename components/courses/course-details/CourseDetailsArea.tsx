"use client"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "@/redux/features/wishlistSlice";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum"
import Instructors from "./Instructors"

import course_details_img1 from "@/assets/img/courses/courses_details.jpg"
import course_details_img2 from "@/assets/img/courses/course_author001.png"

const tab_title: string[] = ["Genel Bakış", "Müfredat", "Eğitmenler"];

const CourseDetailsArea = ({ single_course }: any) => {

  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const wishlist = useSelector((state: any) => state.wishlist.wishlist);
  const [isInWishlist, setIsInWishlist] = useState(false);

  useEffect(() => {
    if (single_course) {
      const courseInWishlist = wishlist.find((item: any) => item.id === String(single_course.id));
      setIsInWishlist(!!courseInWishlist);
    }
  }, [wishlist, single_course]);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const handleWishlistToggle = () => {
    if (!single_course) return;

    const wishlistItem = {
      id: String(single_course.id),
      title: single_course.title || "Kurs",
      thumb: single_course.thumb || course_details_img1,
      price: single_course.price || 0,
    };

    if (isInWishlist) {
      dispatch(removeFromWishlist(wishlistItem));
    } else {
      dispatch(addToWishlist(wishlistItem));
    }
  };

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="courses__details-thumb" style={{ position: "relative" }}>
              <Image src={course_details_img1} alt="img" />
              <button
                onClick={handleWishlistToggle}
                className="wishlist-heart-btn"
                style={{
                  position: "absolute",
                  top: "15px",
                  right: "15px",
                  background: "rgba(255, 255, 255, 0.9)",
                  border: "none",
                  borderRadius: "50%",
                  width: "45px",
                  height: "45px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                  zIndex: 10,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 1)";
                  e.currentTarget.style.transform = "scale(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.9)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <i className={isInWishlist ? "fas fa-heart" : "far fa-heart"} 
                   style={{ 
                     color: isInWishlist ? "#ff4757" : "#333",
                     fontSize: "20px"
                   }} 
                />
              </button>
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href="/course">{single_course?.category ? single_course.category : "Geliştirme"}</Link>
                </li>
                <li className="avg-rating"><i className="fas fa-star"></i>{single_course?.rating ? single_course.rating : "4.5 (Değerlendirme)"}</li>
              </ul>
              <h2 className="title">{single_course?.title ? single_course.title : "Tasarımcılar ve Mühendisler Arasındaki Çatışmaları Çözme"}</h2>
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    <Image src={course_details_img2} alt="img" />
                    Yazar: <Link href="#">{single_course?.instructors ? single_course.instructors : "Ahmet Yılmaz"}</Link>
                  </li>
                  <li className="date"><i className="flaticon-calendar"></i>24/07/2024</li>
                  <li><i className="flaticon-mortarboard"></i>2.250 Öğrenci</li>
                </ul>
              </div>
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                {tab_title.map((tab, index) => (
                  <li key={index} onClick={() => handleTabClick(index)} className="nav-item" role="presentation">
                    <button className={`nav-link ${activeTab === index ? "active" : ""}`}>{tab}</button>
                  </li>
                ))}
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === 0 ? 'show active' : ''}`} id="overview-tab-pane" role="tabpanel" aria-labelledby="overview-tab">
                  <Overview />
                </div>
                <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="curriculum-tab-pane" role="tabpanel" aria-labelledby="curriculum-tab">
                  <Curriculum />
                </div>
                <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="instructors-tab-pane" role="tabpanel" aria-labelledby="instructors-tab">
                  <Instructors />
                </div>
              </div>
            </div>
          </div>
          <Sidebar single_course={single_course} />
        </div>
      </div>
    </section>
  )
}

export default CourseDetailsArea
