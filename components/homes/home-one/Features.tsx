import { BookOpen, GraduationCap, Clock, DollarSign } from "lucide-react";

const features = [
   {
      id: 1,
      icon: BookOpen,
      title: "Geniş Eğitim Kataloğu",
      desc: "Yüzlerce farklı kategoride eğitim seçeneği ile istediğiniz alanda kendinizi geliştirin",
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
      desc: "Eğitimlerde istediğiniz zaman, istediğiniz cihazdan kolayca erişebilirsiniz",
   },
];

const Features = () => {
   return (
      <section className="features__area" style={{ position: 'relative', zIndex: 1 }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title text-center mb-50">
                     <span className="sub-title">Platform Özellikleri</span>
                     <h2 className="title" style={{ color: '#000000', fontWeight: 'bold' }}>Veri ve Yapay Zeka ile fark yarat</h2>
                     <p style={{ color: '#000000' }}>Uygulamaya dönük içerikler ve <br /> mentorluk ile hızlı ilerleyin.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center" style={{ display: 'flex', flexWrap: 'wrap', gap: '30px 0' }}>
               {features.map((item) => {
                  const IconComponent = item.icon;
                  return (
                     <div key={item.id} className="col-xl-4 col-lg-4 col-md-6">
                        <div className="features__item text-center">
                           <div className="features__icon" style={{
                              backgroundColor: 'rgba(101, 122, 255, 0.1)',
                              borderRadius: '50%',
                              width: '100px',
                              height: '100px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              marginBottom: '20px'
                           }}>
                              <IconComponent size={35} strokeWidth={1.5} style={{ color: '#00f' }} />
                           </div>
                           <div className="features__content">
                              <h4 className="title" style={{ marginBottom: '15px' }}>{item.title}</h4>
                              <p style={{ marginBottom: 0 }}>{item.desc}</p>
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
