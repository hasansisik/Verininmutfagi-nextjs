"use client"
import UseSticky from "@/hooks/UseSticky";
import { useState, useEffect } from "react";

const ScrollToTop = () => {
   const { sticky }: { sticky: boolean } = UseSticky();

   const [showScroll, setShowScroll] = useState(false);

   const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 400) {
         setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
         setShowScroll(false);
      }
   };

   const scrollTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
   };

   useEffect(() => {
      const handleScroll = () => {
         if (window.pageYOffset > 400) {
            setShowScroll(true);
         } else {
            setShowScroll(false);
         }
      };

      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
   }, []);

   return (
      <>
         <button onClick={scrollTop} className={`scroll__top scroll-to-target ${sticky ? "open" : ""}`} data-target="html">
            <i className="tg-flaticon-arrowhead-up"></i>
         </button>
      </>
   )
}

export default ScrollToTop;
