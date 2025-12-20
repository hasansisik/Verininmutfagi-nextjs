"use client"

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { getBlogBySlug } from "@/redux/actions/blogActions";
import Wrapper from "@/layouts/Wrapper";
import HeaderOne from "@/layouts/headers/HeaderOne";
import FooterOne from "@/layouts/footers/FooterOne";
import BreadcrumbOne from "@/components/common/breadcrumb/BreadcrumbOne";
import BlogDetailsArea from "@/components/blogs/blog-details/BlogDetailsArea";

const BlogDetailPage = () => {
    const params = useParams();
    const dispatch = useAppDispatch();
    const { currentBlog, loading } = useAppSelector((state) => state.blogManagement);
    const [notFoundFlag, setNotFoundFlag] = useState(false);

    useEffect(() => {
        const fetchBlog = async () => {
            if (!params.slug) {
                setNotFoundFlag(true);
                return;
            }

            try {
                console.log('🔍 Fetching blog with slug:', params.slug);
                await dispatch(getBlogBySlug(params.slug as string)).unwrap();
            } catch (error) {
                console.error('❌ Blog not found or error:', error);
                setNotFoundFlag(true);
            }
        };

        fetchBlog();
    }, [dispatch, params.slug]);

    useEffect(() => {
        console.log('📄 Blog detail state:', { currentBlog, loading });
    }, [currentBlog, loading]);

    if (loading || (!currentBlog && !notFoundFlag)) {
        return (
            <Wrapper>
                <HeaderOne />
                <main className="main-area fix">
                    <div className="container" style={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p>Yükleniyor...</p>
                    </div>
                </main>
                <FooterOne />
            </Wrapper>
        );
    }

    if (notFoundFlag || !currentBlog) {
        notFound();
    }

    return (
        <Wrapper>
            <HeaderOne />
            <main className="main-area fix">
                <BreadcrumbOne
                    title="Blog Detayları"
                    sub_title="Blog"
                    sub_title_2={currentBlog.title}
                    style={true}
                />
                <BlogDetailsArea blog={currentBlog} />
            </main>
            <FooterOne />
        </Wrapper>
    );
};

export default BlogDetailPage;
