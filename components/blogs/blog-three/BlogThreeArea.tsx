"use client"
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getAllBlogs } from "@/redux/actions/blogActions";
import Image from "next/image"
import Link from "next/link"
import ReactPaginate from "react-paginate";

const BlogThreeArea = () => {
  const dispatch = useAppDispatch();
  const { blogs, loading } = useAppSelector((state) => state.blogManagement);

  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    console.log('🔄 Dispatching getAllBlogs...');
    dispatch(getAllBlogs({ status: 'published' }));
  }, [dispatch]);

  useEffect(() => {
    console.log('📊 Blogs state updated:', { blogsCount: blogs.length, loading, blogs });
  }, [blogs, loading]);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = blogs.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(blogs.length / itemsPerPage);

  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % blogs.length;
    setItemOffset(newOffset);
  };

  if (loading) {
    return (
      <section className="blog-area section-py-120">
        <div className="container">
          <div className="row gutter-20">
            <div className="col-12 text-center">
              <p>Yükleniyor...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-area section-py-120">
      <div className="container">
        <div className="row gutter-20">
          {currentItems.map((item: any) => (
            <div key={item._id} className="col-xl-3 col-lg-4 col-md-6" style={{ display: 'flex' }}>
              <div className="blog__post-item shine__animate-item" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
                <div className="blog__post-thumb">
                  <Link href={`/blog/${item.slug}`} className="shine__animate-link"><Image src={item.thumb} alt={item.title} width={400} height={300} /></Link>
                  <Link href="/blog" className="post-tag">{item.tag}</Link>
                </div>
                <div className="blog__post-content" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div className="blog__post-meta">
                    <ul className="list-wrap">
                      <li><i className="flaticon-calendar"></i>{new Date(item.publishedAt || item.createdAt).toLocaleDateString('tr-TR')}</li>
                      <li><i className="flaticon-user-1"></i>tarafından <Link href={`/blog/${item.slug}`}>{item.author?.name || 'Admin'}</Link></li>
                    </ul>
                  </div>
                  <h4 className="title" style={{ flex: 1 }}><Link href={`/blog/${item.slug}`}>{item.title}</Link></h4>
                </div>
              </div>
            </div>
          ))}
          {currentItems.length === 0 && (
            <div className="col-12 text-center">
              <p>Henüz blog yazısı bulunmamaktadır.</p>
            </div>
          )}
          {pageCount > 1 && (
            <nav className="pagination__wrap mt-25">
              <ReactPaginate
                breakLabel="..."
                onPageChange={handlePageClick}
                pageRangeDisplayed={3}
                pageCount={pageCount}
                renderOnZeroPageCount={null}
                className="list-wrap"
              />
            </nav>
          )}
        </div>
      </div>
    </section>
  )
}

export default BlogThreeArea
