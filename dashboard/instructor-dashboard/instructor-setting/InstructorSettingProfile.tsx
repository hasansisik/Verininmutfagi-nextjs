"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { loadUser, editProfile, verifyEmailChange } from "@/redux/actions/userActions";
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
   const [showVerificationModal, setShowVerificationModal] = useState(false);
   const [verificationCode, setVerificationCode] = useState("");
   const [isInitialized, setIsInitialized] = useState(false);

   useEffect(() => {
      dispatch(loadUser());
   }, [dispatch]);

   useEffect(() => {
      // Only set form data if not initialized AND user has loaded with valid data (email check)
      if (user && user.email && !isInitialized) {
         setFormData({
            name: user.name || "",
            surname: user.surname || "",
            email: user.email || "",
            phoneNumber: user.profile?.phoneNumber || "",
            bio: user.profile?.bio || "",
            skills: user.profile?.skills || [],
            picture: user.profile?.picture || "",
         });
         setProfilePhoto(user.profile?.picture || "");
         setIsInitialized(true);
      }
   }, [user, isInitialized]);

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
         const result = await dispatch(editProfile({
            ...formData,
            password: "" // Password is required in the payload but we're not changing it
         })).unwrap();

         if (result.requiresVerification) {
            setShowVerificationModal(true);
            toast.info(result.message);
         } else {
            toast.success(result.message || "Profil başarıyla güncellendi!");

            // Force re-fetch user, and allow re-syncing form data
            await dispatch(loadUser()).unwrap();
            setIsInitialized(false);
         }
      } catch (error: any) {
         toast.error(error || "Profil güncellenirken bir hata oluştu");
      } finally {
         setIsSubmitting(false);
      }
   };

   const handleVerificationSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);
      try {
         await dispatch(verifyEmailChange({ verificationCode: Number(verificationCode) })).unwrap();
         toast.success("E-posta adresi başarıyla güncellendi!");
         setShowVerificationModal(false);
         setVerificationCode("");
         // Force re-fetch user, and allow re-syncing form data
         await dispatch(loadUser()).unwrap();
         setIsInitialized(false);
      } catch (error: any) {
         toast.error(error || "Doğrulama hatası");
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
                        />
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

         {/* Simple Modal for Verification */}
         {showVerificationModal && (
            <div style={{
               position: 'fixed',
               top: 0,
               left: 0,
               right: 0,
               bottom: 0,
               backgroundColor: 'rgba(0,0,0,0.5)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               zIndex: 9999
            }}>
               <div style={{
                  backgroundColor: 'white',
                  padding: '30px',
                  borderRadius: '10px',
                  width: '90%',
                  maxWidth: '400px',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
               }}>
                  <h4 className="mb-4 text-xl font-bold">E-posta Doğrulama</h4>
                  <p className="mb-4 text-gray-600">Lütfen yeni e-posta adresinize gönderilen doğrulama kodunu girin.</p>
                  <form onSubmit={handleVerificationSubmit}>
                     <div className="form-grp mb-4">
                        <label className="block mb-2 text-sm font-medium">Doğrulama Kodu</label>
                        <input
                           type="text"
                           value={verificationCode}
                           onChange={(e) => setVerificationCode(e.target.value)}
                           className="w-full p-2 border rounded"
                           placeholder="Kod Giriniz"
                           required
                        />
                     </div>
                     <div className="flex justify-end gap-2" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                        <button
                           type="button"
                           onClick={() => setShowVerificationModal(false)}
                           className="btn btn-secondary"
                           style={{ backgroundColor: '#6c757d', color: 'white', padding: '10px 20px', borderRadius: '5px' }}
                        >
                           İptal
                        </button>
                        <button
                           type="submit"
                           className="btn btn-primary"
                           disabled={isSubmitting}
                           style={{ padding: '10px 20px', borderRadius: '5px' }}
                        >
                           {isSubmitting ? "Doğrulanıyor..." : "Doğrula"}
                        </button>
                     </div>
                  </form>
               </div>
            </div>
         )}
      </>
   );
};

export default InstructorSettingProfile;
