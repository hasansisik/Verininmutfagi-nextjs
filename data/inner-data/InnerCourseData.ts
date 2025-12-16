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

interface DataType {
   id: number;
   thumb: StaticImageData;
   category: string;
   rating: number;
   title: string;
   desc: string;
   instructors: string;
   price: number;
   skill_level: string;
   price_type: string;
   language: string;
   popular?: string;
}[];

const inner_course_data: DataType[] = [
   {
      id: 1,
      thumb: course_thumb1,
      category: "Geliştirme",
      rating: 5,
      title: "Hayal Gücüyle JavaScript Öğrenmek",
      instructors: "Ahmet Yılmaz",
      price: 15,
      skill_level: "Başlangıç",
      price_type: "Ücretsiz",
      language: "Türkçe",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   },
   {
      id: 2,
      thumb: course_thumb2,
      category: "Sanat ve Tasarım",
      rating: 4.5,
      title: "Başlangıç Seviyesi İçin Eksiksiz Grafik Tasarım",
      instructors: "Ahmet Yılmaz",
      price: 19,
      skill_level: "Orta",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   },
   {
      id: 3,
      thumb: course_thumb3,
      category: "İşletme",
      rating: 4.8,
      title: "Facebook'ta Dijital Pazarlama Öğrenmek",
      instructors: "Ahmet Yılmaz",
      price: 10,
      skill_level: "İleri",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   },
   {
      id: 4,
      thumb: course_thumb4,
      category: "Veri Bilimi",
      rating: 5,
      title: "Finansal Analist Eğitimi ve Yatırım Kursu",
      instructors: "Ahmet Yılmaz",
      price: 12,
      skill_level: "Başlangıç",
      price_type: "Ücretsiz",
      language: "Türkçe",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   },
   {
      id: 5,
      thumb: course_thumb5,
      category: "Finans",
      rating: 4,
      title: "Veri Analizi ve Görselleştirme Ustalık Sınıfı",
      instructors: "Ahmet Yılmaz",
      price: 27,
      skill_level: "Başlangıç",
      price_type: "Ücretli",
      language: "Türkçe",
      popular: "popular",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   },
   {
      id: 6,
      thumb: course_thumb6,
      category: "Sağlık ve Fitness",
      rating: 3,
      title: "Matematiğin Temellerinde Ustalaşmak",
      instructors: "Ahmet Yılmaz",
      price: 10,
      skill_level: "Orta",
      price_type: "Ücretli",
      language: "Türkçe",
      desc: "Bilinmeyen bir matbaacı bir harf galerisi aldı ve bir yazı örneği kitabını karıştırdı. Sadece beş yüzyıldan fazla hayatta kalmadı.",
   }
]

export default inner_course_data;
