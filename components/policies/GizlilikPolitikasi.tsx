"use client"
import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const GizlilikPolitikasi = () => {
    return (
        <>
            <HeaderOne />
            <main className="main-area fix">
                <section className="privacy-policy-area pt-25 pb-25">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="privacy-policy-content">
                                    <h2 className="title">Gizlilik Politikası</h2>
                                    <p className="mb-20"><strong>Son Güncelleme:</strong> 20 Aralık 2025</p>

                                    <div className="policy-section mb-40">
                                        <h3>1. Giriş</h3>
                                        <p>Verinin Mutfağı olarak, kullanıcılarımızın gizliliğini korumayı en önemli önceliklerimizden biri olarak görüyoruz. Bu Gizlilik Politikası, online eğitim platformumuz üzerinden topladığımız kişisel verilerin nasıl işlendiğini, kullanıldığını ve korunduğunu açıklamaktadır.</p>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>2. Toplanan Bilgiler</h3>
                                        <h4>2.1. Kişisel Bilgiler</h4>
                                        <p>Platformumuzu kullanırken aşağıdaki kişisel bilgilerinizi toplayabiliriz:</p>
                                        <ul>
                                            <li>Ad ve soyad</li>
                                            <li>E-posta adresi</li>
                                            <li>Telefon numarası</li>
                                            <li>Fatura ve ödeme bilgileri</li>
                                            <li>Profil fotoğrafı (isteğe bağlı)</li>
                                        </ul>

                                        <h4>2.2. Kullanım Bilgileri</h4>
                                        <p>Platformumuzun kullanımı sırasında otomatik olarak toplanan bilgiler:</p>
                                        <ul>
                                            <li>IP adresi</li>
                                            <li>Tarayıcı türü ve versiyonu</li>
                                            <li>Ziyaret edilen sayfalar ve geçirilen süre</li>
                                            <li>Kurs ilerleme bilgileri</li>
                                            <li>Çerez bilgileri</li>
                                        </ul>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>3. Bilgilerin Kullanım Amaçları</h3>
                                        <p>Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
                                        <ul>
                                            <li>Hesap oluşturma ve yönetimi</li>
                                            <li>Kurs kayıtlarının işlenmesi</li>
                                            <li>Ödeme işlemlerinin gerçekleştirilmesi</li>
                                            <li>Müşteri destek hizmetlerinin sağlanması</li>
                                            <li>Platform performansının iyileştirilmesi</li>
                                            <li>Kişiselleştirilmiş içerik önerileri sunma</li>
                                            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                                        </ul>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>4. Bilgi Güvenliği</h3>
                                        <p>Kişisel verilerinizin güvenliğini sağlamak için endüstri standardı güvenlik önlemleri kullanıyoruz:</p>
                                        <ul>
                                            <li>SSL/TLS şifreleme teknolojisi</li>
                                            <li>Güvenli veri depolama sistemleri</li>
                                            <li>Düzenli güvenlik denetimleri</li>
                                            <li>Sınırlı erişim kontrolleri</li>
                                            <li>Güvenlik duvarları ve anti-virüs koruması</li>
                                        </ul>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>5. Bilgi Paylaşımı</h3>
                                        <p>Kişisel bilgilerinizi aşağıdaki durumlar dışında üçüncü taraflarla paylaşmayız:</p>
                                        <ul>
                                            <li>Açık rızanızın bulunması durumunda</li>
                                            <li>Yasal zorunluluklar gereği</li>
                                            <li>Ödeme işlemlerini gerçekleştirmek için ödeme sağlayıcılarıyla</li>
                                            <li>Platform hizmetlerini sunmak için gerekli hizmet sağlayıcılarıyla</li>
                                        </ul>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>6. Kullanıcı Hakları</h3>
                                        <p>KVKK (Kişisel Verilerin Korunması Kanunu) kapsamında aşağıdaki haklara sahipsiniz:</p>
                                        <ul>
                                            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                                            <li>Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme</li>
                                            <li>Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                                            <li>Kişisel verilerin yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                                            <li>Kişisel verilerin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                                            <li>Kişisel verilerin silinmesini veya yok edilmesini isteme</li>
                                        </ul>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>7. Çerezler</h3>
                                        <p>Platformumuz, kullanıcı deneyimini iyileştirmek için çerezler kullanmaktadır. Çerez kullanımı hakkında detaylı bilgi için <Link href="/cerez-politikasi">Çerez Politikamızı</Link> inceleyebilirsiniz.</p>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>8. Veri Saklama Süresi</h3>
                                        <p>Kişisel verileriniz, işleme amacının gerektirdiği süre boyunca ve yasal saklama yükümlülüklerimiz doğrultusunda saklanır. Hesabınızı kapattığınızda, yasal yükümlülüklerimiz saklı kalmak kaydıyla verileriniz silinir.</p>
                                    </div>

                                    <div className="policy-section mb-40">
                                        <h3>9. Çocukların Gizliliği</h3>
                                        <p>Platformumuz 18 yaş altındaki kullanıcılar için tasarlanmamıştır. 18 yaş altındaki bireylerin kişisel bilgilerini bilerek toplamıyoruz. Eğer 18 yaşından küçük bir kullanıcının bilgilerini topladığımızı fark edersek, bu bilgileri derhal sileriz.</p>
                                    </div>

                                    <div className="policy-section">
                                        <h3>10. Politika Değişiklikleri</h3>
                                        <p>Bu Gizlilik Politikasını zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, sizi e-posta yoluyla veya platformumuz üzerinden bilgilendireceğiz. Politikayı düzenli olarak gözden geçirmenizi öneririz.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <FooterOne />
        </>
    )
}

export default GizlilikPolitikasi
