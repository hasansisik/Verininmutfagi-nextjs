import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne"
import BlogDetailsArea from "./BlogDetailsArea"

// This component is deprecated - use /app/(logged-out)/blog/[slug]/page.tsx instead
const BlogDetails = () => {
   // Placeholder blog data to satisfy TypeScript
   const placeholderBlog = {
      _id: '',
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      thumb: '',
      tag: '',
      tags: [],
      author: { _id: '', name: '', surname: '' },
      readTime: '',
      status: 'draft' as const,
      viewCount: 0,
      createdAt: new Date(),
      updatedAt: new Date()
   };

   return (
      <>
         <HeaderOne />
         <main className="main-area fix">
            <BreadcrumbOne title="Blog Detayları" sub_title="Blog" sub_title_2="Deprecated Component" style={true} />
            <BlogDetailsArea blog={placeholderBlog} />
         </main>
         <FooterOne />
      </>
   )
}

export default BlogDetails

