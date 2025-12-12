"use client"
import BtnArrow from "@/svg/BtnArrow"

const RegistrationForm = () => {

   return (
      <form onSubmit={(e) => e.preventDefault()} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="fast-name">Ad</label>
                  <input type="text" id="fast-name" placeholder="Ad" style={{ borderRadius: "50px" }} />
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="last-name">Soyad</label>
                  <input type="text" id="last-name" placeholder="Soyad" style={{ borderRadius: "50px" }} />
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">E-posta</label>
            <input type="email" id="email" placeholder="E-posta" style={{ borderRadius: "50px" }} />
         </div>
         <div className="form-grp">
            <label htmlFor="password">Şifre</label>
            <input type="password" id="password" placeholder="Şifre" style={{ borderRadius: "50px" }} />
         </div>
         <div className="form-grp">
            <label htmlFor="confirm-password">Şifre Onayı</label>
            <input type="password" id="confirm-password" placeholder="Şifre Onayı" style={{ borderRadius: "50px" }} />
         </div>
         <button type="submit" className="btn btn-two arrow-btn">Kayıt Ol<BtnArrow /></button>
      </form>
   )
}

export default RegistrationForm
