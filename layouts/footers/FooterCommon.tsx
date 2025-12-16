import Link from "next/link"
import Image from "next/image"

import logo from "@/public/icon.png"

const FooterCommon = () => {
   return (
      <>
         <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="footer__widget">
               <div className="logo mb-35">
                  <Link href="/"><Image src={logo} alt="Verinin Mutfağı" width={60} height={60} /></Link>
               </div>
               <div className="footer__content">
                  <p>Online eğitim platformumuz ile kendinizi geliştirin ve yeni beceriler kazanın. Uzman eğitmenlerimizle kaliteli içerikler sunuyoruz.</p>

               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Kurumsal</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/contact">İletişim</Link></li>
                     <li><Link href="/kurslar">Kurslar</Link></li>
                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Kategoriler</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/kurslar">Geliştirme</Link></li>
                     <li><Link href="/kurslar">Tasarım</Link></li>
                     <li><Link href="/kurslar">İşletme</Link></li>

                  </ul>
               </div>
            </div>
         </div>
         <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6">
            <div className="footer__widget">
               <h4 className="footer__widget-title">Politikalar</h4>
               <div className="footer__link">
                  <ul className="list-wrap">
                     <li><Link href="/gizlilik-politikasi">Gizlilik Politikası</Link></li>
                     <li><Link href="/kullanici-sozlesmesi">Kullanıcı Sözleşmesi</Link></li>
                     <li><Link href="/cerez-politikasi">Çerez Politikası</Link></li>
                  </ul>
               </div>
            </div>
         </div>

      </>
   )
}

export default FooterCommon
