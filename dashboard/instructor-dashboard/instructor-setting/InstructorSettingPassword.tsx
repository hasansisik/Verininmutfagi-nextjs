"use client";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { editProfile, verifyPassword } from "@/redux/actions/userActions";
import { toast } from "react-toastify";

const InstructorSettingPassword = () => {
   const dispatch = useAppDispatch();
   const [currentPassword, setCurrentPassword] = useState("");
   const [newPassword, setNewPassword] = useState("");
   const [rePassword, setRePassword] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!currentPassword || !newPassword || !rePassword) {
         toast.error("Lütfen tüm alanları doldurun");
         return;
      }

      if (newPassword !== rePassword) {
         toast.error("Yeni şifreler eşleşmiyor");
         return;
      }

      if (newPassword.length < 6) {
         toast.error("Şifre en az 6 karakter olmalıdır");
         return;
      }

      setIsSubmitting(true);

      try {
         // Verify current password first
         await dispatch(verifyPassword(currentPassword)).unwrap();

         // If verification successful, update password
         await dispatch(editProfile({ password: newPassword })).unwrap();

         toast.success("Şifreniz başarıyla güncellendi");

         // Clear form
         setCurrentPassword("");
         setNewPassword("");
         setRePassword("");
      } catch (error: any) {
         toast.error(error || "Şifre güncellenirken bir hata oluştu");
         console.error(error);
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <div className="instructor__profile-form-wrap">
         <form onSubmit={handleSubmit} className="instructor__profile-form">
            <div className="form-grp">
               <label htmlFor="currentpassword">Mevcut Şifre</label>
               <input
                  id="currentpassword"
                  type="password"
                  placeholder="Mevcut Şifre"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
               />
            </div>
            <div className="form-grp">
               <label htmlFor="newpassword">Yeni Şifre</label>
               <input
                  id="newpassword"
                  type="password"
                  placeholder="Yeni Şifre"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
               />
            </div>
            <div className="form-grp">
               <label htmlFor="repassword">Yeni Şifreyi Tekrar Girin</label>
               <input
                  id="repassword"
                  type="password"
                  placeholder="Yeni Şifreyi Tekrar Girin"
                  value={rePassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
               />
            </div>
            <div className="submit-btn mt-25">
               <button type="submit" className="btn" disabled={isSubmitting}>
                  {isSubmitting ? "Güncelleniyor..." : "Şifreyi Güncelle"}
               </button>
            </div>
         </form>
      </div>
   )
}

export default InstructorSettingPassword
