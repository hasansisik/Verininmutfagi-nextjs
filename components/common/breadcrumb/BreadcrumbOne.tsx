import Image from "next/image"
import Link from "next/link";

interface StyleType {
   title: string;
   sub_title: string;
   sub_title_2?: string;
   style?: boolean;
}

const BreadcrumbOne = ({ title, sub_title, sub_title_2, style }: StyleType) => {
   return (
      <section className="breadcrumb__area breadcrumb__bg border-bottom border-top">
         <div className="container">
            <div className="row">
               <div className="col-12">
                  <div className="breadcrumb__content">
                     <h3 className="title">{title}</h3>
                     <nav className="breadcrumb">
                        {
                           style ? (
                              <>
                                 <span property="itemListElement" typeof="ListItem">
                                    <Link href="/">Anasayfa</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement" typeof="ListItem">
                                    <Link href="/events">{sub_title}</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement" typeof="ListItem">{sub_title_2}</span>
                              </>
                           ) : (
                              <>
                                 <span property="itemListElement" typeof="ListItem">
                                    <Link href="/">Anasayfa</Link>
                                 </span>
                                 <span className="breadcrumb-separator"><i className="fas fa-angle-right"></i></span>
                                 <span property="itemListElement" typeof="ListItem">{sub_title}</span>
                              </>
                           )
                        }
                     </nav>
                  </div>
               </div>
            </div>
         </div>
      
      </section>
   )
}

export default BreadcrumbOne
