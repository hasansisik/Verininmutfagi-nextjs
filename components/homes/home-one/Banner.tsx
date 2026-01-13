'use client';
import React from 'react';
import Link from 'next/link';

const Banner: React.FC = () => {
   return (
      <section className="banner-area banner-bg tg-motion-effects" style={{
         backgroundImage: 'url(/assets/img/banner/banner.png)',
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         padding: '120px 0',
         position: 'relative',
         minHeight: '600px',
         display: 'flex',
         alignItems: 'center'
      }}>
         <div className="container">
            <div className="row align-items-center">
               <div className="col-lg-6">
                  <div className="banner__content">
                     <span className="sub-title" style={{ color: 'var(--tg-theme-primary)', fontWeight: '600', marginBottom: '20px', display: 'block' }}>
                        Yapay Zeka & Yazılım
                     </span>
                     <h2 className="title" style={{ fontSize: '48px', fontWeight: '800', lineHeight: '1.2', marginBottom: '25px' }}>
                        Yapay Zeka Ve Yazılım Konularında Aradığın Her Şey Burada!
                     </h2>
                     <p style={{ fontSize: '18px', lineHeight: '1.6', marginBottom: '35px', color: '#555' }}>
                        Gerçek projelerden deneyimlerle, derinlemesine analizlerle ve kolay anlatımlarla yapay zeka ve veri bilimi dünyasını bizimle keşfedin.
                     </p>
                     <div className="banner__btn-wrap">
                        <Link href="/kurslar" className="btn" style={{ marginRight: '20px' }}>Eğitimleri İncele</Link>
                        <Link href="/iletisim" className="btn btn-two">Bize Katılın</Link>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         {/* Animasyonlu efektler veya dekoratif elementler buraya eklenebilir */}
      </section>
   );
};

export default Banner;
