"use client"
import React, { useEffect } from 'react';
import Link from 'next/link';
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import { useAppDispatch } from "@/redux/hook";
import { order_clear_cart } from "@/redux/features/cartSlice";
import { useSearchParams } from 'next/navigation';
import { verifyOrder } from "@/redux/actions/paymentActions";
import { loadUser } from "@/redux/actions/userActions";

const SuccessPage = () => {
    const dispatch = useAppDispatch();
    const searchParams = useSearchParams();
    const merchant_oid = searchParams.get('merchant_oid');

    useEffect(() => {
        // Ödeme başarılı olduğu için sepeti temizleyelim
        dispatch(order_clear_cart());

        const verifyPayment = async () => {
            if (merchant_oid) {
                try {
                    await dispatch(verifyOrder(merchant_oid)).unwrap();
                    // Kullanıcı bilgilerini yenileyerek yeni kursları yükleyelim
                    dispatch(loadUser());
                } catch (error) {
                    console.error("Ödeme doğrulama hatası:", error);
                }
            }
        };

        verifyPayment();
    }, [dispatch, merchant_oid]);

    return (
        <>
            <HeaderOne />
            <main className="main-area fix">
                <BreadcrumbOne title="Ödeme Başarılı" sub_title="Başarılı" />

                <section className="success-area section-py-120">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="success__content text-center">
                                    <div className="success__icon mb-40">
                                        <div className="icon-wrapper" style={{
                                            width: '120px',
                                            height: '120px',
                                            background: '#ECFDF5',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto'
                                        }}>
                                            <i className="fas fa-check" style={{ fontSize: '60px', color: '#10B981' }}></i>
                                        </div>
                                    </div>
                                    <h2 className="title mb-20" style={{ fontWeight: '700', color: '#1F2937' }}>Ödemeniz Başarıyla Tamamlandı!</h2>
                                    <p className="description mb-40" style={{ fontSize: '18px', color: '#6B7280', maxWidth: '600px', margin: '0 auto 40px' }}>
                                        Harika bir adım attınız! Kurslarınıza hemen başlayabilir veya kontrol panelinizden eğitimlerinizi yönetebilirsiniz.
                                    </p>
                                    <div className="success__btn-wrap d-flex align-items-center justify-content-center gap-3">
                                        <Link href="/panelim" className="btn" style={{ padding: '15px 35px' }}>Panelime Git</Link>
                                        <Link href="/" className="btn btn-two" style={{ padding: '15px 35px', background: '#F3F4F6', color: '#1F2937', border: 'none' }}>Anasayfaya Dön</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterOne />
        </>
    );
};

export default SuccessPage;
