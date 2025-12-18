"use client"
import UseCartInfo from "@/hooks/UseCartInfo";
import { addToCart, clear_cart, decrease_quantity, remove_cart_product } from "@/redux/features/cartSlice";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

const CartArea = () => {

   const productItem = useSelector((state: any) => state.cart.cart);
   const dispatch = useDispatch();
   const { total } = UseCartInfo();

   const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
   };

   return (
      <div className="cart__area section-py-120">
         <div className="container">
            {productItem.length === 0 ? (
               <div className="mb-30">
                  <div className="empty_bag text-center">
                     <p className="py-3">Sepetiniz Boş</p>
                     <Link href={"/"}>
                        <button className="btn">Anasayfaya Dön</button>
                     </Link>
                  </div>
               </div>
            ) : (
               <div className="row">
                  <div className="col-lg-8">
                     <table className="table cart__table">
                        <thead>
                           <tr>
                              <th className="product__thumb">&nbsp;</th>
                              <th className="product__name">Ürün</th>
                              <th className="product__price">Fiyat</th>
                              <th className="product__quantity">Miktar</th>
                              <th className="product__subtotal">Ara Toplam</th>
                              <th className="product__remove">&nbsp;</th>
                           </tr>
                        </thead>
                        <tbody>
                           {productItem.map((item: any, i: any) => (
                              <tr key={i}>
                                 <td className="product__thumb">
                                    <Link href={`/shop-details/${item.id}`}>
                                       {item.thumb ? (
                                          <Image
                                             src={item.thumb}
                                             alt="cart"
                                             width={100}
                                             height={100}
                                             style={{ objectFit: 'cover' }}
                                          />
                                       ) : (
                                          <div
                                             style={{
                                                width: 100,
                                                height: 100,
                                                backgroundColor: '#f0f0f0',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                color: '#999'
                                             }}
                                          >
                                             Resim Yok
                                          </div>
                                       )}
                                    </Link>
                                 </td>
                                 <td className="product__name">
                                    <Link href={`/shop-details/${item.id}`}>{item.title}</Link>
                                 </td>
                                 <td className="product__price">₺{item.price}.00</td>
                                 <td className="product__quantity">
                                    <div className="cart-plus-minus">
                                       <input type="text" onChange={handleSubmit} value={item.quantity} readOnly />
                                       <div onClick={() => dispatch(decrease_quantity(item))} className="dec qtybutton">-</div>
                                       <div onClick={() => dispatch(addToCart(item))} className="inc qtybutton">+</div>
                                    </div>
                                 </td>
                                 <td className="product__subtotal">₺{item.price * item.quantity}.00</td>
                                 <td className="product__remove">
                                    <a style={{ cursor: "pointer" }} onClick={() => dispatch(remove_cart_product(item))}>×</a>
                                 </td>
                              </tr>
                           ))}
                           <tr>
                              <td colSpan={6} className="cart__actions">
                                 <div className="update__cart-btn text-end f-right">
                                    <button onClick={() => dispatch(clear_cart())} type="submit" className="btn">Sepeti Temizle</button>
                                 </div>
                              </td>
                           </tr>
                        </tbody>

                     </table>
                  </div>

                  <div className="col-lg-4">
                     <div className="cart__collaterals-wrap">
                        <h2 className="title">Sepet Toplamı</h2>
                        <ul className="list-wrap">
                           <li>Ara Toplam <span>₺{total.toFixed(2)}</span></li>
                           <li>Toplam <span className="amount">₺{total.toFixed(2)}</span></li>
                        </ul>
                        <Link href="/odeme" className="btn">Ödemeye Geç</Link>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

export default CartArea
