"use client";
import { ReactNode, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "@/components/common/ScrollToTop";
import AOS from "aos";
import MotionAnimation from "@/hooks/MotionAnimation";
import { useAppDispatch } from "@/redux/hook";
import { loadUser } from "@/redux/actions/userActions";
import { initializeCart } from "@/redux/features/cartSlice";
import { initializeWishlist } from "@/redux/features/wishlistSlice";

if (typeof window !== "undefined") {
    require("bootstrap/dist/js/bootstrap");
}

type WrapperProps = {
    children: ReactNode;
};

const Wrapper = ({ children }: WrapperProps) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        AOS.init();
        // Load user on app start
        dispatch(loadUser());
        // Initialize cart and wishlist from localStorage
        dispatch(initializeCart());
        dispatch(initializeWishlist());
    }, [dispatch])

    MotionAnimation();

    return <>
        {children}
        <ScrollToTop />
        <ToastContainer position="top-center" />
    </>;
}

export default Wrapper
