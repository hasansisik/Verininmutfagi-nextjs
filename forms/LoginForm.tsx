"use client"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"

const LoginForm = () => {

   return (
      <form onSubmit={(e) => e.preventDefault()} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">E-posta</label>
            <input id="email" type="text" placeholder="E-posta" style={{ borderRadius: "50px" }} />
         </div>
         <div className="form-grp">
            <label htmlFor="password">Şifre</label>
            <input id="password" type="password" placeholder="Şifre" style={{ borderRadius: "50px" }} />
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input type="checkbox" className="form-check-input" value="" id="terms-check" />
               <label htmlFor="terms-check" className="form-check-label">Beni Hatırla</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/kayit">Şifremi Unuttum?</Link>
            </div>
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Giriş Yap<BtnArrow /></button>
      </form>
   )
}

export default LoginForm
