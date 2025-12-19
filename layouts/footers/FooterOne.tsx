import FooterCommon from "./FooterCommon"

interface StyleType {
   style?: boolean;
   style_2?: boolean;
}

const FooterOne = ({ style, style_2 }: StyleType) => {
   return (
      <footer className={`footer__area ${style_2 ? "footer__area-five" : style ? "footer__area-two" : ""}`} style={{ background: 'transparent', backgroundColor: 'transparent' }}>
         <div className={`footer__top ${style_2 ? "footer__top-three" : ""}`} style={{ background: 'transparent', backgroundColor: 'transparent' }}>
            <div className="container">
               <div className="row">
                  <FooterCommon />

               </div>
            </div>
         </div>

         <div className={`footer__bottom ${style_2 ? "footer__bottom-four" : ""}`} style={{ background: 'transparent', backgroundColor: 'transparent' }}>
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-12">
                     <div className="copy-right-text text-center">
                        <p className="text-center">© 2025 Verinin Mutfağı. Tüm hakları saklıdır.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterOne
