import BrandOne from "@/components/common/brands/BrandOne"
import Banner from "./Banner"
import CourseArea from "./CourseArea"
import Counter from "./Counter"
import FaqArea from "./FaqArea"
import Features from "./Features"
import FooterOne from "@/layouts/footers/FooterOne"
import HeaderOne from "@/layouts/headers/HeaderOne"
import Categories from "./Categories"
import BlogArea from "./Blog"

const HomeOne = () => {
   return (
      <>
         <HeaderOne />
         <main className="main-area ">
            <Banner />
            <Categories />
            <BrandOne />
            <CourseArea />
            <Counter />
            <Features />
            <BlogArea style={true} />
         </main>
         <FooterOne />
      </>
   )
}

export default HomeOne
