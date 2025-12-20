import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import BlogArea from "./BlogArea"

const Blog = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Blog" sub_title="Anasayfa" />
            <BlogArea style_1={false} />
         </main>
         <FooterOne />
      </>
   )
}

export default Blog

