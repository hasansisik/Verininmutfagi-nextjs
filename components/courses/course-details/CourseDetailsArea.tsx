"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum"
import Instructors from "./Instructors"

import course_details_img1 from "@/assets/img/courses/courses_details.jpg"
import course_details_img2 from "@/assets/img/courses/course_author001.png"

const tab_title: string[] = ["Genel Bakış", "Müfredat", "Eğitmenler"];

const CourseDetailsArea = ({ single_course }: any) => {

  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <section className="courses__details-area section-py-120">
      <div className="container">
        <div className="row">
          <div className="col-xl-9 col-lg-8">
            <div className="courses__details-thumb">
              <Image src={course_details_img1} alt="img" />
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href="/kurslar">{single_course?.category ? single_course.category : "Geliştirme"}</Link>
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
          <Sidebar />
        </div>
      </div>
    </section>
  )
}

export default CourseDetailsArea
