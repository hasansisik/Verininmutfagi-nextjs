"use client"
import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const KullaniciSozlesmesi = () => {
    return (
        <>
            <HeaderOne />
            <main className="main-area fix">
                <section className="user-agreement-area pt-25 pb-25">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="user-agreement-content">
                                    <h2 className="title">Kullanıcı Sözleşmesi</h2>
                                    <p className="mb-20"><strong>Son Güncelleme:</strong> 20 Aralık 2025</p>

                                    <div className="agreement-section mb-40">
                                        <h3>1. Taraflar ve Konu</h3>
                                        <p>İşbu Kullanıcı Sözleşmesi (&quot;Sözleşme&quot;), Verinin Mutfağı online eğitim platformu (&quot;Platform&quot;) ile Platform&apos;u kullanan gerçek veya tüzel kişiler (&quot;Kullanıcı&quot;) arasında akdedilmiştir. Bu Sözleşme, Platform&apos;un kullanım şartlarını ve tarafların hak ve yükümlülüklerini düzenler.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>2. Sözleşmenin Kabul Edilmesi</h3>
                                        <p>Platform&apos;a üye olarak veya Platform&apos;u kullanarak, işbu Sözleşme&apos;nin tüm hükümlerini okuduğunuzu, anladığınızı ve kabul ettiğinizi beyan ve taahhüt edersiniz. Sözleşme hükümlerini kabul etmiyorsanız, Platform&apos;u kullanmamalısınız.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>3. Platform Hizmetleri</h3>
                                        <p>Verinin Mutfağı, kullanıcılarına aşağıdaki hizmetleri sunar:</p>
                                        <ul>
                                            <li>Online video eğitim kursları</li>
                                            <li>İnteraktif öğrenme materyalleri</li>
                                            <li>Sertifika programları</li>
                                            <li>Canlı eğitim oturumları</li>
                                            <li>Öğrenci-eğitmen iletişim platformu</li>
                                            <li>İlerleme takip sistemi</li>
                                        </ul>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>4. Kullanıcı Hesabı</h3>
                                        <h4>4.1. Hesap Oluşturma</h4>
                                        <p>Platform&apos;u kullanabilmek için bir hesap oluşturmanız gerekmektedir. Hesap oluştururken:</p>
                                        <ul>
                                            <li>Doğru, güncel ve eksiksiz bilgiler sağlamalısınız</li>
                                            <li>18 yaşından büyük olmalısınız</li>
                                            <li>Hesap bilgilerinizi gizli tutmalısınız</li>
                                            <li>Hesabınızda gerçekleşen tüm faaliyetlerden sorumlusunuz</li>
                                        </ul>

                                        <h4>4.2. Hesap Güvenliği</h4>
                                        <p>Şifrenizi güvenli tutmak ve hesabınıza yetkisiz erişimi önlemek sizin sorumluluğunuzdadır. Hesabınızda yetkisiz bir kullanım fark ederseniz, derhal bize bildirmelisiniz.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>5. Kullanıcı Yükümlülükleri</h3>
                                        <p>Platform&apos;u kullanırken aşağıdaki kurallara uymayı kabul edersiniz:</p>
                                        <ul>
                                            <li>Platform&apos;u yalnızca yasal amaçlarla kullanmak</li>
                                            <li>Diğer kullanıcıların haklarına saygı göstermek</li>
                                            <li>Telif hakkı ve fikri mülkiyet haklarını ihlal etmemek</li>
                                            <li>Zararlı yazılım, virüs veya kötü amaçlı kod yüklememek</li>
                                            <li>Platform&apos;un güvenliğini tehlikeye atacak faaliyetlerde bulunmamak</li>
                                            <li>Spam veya istenmeyen içerik göndermemek</li>
                                            <li>Başkalarının hesaplarına yetkisiz erişim sağlamamak</li>
                                        </ul>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>6. Fikri Mülkiyet Hakları</h3>
                                        <p>Platform&apos;da yer alan tüm içerikler (videolar, metinler, görseller, logolar, yazılımlar vb.) Verinin Mutfağı&apos;nın veya lisans verenlerin mülkiyetindedir ve telif hakkı yasalarıyla korunmaktadır. Kullanıcılar:</p>
                                        <ul>
                                            <li>İçerikleri yalnızca kişisel ve ticari olmayan amaçlarla kullanabilir</li>
                                            <li>İçerikleri kopyalayamaz, çoğaltamaz veya dağıtamaz</li>
                                            <li>İçerikleri değiştirmeden veya türev eserler oluşturmadan kullanmalıdır</li>
                                            <li>Satın aldıkları kurs içeriklerini üçüncü kişilerle paylaşamaz</li>
                                        </ul>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>7. Ödeme ve İade Politikası</h3>
                                        <h4>7.1. Ödeme</h4>
                                        <p>Ücretli kurslar için ödeme, kurs satın alma sırasında belirtilen fiyat üzerinden yapılır. Tüm ödemeler Türk Lirası (TL) cinsindendir ve KDV dahildir.</p>

                                        <h4>7.2. İade</h4>
                                        <p>Satın aldığınız kurstan memnun kalmazsanız, satın alma tarihinden itibaren 14 gün içinde ve kursun %20&apos;sinden azını tamamlamış olmanız koşuluyla tam iade talep edebilirsiniz.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>8. Sertifikalar</h3>
                                        <p>Kurs tamamlama sertifikaları, kursun tüm gerekliliklerini yerine getiren kullanıcılara verilir. Sertifikalar dijital formatta sağlanır ve Platform üzerinden indirilebilir.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>9. Hesap Askıya Alma ve Sonlandırma</h3>
                                        <p>Verinin Mutfağı, aşağıdaki durumlarda kullanıcı hesaplarını askıya alma veya sonlandırma hakkını saklı tutar:</p>
                                        <ul>
                                            <li>Sözleşme hükümlerinin ihlali</li>
                                            <li>Yasadışı faaliyetler</li>
                                            <li>Diğer kullanıcılara zarar verici davranışlar</li>
                                            <li>Ödeme yükümlülüklerinin yerine getirilmemesi</li>
                                        </ul>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>10. Sorumluluk Sınırlaması</h3>
                                        <p>Verinin Mutfağı, Platform&apos;un kesintisiz ve hatasız çalışacağını garanti etmez. Platform &quot;olduğu gibi&quot; sunulur. Verinin Mutfağı, aşağıdaki durumlardan sorumlu tutulamaz:</p>
                                        <ul>
                                            <li>Platform&apos;un kullanımından kaynaklanan dolaylı zararlar</li>
                                            <li>Üçüncü taraf hizmetlerindeki aksaklıklar</li>
                                            <li>İnternet bağlantısı sorunları</li>
                                            <li>Kullanıcı hatalarından kaynaklanan sorunlar</li>
                                        </ul>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>11. Gizlilik</h3>
                                        <p>Kişisel verilerinizin işlenmesi <Link href="/gizlilik-politikasi">Gizlilik Politikamız</Link> kapsamında düzenlenir. Platform&apos;u kullanarak Gizlilik Politikamızı kabul etmiş olursunuz.</p>
                                    </div>

                                    <div className="agreement-section mb-40">
                                        <h3>12. Sözleşme Değişiklikleri</h3>
                                        <p>Verinin Mutfağı, bu Sözleşme&apos;yi herhangi bir zamanda değiştirme hakkını saklı tutar. Önemli değişiklikler e-posta yoluyla bildirilecektir. Değişiklikler yayınlandıktan sonra Platform&apos;u kullanmaya devam etmeniz, değişiklikleri kabul ettiğiniz anlamına gelir.</p>
                                    </div>

                                    <div className="agreement-section">
                                        <h3>13. Uygulanacak Hukuk ve Yetki</h3>
                                        <p>Bu Sözleşme Türkiye Cumhuriyeti yasalarına tabidir. Sözleşme&apos;den doğan uyuşmazlıkların çözümünde İstanbul Mahkemeleri ve İcra Daireleri yetkilidir.</p>
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

export default KullaniciSozlesmesi
