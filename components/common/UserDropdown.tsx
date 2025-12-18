"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAppDispatch } from "@/redux/hook"
import { logout } from "@/redux/actions/userActions"
import { toast } from "react-toastify"

interface UserDropdownProps {
    onClose: () => void
}

const UserDropdown = ({ onClose }: UserDropdownProps) => {
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            toast.success("Çıkış yapıldı")
            router.push("/")
            onClose()
        } catch (error) {
            toast.error("Çıkış yapılırken hata oluştu")
        }
    }

    const menuItemStyle: React.CSSProperties = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        textDecoration: 'none',
        transition: 'background 0.2s',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        color: '#333',
    }

    const logoutStyle: React.CSSProperties = {
        ...menuItemStyle,
        color: '#dc3545',
    }

    return (
        <div style={{
            position: 'absolute',
            top: '100%',
            right: 0,
            marginTop: '8px',
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            minWidth: '200px',
            zIndex: 1000,
            overflow: 'hidden'
        }}>
            <Link
                href="/panelim"
                onClick={onClose}
                style={menuItemStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <i className="fas fa-home" style={{ width: '16px', color: '#666' }}></i>
                <span>Panelim</span>
            </Link>

            <Link
                href="/panelim/ayarlar"
                onClick={onClose}
                style={menuItemStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <i className="fas fa-cog" style={{ width: '16px', color: '#666' }}></i>
                <span>Ayarlar</span>
            </Link>

            <button
                onClick={handleLogout}
                style={logoutStyle}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fff5f5'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <i className="fas fa-sign-out-alt" style={{ width: '16px', color: '#dc3545' }}></i>
                <span>Çıkış Yap</span>
            </button>
        </div>
    )
}

export default UserDropdown
