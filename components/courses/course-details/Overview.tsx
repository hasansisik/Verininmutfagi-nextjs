
const Overview = () => {
   return (
      <div className="courses__overview-wrap">
         <h3 className="title">Kurs Açıklaması</h3>
         <p>Bu kurs, modern web geliştirme tekniklerini öğrenmek isteyenler için kapsamlı bir eğitim programı sunmaktadır. Temel kavramlardan başlayarak ileri seviye konulara kadar geniş bir yelpazede bilgi ve beceri kazandırmayı hedeflemektedir. Pratik örnekler ve gerçek dünya projeleri ile öğrenme deneyimini zenginleştirmektedir.</p>
         <h3 className="title">Bu kursta neler öğreneceksiniz?</h3>
         <p>Kurs boyunca temel ve ileri seviye konuları kapsayan detaylı bir müfredat ile karşılaşacaksınız. Her konu, pratik örnekler ve uygulamalı projeler ile desteklenmektedir.</p>
         <ul className="about__info-list list-wrap">
            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">Renk, Gradyan ve Grid sistemleri ile çalışma</p>
            </li>
            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">Tüm faydalı kısayollar ve ipuçları</p>
            </li>
            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">Afiş, Broşür ve Reklam tasarımları oluşturma</p>
            </li>
            <li className="about__info-list-item">
               <i className="flaticon-angle-right"></i>
               <p className="content">Görseller ve Metinler ile çalışma teknikleri</p>
            </li>
         </ul>
         <p className="last-info">Kurs içeriği, başlangıç seviyesinden ileri seviyeye kadar tüm öğrencilere uygun olacak şekilde tasarlanmıştır. Her bölüm, önceki konuları pekiştirerek ilerlemekte ve öğrenme sürecini kolaylaştırmaktadır. Pratik uygulamalar ve gerçek proje örnekleri ile bilgilerinizi pekiştirebilirsiniz.</p>
      </div>
   )
}

export default Overview
