"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loadUser, editProfile } from "@/redux/actions/userActions";
import { toast } from "react-toastify";

interface StyleType {
   style?: boolean;
}

const InstructorSettingProfile = ({ style }: StyleType) => {
   const dispatch = useAppDispatch();
   const { user, loading } = useAppSelector((state) => state.user);

   const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      phoneNumber: "",
      bio: "",
      skills: [] as string[],
      picture: "",
   });

   const [coverPhoto, setCoverPhoto] = useState("");
   const [profilePhoto, setProfilePhoto] = useState("");
   const [isSubmitting, setIsSubmitting] = useState(false);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   useEffect(() => {
      if (user) {
         setFormData({
            name: user.name || "",
            surname: user.surname || "",
            email: user.email || "",
            phoneNumber: user.profile?.phoneNumber || "",
            bio: user.profile?.bio || "",
            skills: user.profile?.skills || [],
            picture: user.profile?.picture || "",
         });
         setProfilePhoto(user.profile?.picture || "https://res.cloudinary.com/da2qwsrbv/image/upload/v1757687384/sj3lcvvd7mjuuwpzann8.png");
      }
   }, [user]);

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prev => ({
         ...prev,
         [name]: value
      }));
   };

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
         await dispatch(editProfile({
            ...formData,
            password: "" // Password is required in the payload but we're not changing it
         })).unwrap();

         toast.success("Profil başarıyla güncellendi!");
         dispatch(loadUser()); // Reload user data
      } catch (error: any) {
         toast.error(error || "Profil güncellenirken bir hata oluştu");
      } finally {
         setIsSubmitting(false);
      }
   };

   if (loading && !user) {
      return (
         <div className="text-center py-5">
            <p>Yükleniyor...</p>
         </div>
      );
   }

   return (
      <>
         <div
            className="instructor__cover-bg"
            style={{ backgroundImage: `url(/assets/img/bg/${style ? 'student_bg' : 'instructor_dashboard_bg'}.jpg)` }}
         >
            <div className="instructor__cover-info">
               <div className="instructor__cover-info-left">
                  <div className="thumb">
                     <Image
                        src={profilePhoto}
                        alt={`${formData.name} ${formData.surname}`}
                        width={120}
                        height={120}
                        style={{ objectFit: 'cover', borderRadius: '50%' }}
                     />
                  </div>
               </div>
            </div>
         </div>

         <div className="instructor__profile-form-wrap">
            <form onSubmit={handleSubmit} className="instructor__profile-form">
               <div className="row">
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="name">Ad *</label>
                        <input
                           id="name"
                           name="name"
                           type="text"
                           value={formData.name}
                           onChange={handleInputChange}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="surname">Soyad *</label>
                        <input
                           id="surname"
                           name="surname"
                           type="text"
                           value={formData.surname}
                           onChange={handleInputChange}
                           required
                        />
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="email">E-posta *</label>
                        <input
                           id="email"
                           name="email"
                           type="email"
                           value={formData.email}
                           onChange={handleInputChange}
                           required
                           disabled
                           style={{ backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                        <small className="text-muted">E-posta adresi değiştirilemez</small>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className="form-grp">
                        <label htmlFor="phoneNumber">Telefon Numarası</label>
                        <input
                           id="phoneNumber"
                           name="phoneNumber"
                           type="tel"
                           value={formData.phoneNumber}
                           onChange={handleInputChange}
                           placeholder="+90 5XX XXX XX XX"
                        />
                     </div>
                  </div>
                  <div className="col-md-12">
                     <div className="form-grp">
                        <label htmlFor="picture">Profil Fotoğrafı URL</label>
                        <input
                           id="picture"
                           name="picture"
                           type="url"
                           value={formData.picture}
                           onChange={(e) => {
                              handleInputChange(e);
                              setProfilePhoto(e.target.value);
                           }}
                           placeholder="https://example.com/photo.jpg"
                        />
                        <small className="text-muted">Cloudinary veya başka bir resim hosting servisi URL'si girebilirsiniz</small>
                     </div>
                  </div>
               </div>
               <div className="form-grp">
                  <label htmlFor="bio">Biyografi</label>
                  <textarea
                     id="bio"
                     name="bio"
                     value={formData.bio}
                     onChange={handleInputChange}
                     rows={4}
                     maxLength={500}
                     placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                  />
                  <small className="text-muted">{formData.bio.length}/500 karakter</small>
               </div>
               <div className="submit-btn mt-25">
                  <button type="submit" className="btn" disabled={isSubmitting}>
                     {isSubmitting ? "Güncelleniyor..." : "Bilgileri Güncelle"}
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default InstructorSettingProfile;
