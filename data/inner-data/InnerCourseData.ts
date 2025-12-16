import { StaticImageData } from "next/image";

import course_thumb1 from "@/assets/img/courses/course_thumb01.jpg"
import course_thumb2 from "@/assets/img/courses/course_thumb02.jpg"
import course_thumb3 from "@/assets/img/courses/course_thumb03.jpg"
import course_thumb4 from "@/assets/img/courses/course_thumb04.jpg"
import course_thumb5 from "@/assets/img/courses/course_thumb05.jpg"
import course_thumb6 from "@/assets/img/courses/course_thumb06.jpg"
import course_thumb7 from "@/assets/img/courses/course_thumb07.jpg"
import course_thumb8 from "@/assets/img/courses/course_thumb08.jpg"
import course_thumb9 from "@/assets/img/courses/course_thumb09.jpg"
import course_thumb10 from "@/assets/img/courses/course_thumb10.jpg"
import course_thumb11 from "@/assets/img/courses/course_thumb11.jpg"
import course_thumb12 from "@/assets/img/courses/course_thumb12.jpg"

interface CurriculumLesson {
   lock: boolean;
   title: string;
   duration: string;
   class_name?: string;
}

interface CurriculumSection {
   id: number;
   title: string;
   show?: string;
   collapsed?: string;
   lessons: CurriculumLesson[];
}

interface InstructorDetail {
   name: string;
   designation: string;
   rating: number;
   bio: string;
   image: string;
}

interface DataType {
   id: number;
   thumb: StaticImageData;
   category: string;
   rating: number;
   ratingCount: number;
   title: string;
   desc: string;
   instructors: string;
   price: number;
   originalPrice: number;
   skill_level: string;
   price_type: string;
   language: string;
   popular?: string;
   // Course Details
   publishDate: string;
   totalStudents: number;
   duration: string;
   totalLessons: number;
   graduates: string;
   videoId: string;
   // Overview
   overview: {
      description: string;
      whatYouWillLearn: string;
      learningObjectives: string[];
      conclusion: string;
   };
   // Curriculum
   curriculum: CurriculumSection[];
   // Instructor Details
   instructorDetails: InstructorDetail[];
}[];

