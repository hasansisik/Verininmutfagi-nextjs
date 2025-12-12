"use client"
import UseWishlistInfo from "@/hooks/UseWishlistInfo";
import { addToCart } from "@/redux/features/cartSlice";
import { removeFromWishlist } from "@/redux/features/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

const WishlistArea = () => {
   const { wishlistItems } = UseWishlistInfo();
   const dispatch = useDispatch();

   return (
      <div className="cart__area section-py-120">
         <div className="container">
            {wishlistItems.length === 0 ? (
               <div className="mb-30">
                  <div className="empty_bag text-center">
                     <p className="py-3">Wishlist'iniz Boş</p>
                     <Link href={"/courses"}>
                        <button className="btn">Kurslara Git</button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className="row justify-content-center">
                  <div className="col-lg-8">
                     <table className="table cart__table">
                        <thead>
                           <tr>
                              <th className="product__thumb">Görseller</th>
                              <th className="product__name">Kurs</th>
                              <th className="product__price">Fiyat</th>
                              <th className="product__quantity">Sepete Ekle</th>
                              <th className="product__remove">Kaldır</th>
                           </tr>
                        </thead>
                        <tbody>
                           {wishlistItems.map((item: any) => (
                              <tr key={item.id}>
                                 <td className="product__thumb">
                                    <Link href={`/course-details/${item.id}`}><Image src={item.thumb} alt="cart" /></Link>
                                 </td>
                                 <td className="product__name">
                                    <Link href={`/course-details/${item.id}`}>{item.title}</Link>
                                 </td>
                                 <td className="product__price">₺{item.price}.00</td>
                                 <td className="product__cart-btn">
                                    <button onClick={() => dispatch(addToCart(item))} className="btn">Sepete Ekle</button>
                                 </td>
                                 <td className="product__remove">
                                    <a onClick={() => dispatch(removeFromWishlist(item))} style={{ cursor: "pointer" }}>×</a>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default WishlistArea;
