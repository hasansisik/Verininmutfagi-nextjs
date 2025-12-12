import RegistrationForm from "@/forms/RegistrationForm"
import Link from "next/link"

const RegistrationArea = () => {
   return (
      <section className="singUp-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="singUp-wrap" style={{ background: "#ffffff" }}>
                     <h2 className="title">Hesabınızı Oluşturun</h2>
                     <p>Merhaba! Bize katılmaya hazır mısınız? Başlamak için sizden birkaç bilgi almamız gerekiyor. </p>
                     <RegistrationForm />
                     <div className="account__switch">
                        <p>Zaten hesabınız var mı?<Link href="/giris">Giriş Yap</Link></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default RegistrationArea
