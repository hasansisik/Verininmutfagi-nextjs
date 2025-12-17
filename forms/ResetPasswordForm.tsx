"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { resetPassword, clearError } from "@/redux/actions/userActions"
import { toast } from "react-toastify"
import BtnArrow from "@/svg/BtnArrow"

const ResetPasswordForm = () => {
    const router = useRouter()
    const dispatch = useAppDispatch()
    const { loading, error, message } = useAppSelector((state) => state.user)

    const [email, setEmail] = useState("")
    const [passwordToken, setPasswordToken] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    useEffect(() => {
        // Get email from localStorage
        const storedEmail = localStorage.getItem("resetEmail")
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
            if (message.includes("sıfırlandı")) {
                localStorage.removeItem("resetEmail")
                setTimeout(() => {
                    router.push("/giris")
                }, 2000)
            }
        }
    }, [error, message, dispatch, router])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!email || !passwordToken || !newPassword || !confirmPassword) {
            toast.error("Lütfen tüm alanları doldurun")
            return
        }

        if (newPassword !== confirmPassword) {
            toast.error("Şifreler eşleşmiyor")
            return
        }

        if (newPassword.length < 6) {
            toast.error("Şifre en az 6 karakter olmalıdır")
            return
        }

        try {
            await dispatch(resetPassword({
                email,
                passwordToken: parseInt(passwordToken),
                newPassword
            })).unwrap()
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
                <label htmlFor="code">Sıfırlama Kodu</label>
                <input
                    id="code"
                    type="text"
                    placeholder="4 haneli kod"
                    style={{ borderRadius: "50px" }}
                    value={passwordToken}
                    onChange={(e) => setPasswordToken(e.target.value)}
                    maxLength={4}
                    disabled={loading}
                    required
                />
            </div>
            <div className="form-grp">
                <label htmlFor="newPassword">Yeni Şifre</label>
                <input
                    id="newPassword"
                    type="password"
                    placeholder="Yeni şifre"
                    style={{ borderRadius: "50px" }}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <div className="form-grp">
                <label htmlFor="confirmPassword">Şifre Onayı</label>
                <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Şifre onayı"
                    style={{ borderRadius: "50px" }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                    required
                />
            </div>
            <button
                type="submit"
                className="btn btn-two arrow-btn"
                disabled={loading}
            >
                {loading ? "Sıfırlanıyor..." : "Şifreyi Sıfırla"}
                <BtnArrow />
            </button>
        </form>
    )
}

export default ResetPasswordForm
