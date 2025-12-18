"use client"
import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSelector } from "react-redux";
import UseCartInfo from "@/hooks/UseCartInfo";
import axios from 'axios';
import { toast } from 'react-toastify';

declare global {
    interface Window {
        iFrameResize: any;
    }
}

const PayTRPayment = () => {
    const [token, setToken] = useState<string | null>(null);
    const [isScriptLoaded, setIsScriptLoaded] = useState(false);
    const [loading, setLoading] = useState(true);

    const productItem = useSelector((state: any) => state.cart.cart);
    const { user } = useSelector((state: any) => state.user);
    const { total } = UseCartInfo();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                if (productItem.length === 0) {
                    setLoading(false);
                    return;
                }

                // PayTR için sepet formatı: [["Ürün Adı", "Birim Fiyat", Adet]]
                const user_basket = productItem.map((item: any) => [
                    item.title,
                    item.price.toFixed(2),
                    item.quantity
                ]);

                const paymentData = {
                    email: user?.email || "test@test.com", // Gerçek üyelerde user.email kullanılacak
                    payment_amount: Math.round(total * 100), // Kuruş cinsinden
                    user_basket,
                    user_name: user?.name ? `${user.name} ${user.surname}` : "Misafir Kullanıcı",
                    user_address: "İstanbul", // Opsiyonel, kullanıcıdan alınabilir
                    user_phone: "05555555555", // Opsiyonel, kullanıcıdan alınabilir
                    merchant_oid: "VM" + Math.random().toString(36).substring(2, 10).toUpperCase(), // Benzersiz sipariş ID
                    courseIds: productItem.map((item: any) => item.id)
                };

                const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3040/v1'}/payment/get-token`, paymentData);

                if (response.data.token) {
                    setToken(response.data.token);
                }
            } catch (error: any) {
                const errorMsg = error.response?.data?.msg || error.message;
                console.error("PayTR Token Hatası:", errorMsg);
                toast.error(`Ödeme formu hatası: ${errorMsg}`);
            } finally {
                setLoading(false);
            }
        };

        if (total > 0) {
            fetchToken();
        } else {
            setLoading(false);
        }
    }, [productItem, total, user]);

    useEffect(() => {
        if (isScriptLoaded && token && window.iFrameResize) {
            window.iFrameResize({}, '#paytriframe');
        }
    }, [isScriptLoaded, token]);

    return (
        <div className="col-lg-7">
            <div className="customer__form-wrap">
                <span className="title">Ödeme Bilgileri (PayTR)</span>

                {/* PayTR iFrame Resizer Script */}
                <Script
                    src="https://www.paytr.com/js/iframeResizer.min.js"
                    onLoad={() => setIsScriptLoaded(true)}
                />

                <div className="paytr-iframe-wrapper" style={{ width: '100%', minHeight: '600px', background: '#fff' }}>
                    {loading ? (
                        <div className="text-center p-5" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Yükleniyor...</span>
                            </div>
                            <p className="mt-3">Ödeme formu hazırlanıyor...</p>
                        </div>
                    ) : token ? (
                        <iframe
                            src={`https://www.paytr.com/odeme/guvenli/${token}`}
                            id="paytriframe"
                            frameBorder="0"
                            scrolling="no"
                            style={{ width: '100%' }}
                        ></iframe>
                    ) : (
                        <div className="text-center p-5" style={{ border: '1px solid #ddd', borderRadius: '8px' }}>
                            <i className="fas fa-shopping-cart mb-3" style={{ fontSize: '48px', color: '#ccc' }}></i>
                            <p>Sepetinizde ürün bulunamadığı için ödeme formu oluşturulamadı.</p>
                        </div>
                    )}
                </div>

                <div className="mt-4 p-3" style={{ background: '#f8f9fa', borderRadius: '8px', border: '1px solid #eee' }}>
                    <div className="d-flex align-items-center justify-content-between flex-wrap gap-2">
                        <div className="d-flex align-items-center gap-2">
                            <i className="fas fa-shield-alt text-success"></i>
                            <span style={{ fontSize: '13px', color: '#666' }}>256-bit SSL ile güvenli ödeme</span>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <i className="fab fa-cc-visa text-muted" style={{ fontSize: '24px' }}></i>
                            <i className="fab fa-cc-mastercard text-muted" style={{ fontSize: '24px' }}></i>
                            <i className="fab fa-cc-amex text-muted" style={{ fontSize: '24px' }}></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PayTRPayment;
