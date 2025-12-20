import { StaticImageData } from "next/image";
import blog_details from "@/assets/img/blog/blog_details.jpg"

interface BlogDetailsType {
    id: number;
    thumb: StaticImageData;
    date: string;
    author: string;
    readTime: string;
    title: string;
    content: string;
    tags: string[];
}

const blog_details_data: BlogDetailsType = {
    id: 1,
    thumb: blog_details,
    date: "20 Temmuz, 2024",
    author: "Admin",
    readTime: "5 Dakika Okuma",
    title: "20 Dakikada Kendinizi Nasıl Daha İyi Tanırsınız",
    content: `
      <p>Kişisel gelişim yolculuğunda en önemli adımlardan biri kendimizi tanımaktır. Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae in tristique libero, quis ultrices diamraesent varius diam dui.</p>
      
      <p>Günümüzün hızlı tempolu dünyasında, kendimize zaman ayırmak ve iç dünyamızı keşfetmek her zamankinden daha önemli hale geldi. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
      
      <blockquote>
         <p>"Kendini tanımak, tüm bilgeliklerin başlangıcıdır. Kendi düşüncelerinizi ve duygularınızı anlamak, başarılı bir yaşamın temelidir."</p>
      </blockquote>
      
      <p>Bu süreçte sabırlı olmak ve kendinize karşı dürüst olmak çok önemlidir. Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonrra dolo areay Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae.</p>
      
      <div class="blog__details-content-inner">
         <h4 class="inner-title">Bu İçerikten Neler Öğreneceksiniz?</h4>
         <p>Kendinizi tanıma yolculuğunda size rehberlik edecek pratik yöntemler ve teknikler öğreneceksiniz. Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum.</p>
         <ul class="about__info-list list-wrap">
            <li class="about__info-list-item">
               <i class="flaticon-angle-right"></i>
               <p class="content">Duygularınızı ve düşüncelerinizi analiz etme</p>
            </li>
            <li class="about__info-list-item">
               <i class="flaticon-angle-right"></i>
               <p class="content">Kendi güçlü ve zayıf yönlerinizi keşfetme</p>
            </li>
            <li class="about__info-list-item">
               <i class="flaticon-angle-right"></i>
               <p class="content">Etkili öz-farkındalık teknikleri uygulama</p>
            </li>
            <li class="about__info-list-item">
               <i class="flaticon-angle-right"></i>
               <p class="content">Kişisel hedeflerinizi belirleme ve planlama</p>
            </li>
         </ul>
      </div>
      
      <p>Sonuç olarak, kendinizi tanımak bir yolculuktur ve bu yolculuk hayat boyu sürer. Her gün kendinize dair yeni şeyler keşfedebilir ve gelişebilirsiniz. Maximus ligula eleifend id nisl quis interdum. Sed malesuada tortor non turpis semper bibendum. Ut ac nisi porta, malesuada risus nonVestibulum ante ipsum primis.</p>
   `,
    tags: ["Kişisel Gelişim", "Öz-Farkındalık"]
};

export default blog_details_data;
