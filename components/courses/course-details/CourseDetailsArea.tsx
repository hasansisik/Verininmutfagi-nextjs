"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import Curriculum from "./Curriculum"
import Instructors from "./Instructors"

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
              <Image
                src={single_course.thumb || '/assets/img/courses/course_thumb01.jpg'}
                alt={single_course.title}
                width={1200}
                height={600}
                style={{ width: '100%', height: 'auto' }}
                className="img-fluid"
              />
            </div>
            <div className="courses__details-content">
              <ul className="courses__item-meta list-wrap">
                <li className="courses__item-tag">
                  <Link href="/kurslar">{single_course.category?.name || 'Kategori'}</Link>
                </li>
                <li className="avg-rating"><i className="fas fa-star"></i>4.5 (120 Değerlendirme)</li>
              </ul>
              <h2 className="title">{single_course.title}</h2>
              <div className="courses__details-meta">
                <ul className="list-wrap">
                  <li className="author-two">
                    Yazar: <Link href="#">{single_course.instructors || 'Eğitmen'}</Link>
                  </li>
                  <li className="date"><i className="flaticon-calendar"></i>{single_course.publishDate || new Date().toLocaleDateString('tr-TR')}</li>
                  <li><i className="flaticon-mortarboard"></i>{single_course.totalStudents?.toLocaleString('tr-TR') || '0'} Öğrenci</li>
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
                  {single_course?.overview && <Overview overview={single_course.overview} />}
                </div>
                <div className={`tab-pane fade ${activeTab === 1 ? 'show active' : ''}`} id="curriculum-tab-pane" role="tabpanel" aria-labelledby="curriculum-tab">
                  {single_course?.curriculum && single_course?.videoId && (
                    <Curriculum curriculum={single_course.curriculum} videoId={single_course.videoId} />
                  )}
                </div>
                <div className={`tab-pane fade ${activeTab === 2 ? 'show active' : ''}`} id="instructors-tab-pane" role="tabpanel" aria-labelledby="instructors-tab">
                  {single_course?.instructorDetails && <Instructors instructorDetails={single_course.instructorDetails} />}
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
