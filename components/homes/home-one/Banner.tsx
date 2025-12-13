'use client';
import React from 'react';
import Image from 'next/image';

const Banner: React.FC = () => {
   return (
      <section className="banner-area" style={{ width: '100%', display: 'block' }}>
         <Image 
            src="/assets/img/banner/banner.png" 
            alt="Banner" 
            width={1920}
            height={1080}
            style={{ width: '100%', height: 'auto', display: 'block' }}
            priority
         />
      </section>
   );
};

export default Banner;
