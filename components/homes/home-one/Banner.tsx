'use client';
import React from 'react';
import Link from 'next/link';

const Banner: React.FC = () => {
   return (
      <>
         <style jsx>{`
            .banner-area {
               background-image: url(/assets/img/banner/banner.png);
               background-size: cover;
               background-position: center;
               padding: 120px 0;
               position: relative;
               min-height: 600px;
               display: flex;
               align-items: center;
            }

            .banner__content .title {
               font-size: 48px;
               font-weight: 800;
               line-height: 1.2;
               margin-bottom: 25px;
            }

            .banner__content p {
               font-size: 18px;
               line-height: 1.6;
               margin-bottom: 35px;
               color: #555;
            }

            @media (max-width: 768px) {
               .banner-area {
                  background-image: url(/assets/img/banner/banner-mobile.png);
                  padding: 60px 0 40px 0;
                  min-height: auto;
                  background-position: top center;
               }

               .banner__content {
                  margin-top: 320px;
               }

               .banner__content .title {
                  font-size: 28px;
                  margin-bottom: 15px;
               }

               .banner__content p {
                  font-size: 14px;
                  margin-bottom: 20px;
               }

               .banner__btn-wrap {
                  flex-direction: row !important;
                  gap: 10px !important;
               }

               .banner__btn-wrap a,
               .banner__btn-wrap .btn {
                  flex: 1;
                  justify-content: center;
                  font-size: 13px;
                  padding: 10px 15px !important;
               }
            }
         `}</style>

         <section className="banner-area banner-bg tg-motion-effects">
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-lg-6">
                     <div className="banner__content">
                        <h2 className="title">
                           Yapay Zeka Ve Yazılım Konularında Aradığın Her şey Burada!
                        </h2>
                        <p>
                           Gerçek projelerden örneklerle, derinlemesine analizlerle ve anlaşılır anlatımıyla yapay zeka ve veri biliminin mutfağına konuk olacaksınız.
                        </p>
                        <div className="banner__btn-wrap" style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                           <Link
                              href="/kurslar"
                              className="btn"
                              style={{
                                 backgroundColor: '#FFC107',
                                 color: '#000',
                                 border: 'none',
                                 fontWeight: '600',
                                 padding: '12px 30px',
                                 borderRadius: '50px'
                              }}
                           >
                              Tüm Eğitimler
                           </Link>
                           <a
                              href="https://www.youtube.com/@VerininMutfağı"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn btn-two"
                              style={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 gap: '8px',
                                 padding: '12px 30px',
                                 borderRadius: '50px'
                              }}
                           >
                              <svg
                                 width="20"
                                 height="20"
                                 viewBox="0 0 24 24"
                                 fill="currentColor"
                                 style={{ marginRight: '5px' }}
                              >
                                 <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                              </svg>
                              Verinin Mutfağı YouTube
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default Banner;
