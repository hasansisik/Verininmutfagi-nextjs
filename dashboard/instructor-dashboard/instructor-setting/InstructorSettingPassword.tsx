
const InstructorSettingPassword = () => {
   return (
      <div className="instructor__profile-form-wrap">
         <form onSubmit={(e) => e.preventDefault()} className="instructor__profile-form">
            <div className="form-grp">
               <label htmlFor="currentpassword">Mevcut Şifre</label>
               <input id="currentpassword" type="password" placeholder="Mevcut Şifre" />
            </div>
            <div className="form-grp">
               <label htmlFor="newpassword">Yeni Şifre</label>
               <input id="newpassword" type="password" placeholder="Yeni Şifre" />
            </div>
            <div className="form-grp">
               <label htmlFor="repassword">Yeni Şifreyi Tekrar Girin</label>
               <input id="repassword" type="password" placeholder="Yeni Şifreyi Tekrar Girin" />
            </div>
            <div className="submit-btn mt-25">
               <button type="submit" className="btn">Şifreyi Güncelle</button>
            </div>
         </form>
      </div>
   )
}

export default InstructorSettingPassword
