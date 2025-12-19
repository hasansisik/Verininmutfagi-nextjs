"use client";
import { useEffect, useRef } from "react";
import Plyr from 'plyr';

interface LessonVideoProps {
   videoId?: string;
   thumb?: string;
   title?: string;
}

const LessonVideo = ({ videoId, thumb, title }: LessonVideoProps) => {
   const videoRef = useRef<HTMLVideoElement | HTMLDivElement>(null);
   const playerRef = useRef<Plyr | null>(null);

   useEffect(() => {
      if (videoId && videoRef.current) {
         // Eğer eski bir player varsa yok et
         if (playerRef.current) {
            playerRef.current.destroy();
         }

         // Yeni player oluştur
         playerRef.current = new Plyr(videoRef.current, {
            autoplay: true,
            muted: false,
            ratio: '16:9',
            quality: { default: 720, options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240] },
            controls: [
               'play-large', // Orta play butonu
               'play',
               'progress',
               'current-time',
               'mute',
               'volume',
               'captions',
               'settings',
               'pip',
               'airplay',
               'fullscreen'
            ],
            resetOnEnd: true,
         });

         return () => {
            if (playerRef.current) {
               playerRef.current.destroy();
               playerRef.current = null;
            }
         };
      }
   }, [videoId]);

   if (!videoId) {
      return (
         <div className="lesson__video-placeholder" style={{ aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', color: '#fff', borderRadius: '8px' }}>
            <p>Video yükleniyor...</p>
         </div>
      );
   }

   const isUrl = videoId.startsWith('http');

   return (
      <div className="plyr__video-embed" style={{ width: '100%', position: 'relative' }}>
         {isUrl ? (
            <video
               ref={videoRef as any}
               playsInline
               controls
               data-poster={thumb || "/assets/img/courses/course_thumb01.jpg"}
               style={{ width: '100%', display: 'block' }}
            >
               <source src={videoId} type="video/mp4" />
            </video>
         ) : (
            <div
               ref={videoRef as any}
               data-plyr-provider="youtube"
               data-plyr-embed-id={videoId}
               style={{ width: '100%' }}
            ></div>
         )}
         <style jsx global>{`
            .plyr__video-embed {
               width: 100% !important;
            }
            .plyr {
               width: 100% !important;
               max-width: 100% !important;
               height: auto !important;
            }
            .plyr--video .plyr__control--overlaid {
               display: flex !important;
               opacity: 1 !important;
               visibility: visible !important;
               background: rgba(47, 87, 239, 0.9) !important;
               width: 80px !important;
               height: 80px !important;
               justify-content: center !important;
               align-items: center !important;
               border-radius: 50% !important;
               padding: 0 !important;
            }
            .plyr--playing .plyr__control--overlaid {
               display: none !important;
               opacity: 0 !important;
               visibility: hidden !important;
            }
            .plyr--video .plyr__control--overlaid svg {
               width: 30px !important;
               height: 30px !important;
               fill: #fff !important;
               display: block !important;
               margin: 0 !important;
            }
         `}</style>
      </div>
   )
}

export default LessonVideo;