const inner_course_data: DataType[] = [
   {
      id: 1,
      thumb: course_thumb1,
      category: "Geliştirme",
      rating: 4.9,
      ratingCount: 1250,
      title: "Hayal Gücüyle JavaScript Öğrenmek",
      instructors: "Ahmet Yılmaz",
      price: 0,
      originalPrice: 299,
      skill_level: "Başlangıç",
      price_type: "Ücretsiz",
      language: "Türkçe",
      desc: "JavaScript'i sıfırdan ileri seviyeye kadar öğrenin. Modern web geliştirme teknikleri, ES6+ özellikleri ve gerçek dünya projeleri ile pratik yapın.",
      publishDate: "15/01/2024",
      totalStudents: 3450,
      duration: "18sa 45dk",
      totalLessons: 24,
      graduates: "2.8K",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "Bu kurs, JavaScript'i sıfırdan öğrenmek isteyenler için kapsamlı bir eğitim programı sunmaktadır. Modern web geliştirme tekniklerini öğrenirken, temel kavramlardan başlayarak ileri seviye konulara kadar geniş bir yelpazede bilgi ve beceri kazandırmayı hedeflemektedir. Pratik örnekler ve gerçek dünya projeleri ile öğrenme deneyimini zenginleştirmektedir.",
         whatYouWillLearn: "Kurs boyunca JavaScript'in temel ve ileri seviye konularını kapsayan detaylı bir müfredat ile karşılaşacaksınız. Her konu, pratik örnekler ve uygulamalı projeler ile desteklenmektedir. ES6+ özellikleri, asenkron programlama, DOM manipülasyonu ve modern framework'lere hazırlık konularında uzmanlaşacaksınız.",
         learningObjectives: [
            "JavaScript temellerini ve ES6+ özelliklerini öğrenme",
            "DOM manipülasyonu ve event handling teknikleri",
            "Asenkron programlama (Promises, Async/Await)",
            "Modern JavaScript framework'lerine hazırlık",
            "Gerçek dünya projeleri geliştirme",
            "Clean code ve best practices uygulama"
         ],
         conclusion: "Kurs içeriği, başlangıç seviyesinden ileri seviyeye kadar tüm öğrencilere uygun olacak şekilde tasarlanmıştır. Her bölüm, önceki konuları pekiştirerek ilerlemekte ve öğrenme sürecini kolaylaştırmaktadır. Pratik uygulamalar ve gerçek proje örnekleri ile bilgilerinizi pekiştirebilir ve portföyünüzü geliştirebilirsiniz."
      },
      curriculum: [
         {
            id: 1,
            title: "JavaScript Temelleri",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Kursa Giriş ve Genel Bakış", duration: "05:30" },
               { lock: true, title: "Değişkenler ve Veri Tipleri", duration: "12:45" },
               { lock: true, title: "Operatörler ve Koşullu İfadeler", duration: "15:20" },
               { lock: true, title: "Döngüler ve Iterasyon", duration: "18:10" }
            ]
         },
         {
            id: 2,
            title: "Fonksiyonlar ve Scope",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Fonksiyon Tanımlama ve Çağırma", duration: "14:30" },
               { lock: true, title: "Arrow Functions ve This Keyword", duration: "16:25" },
               { lock: true, title: "Closure ve Scope Zinciri", duration: "19:40" },
               { lock: true, title: "Higher Order Functions", duration: "22:15" }
            ]
         },
         {
            id: 3,
            title: "ES6+ Özellikleri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Destructuring ve Spread Operator", duration: "13:50" },
               { lock: true, title: "Template Literals ve String Methods", duration: "11:30" },
               { lock: true, title: "Modules ve Import/Export", duration: "17:20" },
               { lock: true, title: "Classes ve Inheritance", duration: "20:45" }
            ]
         },
         {
            id: 4,
            title: "Asenkron JavaScript",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Callbacks ve Callback Hell", duration: "14:15" },
               { lock: true, title: "Promises ve Promise Chaining", duration: "18:30" },
               { lock: true, title: "Async/Await Kullanımı", duration: "16:50" },
               { lock: true, title: "Fetch API ve AJAX", duration: "21:25" }
            ]
         },
         {
            id: 5,
            title: "DOM Manipülasyonu",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "DOM Seçicileri ve Traversing", duration: "15:40" },
               { lock: true, title: "Element Oluşturma ve Değiştirme", duration: "17:55" },
               { lock: true, title: "Event Handling ve Delegation", duration: "19:30" },
               { lock: true, title: "Form Validation Projesi", duration: "25:20" }
            ]
         },
         {
            id: 6,
            title: "Final Projeler",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Todo List Uygulaması", duration: "32:15" },
               { lock: true, title: "Weather App API Entegrasyonu", duration: "28:40" },
               { lock: true, title: "E-Commerce Sepet Sistemi", duration: "35:50" },
               { lock: true, title: "Kurs Özeti ve Sonraki Adımlar", duration: "10:30" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Ahmet Yılmaz",
            designation: "Senior JavaScript Developer",
            rating: 4.9,
            bio: "12 yılı aşkın deneyime sahip yazılım geliştirme uzmanı. Web teknolojileri, modern JavaScript framework'leri ve full-stack development konularında uzmanlaşmıştır. Google ve Microsoft gibi büyük teknoloji şirketlerinde çalışmış, 50.000'den fazla öğrenciye eğitim vermiştir. Açık kaynak projelere aktif katkıda bulunmakta ve düzenli olarak teknik konferanslarda konuşmacı olarak yer almaktadır.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   },
   {
      id: 2,
      thumb: course_thumb2,
      category: "Sanat ve Tasarım",
      rating: 4.7,
      ratingCount: 890,
      title: "Başlangıç Seviyesi İçin Eksiksiz Grafik Tasarım",
      instructors: "Zeynep Kaya",
      price: 249,
      originalPrice: 499,
      skill_level: "Başlangıç",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Adobe Photoshop, Illustrator ve InDesign kullanarak profesyonel grafik tasarım becerilerini öğrenin. Logo tasarımından marka kimliğine kadar her şeyi kapsayan kapsamlı eğitim.",
      publishDate: "22/02/2024",
      totalStudents: 2150,
      duration: "22sa 15dk",
      totalLessons: 28,
      graduates: "1.9K",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "Grafik tasarım dünyasına adım atmak isteyenler için hazırlanmış kapsamlı bir eğitim programı. Adobe Creative Suite araçlarını kullanarak profesyonel tasarımlar oluşturmayı öğreneceksiniz. Temel tasarım prensiplerinden başlayarak, gerçek müşteri projeleri üzerinde çalışma deneyimi kazanacaksınız.",
         whatYouWillLearn: "Bu kursta renk teorisi, tipografi, kompozisyon ve görsel hiyerarşi gibi temel tasarım prensiplerini öğreneceksiniz. Adobe Photoshop, Illustrator ve InDesign programlarında uzmanlaşarak, logo tasarımı, poster tasarımı, sosyal medya görselleri ve marka kimliği oluşturma konularında pratik yapacaksınız.",
         learningObjectives: [
            "Adobe Photoshop, Illustrator ve InDesign'da uzmanlaşma",
            "Renk teorisi ve tipografi prensiplerini uygulama",
            "Logo ve marka kimliği tasarlama",
            "Poster, broşür ve reklam materyalleri oluşturma",
            "Sosyal medya için görsel içerik üretme",
            "Profesyonel portföy hazırlama"
         ],
         conclusion: "Kurs sonunda profesyonel grafik tasarım projelerini baştan sona yönetebilecek, müşteri brifleriyle çalışabilecek ve kendi tasarım stilinizi geliştirebileceksiniz. Gerçek dünya projeleri ile dolu bir portföye sahip olacaksınız."
      },
      curriculum: [
         {
            id: 1,
            title: "Tasarım Temelleri",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Grafik Tasarıma Giriş", duration: "08:20" },
               { lock: true, title: "Renk Teorisi ve Psikolojisi", duration: "16:45" },
               { lock: true, title: "Tipografi Temelleri", duration: "14:30" },
               { lock: true, title: "Kompozisyon ve Görsel Hiyerarşi", duration: "18:55" }
            ]
         },
         {
            id: 2,
            title: "Adobe Photoshop",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Photoshop Arayüzü ve Temel Araçlar", duration: "12:40" },
               { lock: true, title: "Katmanlar ve Maskeleme", duration: "20:15" },
               { lock: true, title: "Fotoğraf Düzenleme ve Retüş", duration: "25:30" },
               { lock: true, title: "Efektler ve Filtreler", duration: "18:20" }
            ]
         },
         {
            id: 3,
            title: "Adobe Illustrator",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Vektör Grafiklere Giriş", duration: "10:50" },
               { lock: true, title: "Pen Tool ve Shape Builder", duration: "22:35" },
               { lock: true, title: "Logo Tasarımı Pratiği", duration: "28:40" },
               { lock: true, title: "İkon ve İllüstrasyon Oluşturma", duration: "24:15" }
            ]
         },
         {
            id: 4,
            title: "Adobe InDesign",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Sayfa Düzeni ve Master Pages", duration: "15:30" },
               { lock: true, title: "Tipografi ve Paragraf Stilleri", duration: "17:45" },
               { lock: true, title: "Broşür ve Katalog Tasarımı", duration: "26:20" },
               { lock: true, title: "Baskıya Hazırlık", duration: "14:55" }
            ]
         },
         {
            id: 5,
            title: "Marka Kimliği",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Marka Stratejisi ve Araştırma", duration: "19:40" },
               { lock: true, title: "Logo Tasarım Süreci", duration: "30:25" },
               { lock: true, title: "Marka Kılavuzu Oluşturma", duration: "22:50" },
               { lock: true, title: "Kurumsal Kimlik Uygulamaları", duration: "25:15" }
            ]
         },
         {
            id: 6,
            title: "Portföy Projeleri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Sosyal Medya Kampanyası Tasarımı", duration: "32:40" },
               { lock: true, title: "Etkinlik Posteri ve Afişi", duration: "28:30" },
               { lock: true, title: "E-Kitap Kapağı Tasarımı", duration: "24:55" },
               { lock: true, title: "Portföy Sunumu Hazırlama", duration: "16:20" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Zeynep Kaya",
            designation: "Creative Director & Grafik Tasarımcı",
            rating: 4.8,
            bio: "15 yıllık grafik tasarım deneyimine sahip yaratıcı direktör. Uluslararası markaların kampanyalarında yer almış, birçok tasarım ödülü kazanmıştır. Adobe Certified Expert unvanına sahip olan Zeynep, 30.000'den fazla öğrenciye grafik tasarım eğitimi vermiştir. Freelance tasarımcıların mentoru olarak da aktif olarak çalışmaktadır.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   },
   {
      id: 3,
      thumb: course_thumb3,
      category: "İşletme",
      rating: 4.8,
      ratingCount: 1580,
      title: "Facebook'ta Dijital Pazarlama Öğrenmek",
      instructors: "Mehmet Demir",
      price: 199,
      originalPrice: 399,
      skill_level: "Orta",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Facebook ve Instagram reklamcılığında uzmanlaşın. Hedef kitle analizi, reklam kampanyası yönetimi ve ROI optimizasyonu ile satışlarınızı artırın.",
      publishDate: "10/03/2024",
      totalStudents: 4200,
      duration: "16sa 30dk",
      totalLessons: 20,
      graduates: "3.5K",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "Facebook ve Instagram platformlarında etkili dijital pazarlama kampanyaları oluşturmayı öğrenin. Meta Business Suite kullanarak profesyonel reklam yönetimi, hedef kitle segmentasyonu ve performans analizi yapabileceksiniz. E-ticaret, lead generation ve marka bilinirliği kampanyaları oluşturma konularında uzmanlaşacaksınız.",
         whatYouWillLearn: "Bu kursta Facebook Ads Manager, Instagram reklamları, Pixel kurulumu, hedef kitle oluşturma, A/B testing, kampanya optimizasyonu ve reklam bütçesi yönetimi konularında derinlemesine bilgi edineceksiniz. Gerçek kampanya örnekleri ve case study'ler ile pratik deneyim kazanacaksınız.",
         learningObjectives: [
            "Facebook Ads Manager'ı profesyonel seviyede kullanma",
            "Hedef kitle analizi ve segmentasyon stratejileri",
            "Etkili reklam metinleri ve görselleri oluşturma",
            "Facebook Pixel kurulumu ve conversion tracking",
            "Kampanya optimizasyonu ve A/B testing",
            "ROI analizi ve performans raporlama"
         ],
         conclusion: "Kurs sonunda kendi dijital pazarlama kampanyalarınızı oluşturabilecek, yönetebilecek ve optimize edebileceksiniz. E-ticaret işletmeleri, KOBİ'ler veya kendi işiniz için etkili Facebook ve Instagram reklamları çalıştırabileceksiniz."
      },
      curriculum: [
         {
            id: 1,
            title: "Dijital Pazarlama Temelleri",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Dijital Pazarlamaya Giriş", duration: "10:15" },
               { lock: true, title: "Facebook ve Instagram Ekosistemi", duration: "14:30" },
               { lock: true, title: "Meta Business Suite Kurulumu", duration: "12:45" },
               { lock: true, title: "Pazarlama Hedefleri Belirleme", duration: "16:20" }
            ]
         },
         {
            id: 2,
            title: "Facebook Ads Manager",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Ads Manager Arayüzü ve Yapısı", duration: "13:40" },
               { lock: true, title: "Kampanya Yapısı: Kampanya, Ad Set, Ad", duration: "18:25" },
               { lock: true, title: "Reklam Hedefleri ve Optimizasyon", duration: "20:15" },
               { lock: true, title: "Bütçe ve Teklif Stratejileri", duration: "17:50" }
            ]
         },
         {
            id: 3,
            title: "Hedef Kitle Stratejileri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Demografi ve İlgi Alanı Hedeflemesi", duration: "15:30" },
               { lock: true, title: "Custom Audiences Oluşturma", duration: "19:45" },
               { lock: true, title: "Lookalike Audiences Stratejisi", duration: "18:20" },
               { lock: true, title: "Retargeting Kampanyaları", duration: "21:35" }
            ]
         },
         {
            id: 4,
            title: "Reklam Kreatifi",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Etkili Reklam Metni Yazma", duration: "16:40" },
               { lock: true, title: "Görsel ve Video Tasarım İpuçları", duration: "19:55" },
               { lock: true, title: "Carousel ve Collection Ads", duration: "17:25" },
               { lock: true, title: "Instagram Stories ve Reels Reklamları", duration: "15:30" }
            ]
         },
         {
            id: 5,
            title: "Tracking ve Analiz",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Facebook Pixel Kurulumu", duration: "14:50" },
               { lock: true, title: "Conversion Tracking ve Events", duration: "18:40" },
               { lock: true, title: "Google Analytics Entegrasyonu", duration: "16:25" },
               { lock: true, title: "Performans Metrikleri ve KPI'lar", duration: "20:15" }
            ]
         },
         {
            id: 6,
            title: "Kampanya Optimizasyonu",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "A/B Testing Stratejileri", duration: "22:30" },
               { lock: true, title: "Kampanya Ölçeklendirme", duration: "19:45" },
               { lock: true, title: "E-Ticaret Kampanya Case Study", duration: "28:20" },
               { lock: true, title: "Lead Generation Kampanya Örneği", duration: "25:40" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Mehmet Demir",
            designation: "Dijital Pazarlama Stratejisti",
            rating: 4.9,
            bio: "10 yıldır dijital pazarlama alanında çalışan ve yüzlerce işletmeye danışmanlık veren uzman. Facebook Blueprint sertifikalı eğitmen olarak, 40.000'den fazla öğrenciye dijital pazarlama eğitimi vermiştir. E-ticaret şirketleri için toplam 50 milyon TL'den fazla reklam bütçesi yönetmiş ve ortalama %300 ROI artışı sağlamıştır.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   },
   {
      id: 4,
      thumb: course_thumb4,
      category: "Veri Bilimi",
      rating: 4.9,
      ratingCount: 2100,
      title: "Python ile Veri Bilimi ve Makine Öğrenmesi",
      instructors: "Dr. Ayşe Yıldız",
      price: 0,
      originalPrice: 599,
      skill_level: "Orta",
      price_type: "Ücretsiz",
      language: "Türkçe",
      desc: "Python, Pandas, NumPy ve Scikit-learn kullanarak veri analizi ve makine öğrenmesi projelerini hayata geçirin. Gerçek veri setleri ile pratik yapın.",
      publishDate: "05/04/2024",
      totalStudents: 5800,
      duration: "28sa 40dk",
      totalLessons: 35,
      graduates: "4.2K",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "Veri bilimi ve makine öğrenmesi alanında kariyer yapmak isteyenler için hazırlanmış kapsamlı bir eğitim programı. Python programlama dilini kullanarak veri analizi, görselleştirme ve makine öğrenmesi modellerini öğreneceksiniz. Pandas, NumPy, Matplotlib, Seaborn ve Scikit-learn kütüphanelerinde uzmanlaşacaksınız.",
         whatYouWillLearn: "Bu kursta veri temizleme, keşifsel veri analizi (EDA), istatistiksel analiz, veri görselleştirme, regresyon, sınıflandırma, kümeleme algoritmaları ve model değerlendirme tekniklerini öğreneceksiniz. Gerçek dünya veri setleri üzerinde çalışarak pratik deneyim kazanacaksınız.",
         learningObjectives: [
            "Python ile veri analizi ve manipülasyonu",
            "Pandas ve NumPy kütüphanelerinde uzmanlaşma",
            "Veri görselleştirme teknikleri (Matplotlib, Seaborn)",
            "Makine öğrenmesi algoritmalarını uygulama",
            "Model eğitimi, değerlendirme ve optimizasyonu",
            "Gerçek veri bilimi projeleri geliştirme"
         ],
         conclusion: "Kurs sonunda veri bilimi projelerini baştan sona yönetebilecek, veri analizi yapabilecek ve makine öğrenmesi modelleri geliştirebileceksiniz. Kaggle yarışmalarına katılabilecek ve veri bilimi portföyünüzü oluşturabilecek seviyeye ulaşacaksınız."
      },
      curriculum: [
         {
            id: 1,
            title: "Python Temelleri",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Python ve Veri Bilimine Giriş", duration: "12:30" },
               { lock: true, title: "Python Veri Yapıları", duration: "18:45" },
               { lock: true, title: "NumPy Temelleri", duration: "22:20" },
               { lock: true, title: "Pandas ile Veri Manipülasyonu", duration: "25:40" }
            ]
         },
         {
            id: 2,
            title: "Veri Analizi",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Veri Temizleme Teknikleri", duration: "20:15" },
               { lock: true, title: "Keşifsel Veri Analizi (EDA)", duration: "24:30" },
               { lock: true, title: "İstatistiksel Analiz", duration: "21:45" },
               { lock: true, title: "Veri Dönüştürme ve Feature Engineering", duration: "23:20" }
            ]
         },
         {
            id: 3,
            title: "Veri Görselleştirme",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Matplotlib ile Grafik Oluşturma", duration: "18:40" },
               { lock: true, title: "Seaborn ile İleri Görselleştirme", duration: "22:15" },
               { lock: true, title: "Plotly ile İnteraktif Grafikler", duration: "19:50" },
               { lock: true, title: "Dashboard Oluşturma", duration: "24:30" }
            ]
         },
         {
            id: 4,
            title: "Makine Öğrenmesi Temelleri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Makine Öğrenmesine Giriş", duration: "16:25" },
               { lock: true, title: "Supervised vs Unsupervised Learning", duration: "19:40" },
               { lock: true, title: "Train-Test Split ve Cross Validation", duration: "21:15" },
               { lock: true, title: "Model Değerlendirme Metrikleri", duration: "23:50" }
            ]
         },
         {
            id: 5,
            title: "Regresyon ve Sınıflandırma",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Linear Regression", duration: "25:30" },
               { lock: true, title: "Logistic Regression", duration: "24:15" },
               { lock: true, title: "Decision Trees ve Random Forest", duration: "28:40" },
               { lock: true, title: "Support Vector Machines (SVM)", duration: "26:20" }
            ]
         },
         {
            id: 6,
            title: "İleri Seviye Konular",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Kümeleme Algoritmaları (K-Means)", duration: "22:45" },
               { lock: true, title: "Dimensionality Reduction (PCA)", duration: "24:30" },
               { lock: true, title: "Ensemble Methods", duration: "26:15" },
               { lock: true, title: "Hyperparameter Tuning", duration: "23:40" }
            ]
         },
         {
            id: 7,
            title: "Gerçek Dünya Projeleri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Ev Fiyat Tahmini Projesi", duration: "35:20" },
               { lock: true, title: "Müşteri Segmentasyonu Projesi", duration: "32:45" },
               { lock: true, title: "Kredi Risk Analizi", duration: "38:15" },
               { lock: true, title: "Kaggle Yarışmasına Hazırlık", duration: "28:30" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Dr. Ayşe Yıldız",
            designation: "Veri Bilimci & Makine Öğrenmesi Uzmanı",
            rating: 4.9,
            bio: "Bilgisayar Mühendisliği alanında doktora derecesine sahip, 8 yıldır veri bilimi ve makine öğrenmesi alanında çalışan uzman. Google ve Amazon'da veri bilimci olarak görev almış, birçok büyük ölçekli ML projesi geliştirmiştir. Kaggle Grandmaster unvanına sahip olan Dr. Yıldız, 45.000'den fazla öğrenciye veri bilimi eğitimi vermiştir.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   },
   {
      id: 5,
      thumb: course_thumb5,
      category: "Finans",
      rating: 4.6,
      ratingCount: 750,
      title: "Finansal Analiz ve Yatırım Stratejileri",
      instructors: "Can Öztürk",
      price: 349,
      originalPrice: 699,
      skill_level: "İleri",
      price_type: "Ücretli",
      language: "Türkçe",
      popular: "popular",
      desc: "Hisse senedi analizi, portföy yönetimi ve yatırım stratejileri öğrenin. Teknik ve temel analiz yöntemleri ile bilinçli yatırım kararları alın.",
      publishDate: "18/05/2024",
      totalStudents: 1850,
      duration: "24sa 20dk",
      totalLessons: 30,
      graduates: "1.2K",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "Finansal piyasalarda başarılı olmak isteyenler için hazırlanmış kapsamlı bir yatırım eğitimi. Hisse senedi analizi, portföy yönetimi, risk yönetimi ve yatırım stratejileri konularında derinlemesine bilgi edineceksiniz. Hem teknik hem de temel analiz yöntemlerini öğrenerek bilinçli yatırım kararları alabileceksiniz.",
         whatYouWillLearn: "Bu kursta finansal tablolar analizi, değerleme yöntemleri, teknik analiz göstergeleri, grafik formasyonları, portföy optimizasyonu, risk yönetimi ve psikolojik faktörler konularında uzmanlaşacaksınız. Gerçek piyasa verileri ile pratik yaparak deneyim kazanacaksınız.",
         learningObjectives: [
            "Finansal tablo analizi ve değerleme yöntemleri",
            "Teknik analiz göstergeleri ve grafik formasyonları",
            "Portföy oluşturma ve diversifikasyon stratejileri",
            "Risk yönetimi ve pozisyon boyutlandırma",
            "Yatırım psikolojisi ve davranışsal finans",
            "Gerçek piyasa koşullarında strateji uygulama"
         ],
         conclusion: "Kurs sonunda kendi yatırım stratejilerinizi geliştirebilecek, portföyünüzü profesyonel şekilde yönetebilecek ve piyasa analizleri yapabileceksiniz. Hem kısa vadeli trading hem de uzun vadeli yatırım stratejileri konusunda bilgi sahibi olacaksınız."
      },
      curriculum: [
         {
            id: 1,
            title: "Finansal Piyasalara Giriş",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Finansal Piyasalar ve Araçlar", duration: "14:20" },
               { lock: true, title: "Borsa Nasıl Çalışır?", duration: "18:35" },
               { lock: true, title: "Yatırım Araçları ve Türleri", duration: "16:45" },
               { lock: true, title: "Risk ve Getiri İlişkisi", duration: "20:15" }
            ]
         },
         {
            id: 2,
            title: "Temel Analiz",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Finansal Tablolar Analizi", duration: "25:40" },
               { lock: true, title: "Değerleme Yöntemleri (DCF, P/E)", duration: "28:30" },
               { lock: true, title: "Sektör ve Makro Ekonomi Analizi", duration: "22:15" },
               { lock: true, title: "Şirket Araştırması ve Due Diligence", duration: "24:50" }
            ]
         },
         {
            id: 3,
            title: "Teknik Analiz",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Grafik Türleri ve Mum Formasyonları", duration: "20:30" },
               { lock: true, title: "Trend Analizi ve Destek-Direnç", duration: "23:45" },
               { lock: true, title: "Teknik Göstergeler (RSI, MACD, Bollinger)", duration: "26:20" },
               { lock: true, title: "Grafik Formasyonları ve Patternler", duration: "24:15" }
            ]
         },
         {
            id: 4,
            title: "Portföy Yönetimi",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Modern Portföy Teorisi", duration: "22:40" },
               { lock: true, title: "Varlık Dağılımı ve Diversifikasyon", duration: "25:15" },
               { lock: true, title: "Portföy Optimizasyonu", duration: "23:50" },
               { lock: true, title: "Rebalancing Stratejileri", duration: "21:30" }
            ]
         },
         {
            id: 5,
            title: "Risk Yönetimi",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Risk Türleri ve Ölçüm Yöntemleri", duration: "19:45" },
               { lock: true, title: "Stop Loss ve Take Profit Stratejileri", duration: "22:30" },
               { lock: true, title: "Pozisyon Boyutlandırma", duration: "20:15" },
               { lock: true, title: "Hedge Stratejileri", duration: "24:40" }
            ]
         },
         {
            id: 6,
            title: "Yatırım Stratejileri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Değer Yatırımı (Value Investing)", duration: "26:30" },
               { lock: true, title: "Büyüme Yatırımı (Growth Investing)", duration: "24:45" },
               { lock: true, title: "Momentum Trading Stratejileri", duration: "28:20" },
               { lock: true, title: "Swing Trading ve Day Trading", duration: "25:15" }
            ]
         },
         {
            id: 7,
            title: "İleri Seviye Konular",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Davranışsal Finans ve Yatırım Psikolojisi", duration: "23:40" },
               { lock: true, title: "Algoritmik Trading'e Giriş", duration: "27:30" },
               { lock: true, title: "Gerçek Portföy Analizi Case Study", duration: "32:15" },
               { lock: true, title: "Yatırım Planı Oluşturma", duration: "21:50" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Can Öztürk",
            designation: "CFA, Portföy Yöneticisi",
            rating: 4.7,
            bio: "CFA (Chartered Financial Analyst) unvanına sahip, 14 yıldır finans sektöründe çalışan deneyimli portföy yöneticisi. Yatırım bankacılığı ve varlık yönetimi alanlarında çalışmış, 500 milyon TL'den fazla portföy yönetmiştir. Bloomberg TV ve CNBC'de düzenli olarak piyasa yorumları yapan Can Öztürk, 25.000'den fazla öğrenciye finansal analiz eğitimi vermiştir.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   },
   {
      id: 6,
      thumb: course_thumb6,
      category: "Kişisel Gelişim",
      rating: 4.5,
      ratingCount: 620,
      title: "Etkili İletişim ve Sunum Becerileri",
      instructors: "Elif Arslan",
      price: 179,
      originalPrice: 349,
      skill_level: "Başlangıç",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Profesyonel iletişim becerileri geliştirin, etkili sunumlar yapın ve kariyerinizde fark yaratın. Beden dili, diksiyon ve ikna teknikleri öğrenin.",
      publishDate: "28/06/2024",
      totalStudents: 1450,
      duration: "14sa 50dk",
      totalLessons: 18,
      graduates: "980",
      videoId: "b2Az7_lLh3g",
      overview: {
         description: "İş hayatında ve sosyal yaşamda başarılı olmak için gerekli iletişim becerilerini geliştirin. Etkili sunum teknikleri, beden dili, ses kullanımı, ikna sanatı ve müzakere becerileri konularında uzmanlaşacaksınız. Kamera karşısında rahat olma, topluluk önünde konuşma ve profesyonel görüşmelerde başarılı olma yöntemlerini öğreneceksiniz.",
         whatYouWillLearn: "Bu kursta etkili iletişimin temel prensiplerini, aktif dinleme tekniklerini, beden dili ipuçlarını, ses tonunu doğru kullanmayı, sunum hazırlama ve sunma tekniklerini, ikna ve müzakere stratejilerini öğreneceksiniz. Pratik egzersizler ve gerçek senaryolar ile becerilerinizi geliştireceksiniz.",
         learningObjectives: [
            "Etkili iletişim ve aktif dinleme becerileri",
            "Beden dili ve sözsüz iletişim teknikleri",
            "Profesyonel sunum hazırlama ve sunma",
            "İkna ve müzakere stratejileri",
            "Topluluk önünde konuşma özgüveni",
            "Kriz iletişimi ve zor durumlarla başa çıkma"
         ],
         conclusion: "Kurs sonunda profesyonel ortamlarda kendinden emin bir şekilde iletişim kurabilecek, etkili sunumlar yapabilecek ve kariyerinizde fark yaratacak iletişim becerilerine sahip olacaksınız. İş görüşmeleri, müşteri sunumları ve ekip yönetiminde başarılı olacaksınız."
      },
      curriculum: [
         {
            id: 1,
            title: "İletişim Temelleri",
            show: "show",
            lessons: [
               { class_name: "open-item", lock: false, title: "Etkili İletişime Giriş", duration: "10:30" },
               { lock: true, title: "İletişim Modelleri ve Engeller", duration: "15:20" },
               { lock: true, title: "Aktif Dinleme Teknikleri", duration: "18:45" },
               { lock: true, title: "Empati ve Duygusal Zeka", duration: "16:30" }
            ]
         },
         {
            id: 2,
            title: "Beden Dili ve Sözsüz İletişim",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Beden Dili Temelleri", duration: "17:40" },
               { lock: true, title: "Göz Teması ve Yüz İfadeleri", duration: "14:25" },
               { lock: true, title: "Duruş ve Jestler", duration: "16:50" },
               { lock: true, title: "Kişisel Alan ve Proksemik", duration: "15:15" }
            ]
         },
         {
            id: 3,
            title: "Ses ve Diksiyon",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Ses Tonunu Etkili Kullanma", duration: "18:30" },
               { lock: true, title: "Diksiyon ve Telaffuz Egzersizleri", duration: "20:15" },
               { lock: true, title: "Tempo ve Vurgu Teknikleri", duration: "16:40" },
               { lock: true, title: "Nefes Kontrolü ve Projeksiyon", duration: "17:25" }
            ]
         },
         {
            id: 4,
            title: "Sunum Becerileri",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "Sunum Hazırlama Süreci", duration: "22:30" },
               { lock: true, title: "PowerPoint ve Görsel Tasarım", duration: "19:45" },
               { lock: true, title: "Hikaye Anlatıcılığı (Storytelling)", duration: "21:20" },
               { lock: true, title: "Soru-Cevap Yönetimi", duration: "18:15" }
            ]
         },
         {
            id: 5,
            title: "İkna ve Müzakere",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "İkna Psikolojisi ve Teknikler", duration: "20:40" },
               { lock: true, title: "Müzakere Stratejileri", duration: "23:15" },
               { lock: true, title: "Karşı Argümanlara Cevap Verme", duration: "19:30" },
               { lock: true, title: "Kazan-Kazan Yaklaşımı", duration: "21:45" }
            ]
         },
         {
            id: 6,
            title: "Özel Durumlar",
            collapsed: "collapsed",
            lessons: [
               { lock: true, title: "İş Görüşmelerinde İletişim", duration: "24:20" },
               { lock: true, title: "Kriz İletişimi Yönetimi", duration: "22:35" },
               { lock: true, title: "Zor Kişiliklerle Başa Çıkma", duration: "20:50" },
               { lock: true, title: "Online Toplantı ve Webinar Teknikleri", duration: "18:40" }
            ]
         }
      ],
      instructorDetails: [
         {
            name: "Elif Arslan",
            designation: "İletişim Koçu & Sunum Eğitmeni",
            rating: 4.6,
            bio: "İletişim Bilimleri alanında yüksek lisans derecesine sahip, 11 yıldır kurumsal iletişim eğitimleri veren uzman. Fortune 500 şirketlerinde iletişim danışmanlığı yapmış, binlerce yönetici ve profesyonele eğitim vermiştir. TEDx konuşmacısı olan Elif Arslan, 20.000'den fazla öğrenciye etkili iletişim becerileri kazandırmıştır.",
            image: "/assets/img/courses/course_author001.png"
         }
      ]
   }
]

export default inner_course_data;
