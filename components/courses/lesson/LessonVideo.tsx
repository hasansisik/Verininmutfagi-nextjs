"use client";
import { useEffect } from "react";
import Plyr from 'plyr';

interface LessonVideoProps {
   videoId?: string;
}

const LessonVideo = ({ videoId }: LessonVideoProps) => {

   useEffect(() => {
      if (videoId) {
         const player = new Plyr('#player');
         return () => {
            player.destroy();
         };
      }
   }, [videoId]);

   if (!videoId) {
      return (
         <div className="lesson__video-placeholder">
            <p>Video yükleniyor...</p>
         </div>
      );
   }

   return (
      <div className="plyr__video-embed" id="player">
         <iframe
            src={`https://www.youtube.com/embed/${videoId}?origin=https://plyr.io&amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1`}
            allowFullScreen
            allow="autoplay"
         ></iframe>
      </div>
   )
}

export default LessonVideo
