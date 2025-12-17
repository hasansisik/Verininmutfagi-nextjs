"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { register, clearError } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import BtnArrow from "@/svg/BtnArrow"

const RegistrationForm = () => {
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { loading, error } = useAppSelector((state) => state.user)

   const [formData, setFormData] = useState({
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
   })

   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }
   }, [error, dispatch])

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
         ...formData,
         [e.target.name]: e.target.value
      })
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      const { name, surname, email, password, confirmPassword } = formData

      if (!name || !surname || !email || !password || !confirmPassword) {
         toast.error("Lütfen tüm alanları doldurun")
         return
      }

      if (password !== confirmPassword) {
         toast.error("Şifreler eşleşmiyor")
         return
      }

      if (password.length < 6) {
         toast.error("Şifre en az 6 karakter olmalıdır")
         return
      }

      try {
         await dispatch(register({ name, surname, email, password })).unwrap()
         toast.success("Kayıt başarılı! Lütfen e-postanızı doğrulayın")
         localStorage.setItem("userEmail", email)
         router.push("/dogrulama")
      } catch (err: any) {
         // Error handled in useEffect
      }
   }

   return (
      <form onSubmit={handleSubmit} className="account__form">
         <div className="row gutter-20">
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="name">Ad</label>
                  <input
                     type="text"
                     id="name"
                     name="name"
                     placeholder="Ad"
                     style={{ borderRadius: "50px" }}
                     value={formData.name}
                     onChange={handleChange}
                     disabled={loading}
                     required
                  />
               </div>
            </div>
            <div className="col-md-6">
               <div className="form-grp">
                  <label htmlFor="surname">Soyad</label>
                  <input
                     type="text"
                     id="surname"
                     name="surname"
                     placeholder="Soyad"
                     style={{ borderRadius: "50px" }}
                     value={formData.surname}
                     onChange={handleChange}
                     disabled={loading}
                     required
                  />
               </div>
            </div>
         </div>
         <div className="form-grp">
            <label htmlFor="email">E-posta</label>
            <input
               type="email"
               id="email"
               name="email"
               placeholder="E-posta"
               style={{ borderRadius: "50px" }}
               value={formData.email}
               onChange={handleChange}
               disabled={loading}
               required
            />
         </div>
         <div className="form-grp">
            <label htmlFor="password">Şifre</label>
            <input
               type="password"
               id="password"
               name="password"
               placeholder="Şifre"
               style={{ borderRadius: "50px" }}
               value={formData.password}
               onChange={handleChange}
               disabled={loading}
               required
            />
         </div>
         <div className="form-grp">
            <label htmlFor="confirmPassword">Şifre Onayı</label>
            <input
               type="password"
               id="confirmPassword"
               name="confirmPassword"
               placeholder="Şifre Onayı"
               style={{ borderRadius: "50px" }}
               value={formData.confirmPassword}
               onChange={handleChange}
               disabled={loading}
               required
            />
         </div>
         <button
            type="submit"
            className="btn btn-two arrow-btn"
            disabled={loading}
         >
            {loading ? "Kayıt yapılıyor..." : "Kayıt Ol"}
            <BtnArrow />
         </button>
      </form>
   )
}

export default RegistrationForm
