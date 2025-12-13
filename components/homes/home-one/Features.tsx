import { BookOpen, GraduationCap, Clock, DollarSign } from "lucide-react";

const features = [
   {
      id: 1,
      icon: BookOpen,
      title: "Geniş Kurs Kataloğu",
      desc: "Binlerce farklı kategoride kurs seçeneği ile istediğiniz alanda kendinizi geliştirin",
   },
   {
      id: 2,
      icon: GraduationCap,
      title: "Uzman Eğitmenler",
      desc: "Alanında deneyimli ve sertifikalı eğitmenlerden kaliteli eğitim alın",
   },
   {
      id: 3,
      icon: Clock,
      title: "7/24 Erişim",
      desc: "Kurslarınıza istediğiniz zaman, istediğiniz cihazdan kolayca erişebilirsiniz",
   },
   {
      id: 4,
      icon: DollarSign,
      title: "Uygun Fiyatlar",
      desc: "Kaliteli eğitimi herkes için erişilebilir fiyatlarla sunuyoruz",
   },
];

const Features = () => {
   return (
      <section className="features__area" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title white-title text-center mb-50">
                     <span className="sub-title" >Platform Özellikleri</span>
                     <h2 className="title" style={{ color: '#000000' }}>Modern Online Eğitim Platformu</h2>
                     <p style={{ color: '#000000' }}>En son teknoloji ile donatılmış platformumuzda, <br /> öğrenme deneyiminizi en üst seviyeye çıkarın.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {features.map((item) => {
                  const IconComponent = item.icon;
                  return (
                     <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                        <div className="features__item">
                           <div className="features__icon" style={{ 
                              backgroundColor: 'rgba(101, 122, 255, 0.1)', 
                              borderRadius: '46px',
                              padding: '30px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                           }}>
                              <IconComponent size={35} strokeWidth={1.5} style={{ color: '#00f' }} />
                           </div>
                           <div className="features__content">
                              <h4 className="title">{item.title}</h4>
                              <p>{item.desc}</p>
                           </div>
                        </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </section>
   )
}

export default Features;
