const CheckOutForm = () => {
   const turkiyeSehirleri = [
      "Adana", "Adıyaman", "Afyonkarahisar", "Ağrı", "Amasya", "Ankara", "Antalya", "Artvin",
      "Aydın", "Balıkesir", "Bilecik", "Bingöl", "Bitlis", "Bolu", "Burdur", "Bursa",
      "Çanakkale", "Çankırı", "Çorum", "Denizli", "Diyarbakır", "Edirne", "Elazığ", "Erzincan",
      "Erzurum", "Eskişehir", "Gaziantep", "Giresun", "Gümüşhane", "Hakkari", "Hatay", "Isparta",
      "İçel (Mersin)", "İstanbul", "İzmir", "Kars", "Kastamonu", "Kayseri", "Kırklareli", "Kırşehir",
      "Kocaeli", "Konya", "Kütahya", "Malatya", "Manisa", "Kahramanmaraş", "Mardin", "Muğla",
      "Muş", "Nevşehir", "Niğde", "Ordu", "Rize", "Sakarya", "Samsun", "Siirt",
      "Sinop", "Sivas", "Tekirdağ", "Tokat", "Trabzon", "Tunceli", "Şanlıurfa", "Uşak",
      "Van", "Yozgat", "Zonguldak", "Aksaray", "Bayburt", "Karaman", "Kırıkkale", "Batman",
      "Şırnak", "Bartın", "Ardahan", "Iğdır", "Yalova", "Karabük", "Kilis", "Osmaniye", "Düzce"
   ];

   return (
      <div className="col-lg-7">
         <form onSubmit={(e) => e.preventDefault()} className="customer__form-wrap">
            <span className="title">Fatura Detayları</span>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="first-name">Ad *</label>
                     <input type="text" id="first-name" />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="last-name">Soyad *</label>
                     <input type="text" id="last-name" />
                  </div>
               </div>
            </div>
            <div className="form-grp">
               <label htmlFor="company-name">Şirket Adı (opsiyonel)</label>
               <input type="text" id="company-name" />
            </div>
            <div className="form-grp select-grp">
               <label htmlFor="country-name">Ülke / Bölge *</label>
               <select id="country-name" name="country-name" className="country-name" defaultValue="Türkiye">
                  <option value="Türkiye">Türkiye</option>
               </select>
            </div>
            <div className="form-grp">
               <label htmlFor="street-address">Sokak Adresi *</label>
               <input type="text" id="street-address" placeholder="Bina numarası ve sokak adı" />
            </div>
            <div className="form-grp">
               <input type="text" id="street-address-two" placeholder="Daire, kat, blok vb. (opsiyonel)" />
            </div>
            <div className="form-grp select-grp">
               <label htmlFor="city-name">Şehir *</label>
               <select id="city-name" name="city-name" className="city-name">
                  <option value="">Şehir Seçiniz</option>
                  {turkiyeSehirleri.map((sehir) => (
                     <option key={sehir} value={sehir}>{sehir}</option>
                  ))}
               </select>
            </div>
            <div className="form-grp">
               <label htmlFor="zip-code">Posta Kodu *</label>
               <input type="text" id="zip-code" />
            </div>
            <div className="row">
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="phone">Telefon *</label>
                     <input type="number" id="phone" />
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="form-grp">
                     <label htmlFor="email">E-posta Adresi *</label>
                     <input type="email" id="email" />
                  </div>
               </div>
            </div>
            <span className="title title-two">Ek Bilgiler</span>
            <div className="form-grp">
               <label htmlFor="note">Sipariş Notları (opsiyonel)</label>
               <textarea id="note" placeholder="Siparişiniz hakkında notlar, örn. teslimat için özel notlar."></textarea>
            </div>
         </form>
      </div>
   )
}

export default CheckOutForm;
