"use client";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { useState } from "react";
import star from "@/assets/img/icons/brand_star.svg";

const brands = [
   { name: "Google", slug: "google" },
   {
      name: "Microsoft",
      url: "https://www.vectorlogo.zone/logos/microsoft/microsoft-icon.svg"
   },
   {
      name: "AWS",
      url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg"
   },
   { name: "NVIDIA", slug: "nvidia" },
   {
      name: "OpenAI",
      url: "https://upload.wikimedia.org/wikipedia/commons/4/4d/OpenAI_Logo.svg"
   },
   { name: "Python", slug: "python" },
   { name: "TensorFlow", slug: "tensorflow" },
   { name: "Kaggle", slug: "kaggle" }
];

interface StyleType {
   style?: boolean;
}

const BrandOne = ({ style }: StyleType) => {
   const [isPaused, setIsPaused] = useState(false);

   return (
      <div className={`brand-area ${style ? "brand-area-two" : ""}`} style={{ backgroundColor: '#0000ff', padding: '35px 0' }}>
         <div className="container-fluid">
            <Marquee className="marquee_mode" pauseOnHover={false} play={!isPaused} gradient={false} speed={50}>
               {brands.map((item, i) => (
                  <div
                     key={i}
                     className="brand__item"
                     onMouseEnter={() => setIsPaused(true)}
                     onMouseLeave={() => setIsPaused(false)}
                     style={{ display: 'flex', alignItems: 'center', gap: '20px', margin: '0 40px' }}
                  >
                     <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img
                           src={item.url ? item.url : `https://cdn.simpleicons.org/${item.slug}/white`}
                           alt={item.name}
                           style={{
                              height: '32px',
                              width: 'auto',
                              filter: item.url ? 'brightness(0) invert(1)' : 'none'
                           }}
                        />
                        <span style={{
                           color: '#fff',
                           fontSize: '20px',
                           fontWeight: '600',
                           whiteSpace: 'nowrap',
                           letterSpacing: '0.5px'
                        }}>
                           {item.name}
                        </span>
                     </div>
                     <Image src={star} alt="star" width={16} height={16} style={{ opacity: 0.6 }} />
                  </div>
               ))}
            </Marquee>
         </div>
      </div>
   );
}

export default BrandOne;
