"use client"
import Link from "next/link"
import HeaderOne from "@/layouts/headers/HeaderOne"
import FooterOne from "@/layouts/footers/FooterOne"

const CerezPolitikasi = () => {
    return (
        <>
            <HeaderOne />
            <main className="main-area fix">
                <section className="cookie-policy-area pt-25 pb-25">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-xl-10">
                                <div className="cookie-policy-content">
                                    <h2 className="title">Çerez Politikası</h2>
                                    <p className="mb-20"><strong>Son Güncelleme:</strong> 20 Aralık 2025</p>

                                    <div className="cookie-section mb-40">
                                        <h3>1. Çerez Nedir?</h3>
                                        <p>Çerezler, ziyaret ettiğiniz web siteleri tarafından bilgisayarınıza veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Çerezler, web sitelerinin daha verimli çalışmasını sağlar ve site sahiplerine bilgi sağlar.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>2. Çerezleri Neden Kullanıyoruz?</h3>
                                        <p>Verinin Mutfağı olarak, çerezleri aşağıdaki amaçlarla kullanıyoruz:</p>
                                        <ul>
                                            <li>Platform&apos;un düzgün çalışmasını sağlamak</li>
                                            <li>Kullanıcı deneyimini iyileştirmek</li>
                                            <li>Kullanıcı tercihlerini hatırlamak</li>
                                            <li>Oturum bilgilerini yönetmek</li>
                                            <li>Platform performansını analiz etmek</li>
                                            <li>Güvenlik önlemlerini uygulamak</li>
                                            <li>Kişiselleştirilmiş içerik sunmak</li>
                                        </ul>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>3. Kullandığımız Çerez Türleri</h3>

                                        <h4>3.1. Zorunlu Çerezler</h4>
                                        <p>Bu çerezler, Platform&apos;un temel işlevlerini yerine getirmesi için gereklidir ve devre dışı bırakılamazlar. Zorunlu çerezler şunları içerir:</p>
                                        <ul>
                                            <li><strong>Oturum Çerezleri:</strong> Oturum açma durumunuzu ve kimlik doğrulama bilgilerinizi saklar</li>
                                            <li><strong>Güvenlik Çerezleri:</strong> Güvenlik özelliklerini etkinleştirir ve kötüye kullanımı önler</li>
                                            <li><strong>Yük Dengeleme Çerezleri:</strong> Trafiği sunucular arasında dağıtır</li>
                                        </ul>

                                        <h4>3.2. Performans Çerezleri</h4>
                                        <p>Bu çerezler, Platform&apos;un nasıl kullanıldığı hakkında bilgi toplar ve performansı iyileştirmemize yardımcı olur:</p>
                                        <ul>
                                            <li><strong>Analitik Çerezleri:</strong> Ziyaretçi sayısı, sayfa görüntülemeleri ve kullanıcı davranışları hakkında anonim veriler toplar</li>
                                            <li><strong>Hata Raporlama Çerezleri:</strong> Teknik sorunları tespit eder ve düzeltir</li>
                                        </ul>

                                        <h4>3.3. İşlevsellik Çerezleri</h4>
                                        <p>Bu çerezler, gelişmiş özellikler ve kişiselleştirme sağlar:</p>
                                        <ul>
                                            <li><strong>Tercih Çerezleri:</strong> Dil, bölge ve diğer tercihlerinizi hatırlar</li>
                                            <li><strong>Özelleştirme Çerezleri:</strong> Kişiselleştirilmiş içerik ve öneriler sunar</li>
                                            <li><strong>Video Oynatıcı Çerezleri:</strong> Video oynatma tercihlerinizi saklar</li>
                                        </ul>

                                        <h4>3.4. Hedefleme/Reklam Çerezleri</h4>
                                        <p>Bu çerezler, size ve ilgi alanlarınıza daha uygun içerik sunmak için kullanılır:</p>
                                        <ul>
                                            <li><strong>Reklam Çerezleri:</strong> İlginizi çekebilecek kursları önerir</li>
                                            <li><strong>Sosyal Medya Çerezleri:</strong> Sosyal medya platformlarıyla içerik paylaşımını kolaylaştırır</li>
                                        </ul>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>4. Üçüncü Taraf Çerezleri</h3>
                                        <p>Platform&apos;umuzda aşağıdaki üçüncü taraf hizmetlerinin çerezlerini kullanabiliriz:</p>
                                        <ul>
                                            <li><strong>Google Analytics:</strong> Web sitesi trafiği ve kullanıcı davranışlarını analiz etmek için</li>
                                            <li><strong>YouTube:</strong> Video içeriklerini gömmek için</li>
                                            <li><strong>Ödeme Sağlayıcıları:</strong> Güvenli ödeme işlemleri için</li>
                                            <li><strong>Sosyal Medya Platformları:</strong> İçerik paylaşımı ve sosyal özellikler için</li>
                                        </ul>
                                        <p>Bu üçüncü taraf hizmetlerin kendi gizlilik politikaları ve çerez kullanımları vardır.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>5. Çerez Süresi</h3>
                                        <p>Çerezler, süre açısından iki kategoriye ayrılır:</p>

                                        <h4>5.1. Oturum Çerezleri (Session Cookies)</h4>
                                        <p>Tarayıcınızı kapattığınızda otomatik olarak silinen geçici çerezlerdir.</p>

                                        <h4>5.2. Kalıcı Çerezler (Persistent Cookies)</h4>
                                        <p>Belirli bir süre boyunca veya siz silene kadar cihazınızda kalan çerezlerdir. Süreleri birkaç günden birkaç yıla kadar değişebilir.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>6. Çerez Yönetimi</h3>
                                        <p>Çerezleri kontrol etmek ve yönetmek için çeşitli seçenekleriniz vardır:</p>

                                        <h4>6.1. Tarayıcı Ayarları</h4>
                                        <p>Çoğu web tarayıcısı, çerezleri otomatik olarak kabul edecek şekilde ayarlanmıştır. Tarayıcı ayarlarınızdan:</p>
                                        <ul>
                                            <li>Tüm çerezleri engelleyebilirsiniz</li>
                                            <li>Yalnızca üçüncü taraf çerezlerini engelleyebilirsiniz</li>
                                            <li>Çerezler kaydedilmeden önce uyarı alabilirsiniz</li>
                                            <li>Mevcut çerezleri silebilirsiniz</li>
                                        </ul>

                                        <h4>6.2. Tarayıcı Bazlı Çerez Yönetimi</h4>
                                        <p>Popüler tarayıcılarda çerez ayarlarına erişim:</p>
                                        <ul>
                                            <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler ve diğer site verileri</li>
                                            <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve Güvenlik → Çerezler ve Site Verileri</li>
                                            <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler ve web sitesi verileri</li>
                                            <li><strong>Edge:</strong> Ayarlar → Çerezler ve site izinleri</li>
                                        </ul>

                                        <h4>6.3. Mobil Cihazlar</h4>
                                        <p>Mobil cihazlarda çerez ayarları, cihaz ayarları veya tarayıcı ayarları üzerinden yapılabilir.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>7. Çerezleri Reddetmenin Sonuçları</h3>
                                        <p>Çerezleri engellemeniz veya silmeniz durumunda:</p>
                                        <ul>
                                            <li>Platform&apos;un bazı özellikleri düzgün çalışmayabilir</li>
                                            <li>Oturum açma durumunuz hatırlanmayabilir</li>
                                            <li>Tercihleriniz kaydedilmeyebilir</li>
                                            <li>Kişiselleştirilmiş içerik alamayabilirsiniz</li>
                                            <li>Bazı sayfalara erişim sağlayamayabilirsiniz</li>
                                        </ul>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>8. Do Not Track (DNT)</h3>
                                        <p>Bazı tarayıcılar &quot;Do Not Track&quot; (İzleme) özelliği sunar. Şu anda bu sinyaller için evrensel bir standart olmadığından, Platform&apos;umuz DNT sinyallerine otomatik olarak yanıt vermemektedir.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>9. Çocukların Gizliliği</h3>
                                        <p>Platform&apos;umuz 18 yaş altındaki kullanıcılar için tasarlanmamıştır. Çocuklardan bilerek çerez yoluyla veri toplamıyoruz.</p>
                                    </div>

                                    <div className="cookie-section mb-40">
                                        <h3>10. Politika Güncellemeleri</h3>
                                        <p>Bu Çerez Politikası&apos;nı zaman zaman güncelleyebiliriz. Önemli değişiklikler olduğunda, Platform üzerinden veya e-posta yoluyla bildirim yapacağız. Son güncelleme tarihi bu sayfanın başında belirtilmiştir.</p>
                                    </div>

                                    <div className="cookie-section">
                                        <h3>11. Yasal Dayanak</h3>
                                        <p>Çerez kullanımımız, aşağıdaki yasal düzenlemelere uygundur:</p>
                                        <ul>
                                            <li>6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK)</li>
                                            <li>Elektronik Ticaretin Düzenlenmesi Hakkında Kanun</li>
                                            <li>Elektronik İletişim Kanunu</li>
                                        </ul>
                                        <p className="mt-20">Ayrıca, <Link href="/gizlilik-politikasi">Gizlilik Politikamızı</Link> ve <Link href="/kullanici-sozlesmesi">Kullanıcı Sözleşmemizi</Link> de incelemenizi öneririz.</p>
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

export default CerezPolitikasi
