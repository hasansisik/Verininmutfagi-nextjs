"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { forgotPassword, clearError } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import BtnArrow from "@/svg/BtnArrow"

const ForgotPasswordForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error, message } = useAppSelector((state) => state.user)

    const [email, setEmail] = useState("")

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }

        if (message) {
            toast.success(message)
            if (message.includes("sıfırlama")) {
                localStorage.setItem("resetEmail", email)
                setTimeout(() => {
                    router.push("/sifre-sifirla")
                }, 2000)
            }
        }
    }, [error, message, dispatch, router, email])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email) {
            toast.error("Lütfen e-posta adresinizi girin")
            return
        }

        try {
            await dispatch(forgotPassword(email)).unwrap()
        } catch (err: any) {
            // Error handled in useEffect
        }
    }

    return (
        <form onSubmit={handleSubmit} className="account__form">
            <div className="form-grp">
                <label htmlFor="email">E-posta</label>
                <input
                    id="email"
                    type="email"
                    placeholder="E-posta adresinizi girin"
                    style={{ borderRadius: "50px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <p className="text-muted mb-3">
                E-posta adresinize şifre sıfırlama kodu gönderilecektir.
            </p>
            <button
                type="submit"
                className="btn btn-two arrow-btn"
                disabled={loading}
            >
                {loading ? "Gönderiliyor..." : "Kod Gönder"}
                <BtnArrow />
            </button>
        </form>
    )
}

export default ForgotPasswordForm
