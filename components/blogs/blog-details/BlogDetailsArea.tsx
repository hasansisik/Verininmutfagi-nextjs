import Image from "next/image"
import Link from "next/link"
import { Blog } from "@/redux/actions/blogActions"

interface BlogDetailsAreaProps {
   blog: Blog;
}

const BlogDetailsArea = ({ blog }: BlogDetailsAreaProps) => {
   return (
      <section className="blog-details-area section-py-120">
         <div className="container">
            <div className="row">
               <div className="col-xl-12">
                  <div className="blog__details-wrapper">
                     <div className="blog__details-thumb" style={{ width: '100%', maxWidth: '100%' }}>
                        <Image
                           src={blog.thumb}
                           alt={blog.title}
                           width={1200}
                           height={600}
                           style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                        />
                     </div>
                     <div className="blog__details-content">
                        <div className="blog__post-meta">
                           <ul className="list-wrap">
                              <li><i className="flaticon-calendar"></i> {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('tr-TR')}</li>
                              <li><i className="flaticon-user-1"></i> <a href="#">{blog.author?.name || 'Admin'}</a></li>
                              <li><i className="flaticon-clock"></i> {blog.readTime}</li>
                           </ul>
                        </div>
                        <h3 className="title">{blog.title}</h3>

                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                        <div className="blog__details-bottom">
                           <div className="row align-items-center">
                              <div className="col-xl-6 col-md-7">
                                 <div className="tg-post-tag">
                                    <h5 className="tag-title">Etiketler:</h5>
                                    <ul className="list-wrap p-0 mb-0">
                                       {blog.tags?.map((tag, index) => (
                                          <li key={index}><Link href="#">{tag}</Link></li>
                                       ))}
                                    </ul>
                                 </div>
                              </div>
                              <div className="col-xl-6 col-md-5">
                                 <div className="tg-post-social justify-content-start justify-content-md-end">
                                    <h5 className="social-title">Paylaş:</h5>
                                    <ul className="list-wrap p-0 mb-0">
                                       <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
                                       <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
                                       <li><Link href="#"><i className="fab fa-linkedin-in"></i></Link></li>
                                       <li><Link href="#"><i className="fab fa-pinterest-p"></i></Link></li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   )
}

export default BlogDetailsArea
