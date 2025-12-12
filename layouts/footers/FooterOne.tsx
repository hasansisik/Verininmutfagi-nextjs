import Social from "@/components/common/Social"
import FooterCommon from "./FooterCommon"
import Link from "next/link"

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
            {style_2 && <div className="footer__shape" style={{ backgroundImage: `url(/assets/img/others/h8_footer_shape.svg)` }}></div>}
         </div>

         <div className={`footer__bottom ${style_2 ? "footer__bottom-four" : ""}`} style={{ background: 'transparent', backgroundColor: 'transparent' }}>
            <div className="container">
               <div className="row align-items-center">
                  <div className="col-md-7">
                     <div className="copy-right-text">
                        <p>© 2010-2024 skillgro.com. Tüm hakları saklıdır.</p>
                     </div>
                  </div>
                  <div className="col-md-5">
                     <div className="footer__bottom-menu">
                        <ul className="list-wrap">
                           <li><Link href="/contact">Kullanım Koşulları</Link></li>
                           <li><Link href="/contact">Gizlilik Politikası</Link></li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </footer>
   )
}

export default FooterOne
