import InjectableSvg from "@/hooks/InjectableSvg"
import BtnArrow from "@/svg/BtnArrow"
import Link from "next/link"

const ErrorArea = () => {
   return (
      <section className="error-area">
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-8">
                  <div className="error-wrap text-center">
                     <div className="error-img d-flex justify-content-center" style={{ marginBottom: '0px', paddingBottom: '0px' }}>
                        <div style={{ width: '200px', marginBottom: '0px' }}>
                           <InjectableSvg
                              src="logo.png"
                              alt="img"
                              className="injectable"
                           />
                        </div>
                     </div>
                     <div className="error-content" style={{ marginTop: '-20px' }}>
                        <h2 className="title" style={{ marginBottom: '5px', fontSize: '30px', marginTop: '0px' }}>SAYFA BULUNAMADI</h2>
                        <p style={{ marginBottom: '20px', fontSize: '16px', color: '#666', marginTop: '0px' }}>Aradığınız sayfa mevcut değil.</p>
                        <div className="tg-button-wrap">
                           <Link href="/" className="btn arrow-btn">Ana Sayfaya Dön <BtnArrow /></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default ErrorArea
