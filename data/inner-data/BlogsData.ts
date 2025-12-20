import { StaticImageData } from "next/image";
import blog_thumb1 from "@/assets/img/blog/blog_post01.jpg"
import blog_thumb2 from "@/assets/img/blog/blog_post02.jpg"
import blog_thumb3 from "@/assets/img/blog/blog_post03.jpg"
import blog_details from "@/assets/img/blog/blog_details.jpg"

export interface BlogType {
    id: number;
    slug: string;
    thumb: StaticImageData;
    tag: string;
    date: string;
    author: string;
    readTime: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
}

const blogs_data: BlogType[] = [
    {
        id: 1,
        slug: "kendinizi-nasil-daha-iyi-tanirsiniz",
        thumb: blog_details,
        tag: "Kişisel Gelişim",
        date: "20 Temmuz, 2024",
        author: "Admin",
        readTime: "5 Dakika Okuma",
        title: "20 Dakikada Kendinizi Nasıl Daha İyi Tanırsınız",
        excerpt: "Kişisel gelişim yolculuğunda en önemli adımlardan biri kendimizi tanımaktır. Bu yazıda kendinizi daha iyi tanımanın yollarını keşfedeceksiniz.",
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
    },
    {
        id: 2,
        slug: "ui-tasarim-ipuclari",
        thumb: blog_thumb2,
        tag: "Tasarım",
        date: "18 Temmuz, 2024",
        author: "Admin",
        readTime: "7 Dakika Okuma",
        title: "UI Tasarımına Başlarken İpuçları ve Hızlandırma Teknikleri",
        excerpt: "UI tasarımına yeni başlayanlar için temel ipuçları ve iş akışınızı hızlandıracak pratik teknikler.",
        content: `
         <p>UI tasarımı, kullanıcı deneyiminin temel taşlarından biridir. Modern web ve mobil uygulamalarda başarılı bir kullanıcı arayüzü tasarlamak, hem estetik hem de fonksiyonel düşünmeyi gerektirir.</p>
         
         <p>Bu yazıda, UI tasarımına yeni başlayanlar için temel prensipleri ve deneyimli tasarımcıların kullandığı hızlandırma tekniklerini paylaşacağız.</p>
         
         <blockquote>
            <p>"İyi tasarım fark edilmez, kötü tasarım ise her zaman göze çarpar."</p>
         </blockquote>
         
         <div class="blog__details-content-inner">
            <h4 class="inner-title">Temel UI Tasarım Prensipleri</h4>
            <p>Başarılı bir UI tasarımı için dikkat etmeniz gereken temel prensipler:</p>
            <ul class="about__info-list list-wrap">
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Tutarlılık ve standartlara uyum</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Görsel hiyerarşi ve boşluk kullanımı</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Renk teorisi ve tipografi bilgisi</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Responsive tasarım yaklaşımı</p>
               </li>
            </ul>
         </div>
         
         <p>UI tasarımında pratik yapmak ve sürekli öğrenmek çok önemlidir. Farklı tasarım sistemlerini inceleyerek ve kullanıcı geri bildirimlerini dikkate alarak kendinizi geliştirebilirsiniz.</p>
      `,
        tags: ["Tasarım", "UI/UX", "Web Tasarım"]
    },
    {
        id: 3,
        slug: "genisleyen-daralan-icerik-yapimi",
        thumb: blog_thumb3,
        tag: "Web Geliştirme",
        date: "15 Temmuz, 2024",
        author: "Admin",
        readTime: "6 Dakika Okuma",
        title: "Kendi Genişleyen ve Daralan İçerik Yapınızı Oluşturun",
        excerpt: "Accordion ve collapsible içerik bileşenleri oluşturarak kullanıcı deneyimini geliştirin.",
        content: `
         <p>Genişleyen ve daralan içerik bileşenleri (accordion/collapsible), modern web sitelerinde sıkça kullanılan ve kullanıcı deneyimini önemli ölçüde iyileştiren UI elementleridir.</p>
         
         <p>Bu tür bileşenler, özellikle çok miktarda bilgiyi düzenli ve erişilebilir bir şekilde sunmak istediğinizde oldukça kullanışlıdır. FAQ sayfaları, ürün özellikleri ve içerik kategorileri için idealdir.</p>
         
         <blockquote>
            <p>"Basitlik, karmaşıklığın en üst düzeyidir. İyi bir arayüz, kullanıcının ihtiyacı olanı kolayca bulmasını sağlar."</p>
         </blockquote>
         
         <div class="blog__details-content-inner">
            <h4 class="inner-title">Accordion Bileşeni Oluştururken Dikkat Edilmesi Gerekenler</h4>
            <p>Etkili bir accordion bileşeni için bu özelliklere dikkat edin:</p>
            <ul class="about__info-list list-wrap">
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Smooth animasyonlar ve geçişler</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Erişilebilirlik standartları (ARIA)</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Mobil uyumluluk ve dokunmatik kontroller</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Performans optimizasyonu</p>
               </li>
            </ul>
         </div>
         
         <p>Modern JavaScript framework'leri ile accordion bileşenleri oluşturmak oldukça kolaydır. React, Vue veya vanilla JavaScript kullanarak kendi özelleştirilmiş çözümlerinizi geliştirebilirsiniz.</p>
      `,
        tags: ["Web Geliştirme", "JavaScript", "UI Bileşenleri"]
    },
    {
        id: 4,
        slug: "dijital-pazarlama-stratejileri",
        thumb: blog_thumb1,
        tag: "Pazarlama",
        date: "12 Temmuz, 2024",
        author: "Admin",
        readTime: "8 Dakika Okuma",
        title: "2024 Yılında Dijital Pazarlama Stratejileri",
        excerpt: "Güncel dijital pazarlama trendleri ve işinizi büyütmek için etkili stratejiler.",
        content: `
         <p>Dijital pazarlama dünyası sürekli değişiyor ve gelişiyor. 2024 yılında başarılı olmak için en güncel stratejileri ve trendleri takip etmek çok önemli.</p>
         
         <p>Bu yazıda, işletmenizi büyütmek ve hedef kitlenize daha etkili ulaşmak için kullanabileceğiniz dijital pazarlama stratejilerini inceleyeceğiz.</p>
         
         <blockquote>
            <p>"Pazarlama artık söylediğiniz şeyler hakkında değil, yarattığınız deneyimler hakkında."</p>
         </blockquote>
         
         <div class="blog__details-content-inner">
            <h4 class="inner-title">2024'ün En Önemli Dijital Pazarlama Trendleri</h4>
            <p>Bu yıl odaklanmanız gereken temel alanlar:</p>
            <ul class="about__info-list list-wrap">
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">AI destekli içerik oluşturma ve kişiselleştirme</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Video pazarlama ve kısa form içerikler</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Influencer işbirlikleri ve sosyal ticaret</p>
               </li>
               <li class="about__info-list-item">
                  <i class="flaticon-angle-right"></i>
                  <p class="content">Veri odaklı karar verme ve analitik</p>
               </li>
            </ul>
         </div>
         
         <p>Dijital pazarlama stratejilerinizi sürekli test edin, optimize edin ve hedef kitlenizin geri bildirimlerini dikkate alın. Başarı, sürekli öğrenme ve adaptasyon gerektirir.</p>
      `,
        tags: ["Pazarlama", "Dijital Pazarlama", "Strateji"]
    }
];

export default blogs_data;
