"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { login, clearError } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"

const LoginForm = () => {
   const router = useRouter()
   const dispatch = useAppDispatch()
   const { loading, error, isAuthenticated } = useAppSelector((state) => state.user)

   const [email, setEmail] = useState("")
   const [password, setPassword] = useState("")
   const [rememberMe, setRememberMe] = useState(false)

   useEffect(() => {
      if (error) {
         toast.error(error)
         dispatch(clearError())
      }

      if (isAuthenticated) {
         toast.success("Giriş başarılı!")
         router.push("/")
      }
   }, [error, isAuthenticated, dispatch, router])

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault()

      if (!email || !password) {
         toast.error("Lütfen tüm alanları doldurun")
         return
      }

      try {
         const result = await dispatch(login({ email, password })).unwrap()
         // Success handled in useEffect
      } catch (err: any) {
         // Check if verification is required
         if (err?.requiresVerification) {
            localStorage.setItem("userEmail", err.email || email)
            toast.info("Lütfen e-postanızı doğrulayın")
            router.push("/dogrulama")
         }
         // Other errors handled in useEffect
      }
   }

   return (
      <form onSubmit={handleSubmit} className="account__form">
         <div className="form-grp">
            <label htmlFor="email">E-posta</label>
            <input
               id="email"
               type="email"
               placeholder="E-posta"
               style={{ borderRadius: "50px" }}
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               disabled={loading}
               required
            />
         </div>
         <div className="form-grp">
            <label htmlFor="password">Şifre</label>
            <input
               id="password"
               type="password"
               placeholder="Şifre"
               style={{ borderRadius: "50px" }}
               value={password}
               onChange={(e) => setPassword(e.target.value)}
               disabled={loading}
               required
            />
         </div>
         <div className="account__check">
            <div className="account__check-remember">
               <input
                  type="checkbox"
                  className="form-check-input"
                  id="terms-check"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
               />
               <label htmlFor="terms-check" className="form-check-label">Beni Hatırla</label>
            </div>
            <div className="account__check-forgot">
               <Link href="/sifremi-unuttum">Şifremi Unuttum?</Link>
            </div>
         </div>
         <button
            type="submit"
            className="btn btn-two arrow-btn"
            disabled={loading}
         >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
            <BtnArrow />
         </button>
      </form>
   )
}

export default LoginForm
