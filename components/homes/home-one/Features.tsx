import feature_data from "@/data/home-data/FeatureData";
import Image from "next/image";

const Features = () => {
   return (
      <section className="features__area" style={{ background: 'transparent', backgroundColor: 'transparent' }}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6">
                  <div className="section__title white-title text-center mb-50">
                     <span className="sub-title" >Yolculuğumuza Nasıl Başladık</span>
                     <h2 className="title" style={{ color: '#000000' }}>Öğrenme Yolculuğunuza Bugün Başlayın!</h2>
                     <p style={{ color: '#000000' }}>Size uygun kursları keşfedin ve kariyerinizde yeni bir sayfa açın. <br /> Uzman eğitmenlerimizle birlikte başarıya ulaşın.</p>
                  </div>
               </div>
            </div>
            <div className="row justify-content-center">
               {feature_data.filter((items) => items.page === "home_1").map((item) => (
                  <div key={item.id} className="col-xl-3 col-lg-4 col-md-6">
                     <div className="features__item">
                        <div className="features__icon">
                           <Image src={item.icon ? item.icon : ""} className="injectable" alt="img" />
                        </div>
                        <div className="features__content">
                           <h4 className="title">{item.title}</h4>
                           <p>{item.desc}</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Features;
