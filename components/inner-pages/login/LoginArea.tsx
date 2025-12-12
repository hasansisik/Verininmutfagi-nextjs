import Link from "next/link"
import LoginForm from "@/forms/LoginForm"

const LoginArea = () => {
   return (
      <section className="singUp-area section-py-120">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-xl-6 col-lg-8">
                  <div className="singUp-wrap" style={{ background: "#ffffff" }}>
                     <h2 className="title">Tekrar Hoş Geldiniz!</h2>
                     <p>Merhaba! Giriş yapmaya hazır mısınız? Aşağıya kullanıcı adınızı ve şifrenizi girin, hemen devam edelim!</p>
                     <LoginForm />
                     <div className="account__switch">
                        <p>Hesabınız yok mu?<Link href="/registration">Kayıt Ol</Link></p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default LoginArea
