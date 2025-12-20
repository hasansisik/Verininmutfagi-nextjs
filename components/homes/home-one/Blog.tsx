"use client"
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hook"
import { getAllBlogs } from "@/redux/actions/blogActions"
import Image from "next/image"
import Link from "next/link"

interface StyleType {
   style?: boolean;
}

const Blog = ({ style }: StyleType) => {
   const dispatch = useAppDispatch();
   const { blogs, loading } = useAppSelector((state) => state.blogManagement);

   useEffect(() => {
      console.log('🏠 Home Blog: Dispatching getAllBlogs...');
      dispatch(getAllBlogs({ status: 'published', limit: 4 }));
   }, [dispatch]);

   useEffect(() => {
      console.log('🏠 Home Blog state:', { blogsCount: blogs.length, loading, blogs });
   }, [blogs, loading]);

   // Get latest 4 blogs
   const latestBlogs = blogs.slice(0, 4);

   return (
      <section className={`blog__post-area ${style ? "blog__post-area-two" : ""}`}>
         <div className="container">
            <div className="row justify-content-center">
               <div className="col-lg-6">
                  <div className="section__title text-center mb-40">
                     <span className="sub-title">Haberler & Blog</span>
                     <h2 className="title">En Son Blog Yazılarımız</h2>
                     <p>Veri bilimi ve teknoloji dünyasından en güncel içerikler</p>
                  </div>
               </div>
            </div>

            <div className="row gutter-20">
               {loading ? (
                  <div className="col-12 text-center">
                     <p>Yükleniyor...</p>
                  </div>
               ) : latestBlogs.length === 0 ? (
                  <div className="col-12 text-center">
                     <p>Henüz blog yazısı bulunmamaktadır.</p>
                  </div>
               ) : (
                  latestBlogs.map((item: any) => (
                     <div key={item._id} className="col-xl-3 col-md-6">
                        <div className="blog__post-item shine__animate-item">
                           <div className="blog__post-thumb">
                              <Link href={`/blog/${item.slug}`} className="shine__animate-link">
                                 <Image
                                    src={item.thumb}
                                    alt={item.title}
                                    width={400}
                                    height={300}
                                 />
                              </Link>
                              <Link href="/blog" className="post-tag">{item.tag}</Link>
                           </div>
                           <div className="blog__post-content">
                              <div className="blog__post-meta">
                                 <ul className="list-wrap">
                                    <li><i className="flaticon-calendar"></i>{new Date(item.publishedAt || item.createdAt).toLocaleDateString('tr-TR')}</li>
                                    <li><i className="flaticon-user-1"></i>tarafından <Link href={`/blog/${item.slug}`}>{item.author?.name || 'Admin'}</Link></li>
                                 </ul>
                              </div>
                              <h4 className="title"><Link href={`/blog/${item.slug}`}>{item.title}</Link></h4>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>
      </section>
   )
}

export default Blog
