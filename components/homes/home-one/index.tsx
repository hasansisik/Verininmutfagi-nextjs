import BrandOne from "@/components/common/brands/BrandOne"
import Banner from "./Banner"
import CourseArea from "./CourseArea"
import Counter from "./Counter"
import FaqArea from "./FaqArea"
import Features from "./Features"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Categories from "./Categories"

const HomeOne = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <Banner />
            <Categories />
            <BrandOne />
            <CourseArea />
            <Counter />
            <FaqArea />
            <Features />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
