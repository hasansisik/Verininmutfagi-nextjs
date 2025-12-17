"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { verifyEmail, againEmail, clearError } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import BtnArrow from "@/svg/BtnArrow"

const VerifyEmailForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error, message } = useAppSelector((state) => state.user)

    const [email, setEmail] = useState("")
    const [verificationCode, setVerificationCode] = useState("")

    useEffect(() => {
        // Get email from localStorage
        const storedEmail = localStorage.getItem("userEmail")
        if (storedEmail) {
            setEmail(storedEmail)
        }
    }, [])

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearError())
        }

        if (message) {
            toast.success(message)
            if (message.includes("doğrulandı")) {
                setTimeout(() => {
                    router.push("/giris")
                }, 2000)
            }
        }
    }, [error, message, dispatch, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !verificationCode) {
            toast.error("Lütfen tüm alanları doldurun")
            return
        }

        try {
            await dispatch(verifyEmail({
                email,
                verificationCode: parseInt(verificationCode)
            })).unwrap()
        } catch (err: any) {
            // Error handled in useEffect
        }
    }

    const handleResendCode = async () => {
        if (!email) {
            toast.error("E-posta adresi bulunamadı")
            return
        }

        try {
            await dispatch(againEmail(email)).unwrap()
            toast.success("Doğrulama kodu tekrar gönderildi")
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
                    placeholder="E-posta"
                    style={{ borderRadius: "50px" }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <div className="form-grp">
                <label htmlFor="code">Doğrulama Kodu</label>
                <input
                    id="code"
                    type="text"
                    placeholder="4 haneli kod"
                    style={{ borderRadius: "50px" }}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={4}
                    disabled={loading}
                    required
                />
            </div>
            <div className="account__check">
                <div className="account__check-forgot">
                    <button
                        type="button"
                        onClick={handleResendCode}
                        disabled={loading}
                        style={{ background: "none", border: "none", color: "#5866EB", cursor: "pointer" }}
                    >
                        Kodu Tekrar Gönder
                    </button>
                </div>
            </div>
            <button
                type="submit"
                className="btn btn-two arrow-btn"
                disabled={loading}
            >
                {loading ? "Doğrulanıyor..." : "Doğrula"}
                <BtnArrow />
            </button>
        </form>
    )
}

export default VerifyEmailForm
