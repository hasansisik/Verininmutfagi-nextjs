"use client"
import Link from "next/link"
import BtnArrow from "@/svg/BtnArrow"

const ForgotPasswordArea = () => {
   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
   }

   return (
      <section className="singUp-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="singUp-wrap" style={{ background: "#ffffff" }}>
                     <h2 className="title">Şifremi Unuttum</h2>
                     <p>E-posta adresinizi girin, size şifre sıfırlama bağlantısı gönderelim.</p>
                     <form onSubmit={handleSubmit} className="account__form">
                        <div className="form-grp">
                           <label htmlFor="email">E-posta</label>
                           <input 
                              id="email" 
                              type="email" 
                              placeholder="E-posta adresinizi girin" 
                              style={{ borderRadius: "50px" }} 
                              required
                           />
                        </div>
                        <button type="submit" className="btn btn-two arrow-btn">
                           Sıfırlama Bağlantısı Gönder<BtnArrow />
                        </button>
                     </form>
                     <div className="account__switch">
                        <p>Şifrenizi hatırladınız mı? <Link href="/giris">Giriş Yap</Link></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ForgotPasswordArea


