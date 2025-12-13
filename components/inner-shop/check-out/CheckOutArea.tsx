"use client"
import Link from "next/link"
import CheckOutForm from "./CheckOutForm"
import { useSelector } from "react-redux";
import UseCartInfo from "@/hooks/UseCartInfo";
import { toast } from "react-toastify";

const CheckOutArea = () => {

  const notify = () => toast("Sipariş Gönderildi");
  const productItem = useSelector((state: any) => state.cart.cart);
  const { total } = UseCartInfo();

  return (
    <div className="checkout__area section-py-120">
      <div className="container">
        <div className="row">
          <CheckOutForm />

          <div className="col-lg-5">
            <div className="order__info-wrap">
              <h2 className="title">SİPARİŞİNİZ</h2>
              <ul className="list-wrap">
                <li className="title">Ürün <span>Ara Toplam</span></li>
                {/* <!-- item list --> */}
                {productItem.map((add_item: any, add_index: any) =>
                  <li key={add_index}>
                    {add_item.title} <strong>{(add_item.price || 0).toFixed(2)} x {add_item.quantity}</strong>
                    <span>₺{((add_item.price || 0) * add_item.quantity).toFixed(2)}</span>
                  </li>
                )}
                <li>Ara Toplam <span>₺{total.toFixed(2)}</span></li>
                <li>Toplam <span>₺{total.toFixed(2)}</span></li>
              </ul>
              <p>Üzgünüz, eyaletiniz için mevcut ödeme yöntemi bulunmuyor. Yardıma ihtiyacınız varsa veya alternatif düzenlemeler yapmak istiyorsanız lütfen bizimle iletişime geçin.</p>
              <p>Kişisel verileriniz siparişinizi işlemek, bu web sitesindeki deneyiminizi desteklemek ve <Link href="#">gizlilik politikamızda</Link> açıklanan diğer amaçlar için kullanılacaktır.</p>
              <button onClick={notify} className="btn">Sipariş Ver</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckOutArea
