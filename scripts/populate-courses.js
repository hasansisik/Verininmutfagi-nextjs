const axios = require('axios');

const API_URL = 'http://localhost:3040/v1';

// Token'ı buraya yapıştırın (localStorage'dan alın)
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTQyYjZhMTEzNzIyZTk2NWRiYjIzYTUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NjYwMTczNTQsImV4cCI6MTc5NzU1MzM1NH0.Yz3RywC2TMx20mRad7a5AXIGQN7puSPLXnbonKS89oE';

const courses = [
    {
        slug: 'hayal-gucuyle-javascript-ogrenmek',
        title: 'Hayal Gücüyle JavaScript Öğrenmek',
        categoryName: 'Veri Bilimi', // MongoDB'deki gerçek kategori ismi
        price: 0,
        originalPrice: 299,
        desc: 'JavaScript\'i sıfırdan ileri seviyeye kadar öğrenin. Modern web geliştirme teknikleri, ES6+ özellikleri ve gerçek dünya projeleri ile pratik yapın.',
        skill_level: 'Başlangıç',
        price_type: 'Ücretsiz',
        language: 'Türkçe',
        duration: '18sa 45dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb01.jpg',
        isActive: true,
        overview: {
            description: 'Bu kurs, JavaScript\'i sıfırdan öğrenmek isteyenler için kapsamlı bir eğitim programı sunmaktadır. Modern web geliştirme tekniklerini öğrenirken, temel kavramlardan başlayarak ileri seviye konulara kadar geniş bir yelpazede bilgi ve beceri kazandırmayı hedeflemektedir.',
            whatYouWillLearn: 'Kurs boyunca JavaScript\'in temel ve ileri seviye konularını kapsayan detaylı bir müfredat ile karşılaşacaksınız. Her konu, pratik örnekler ve uygulamalı projeler ile desteklenmektedir.',
            learningObjectives: [
                'JavaScript temellerini ve ES6+ özelliklerini öğrenme',
                'DOM manipülasyonu ve event handling teknikleri',
                'Asenkron programlama (Promises, Async/Await)',
                'Modern JavaScript framework\'lerine hazırlık',
                'Gerçek dünya projeleri geliştirme',
                'Clean code ve best practices uygulama'
            ],
            conclusion: 'Kurs içeriği, başlangıç seviyesinden ileri seviyeye kadar tüm öğrencilere uygun olacak şekilde tasarlanmıştır.'
        },
        curriculum: [
            {
                title: 'JavaScript Temelleri',
                lessons: [
                    { lock: false, title: 'Kursa Giriş ve Genel Bakış', duration: '05:30', videoUrl: '' },
                    { lock: true, title: 'Değişkenler ve Veri Tipleri', duration: '12:45', videoUrl: '' },
                    { lock: true, title: 'Operatörler ve Koşullu İfadeler', duration: '15:20', videoUrl: '' },
                    { lock: true, title: 'Döngüler ve Iterasyon', duration: '18:10', videoUrl: '' }
                ]
            },
            {
                title: 'Fonksiyonlar ve Scope',
                lessons: [
                    { lock: true, title: 'Fonksiyon Tanımlama ve Çağırma', duration: '14:30', videoUrl: '' },
                    { lock: true, title: 'Arrow Functions ve This Keyword', duration: '16:25', videoUrl: '' },
                    { lock: true, title: 'Closure ve Scope Zinciri', duration: '19:40', videoUrl: '' },
                    { lock: true, title: 'Higher Order Functions', duration: '22:15', videoUrl: '' }
                ]
            }
        ]
    },
    {
        slug: 'baslangic-seviyesi-grafik-tasarim',
        title: 'Başlangıç Seviyesi İçin Eksiksiz Grafik Tasarım',
        categoryName: 'Veri Bilimi',
        price: 249,
        originalPrice: 499,
        desc: 'Adobe Photoshop, Illustrator ve InDesign kullanarak profesyonel grafik tasarım becerilerini öğrenin. Logo tasarımından marka kimliğine kadar her şeyi kapsayan kapsamlı eğitim.',
        skill_level: 'Başlangıç',
        price_type: 'Ücretli',
        language: 'Türkçe',
        duration: '22sa 15dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb02.jpg',
        isActive: true,
        overview: {
            description: 'Grafik tasarım dünyasına adım atmak isteyenler için hazırlanmış kapsamlı bir eğitim programı. Adobe Creative Suite araçlarını kullanarak profesyonel tasarımlar oluşturmayı öğreneceksiniz.',
            whatYouWillLearn: 'Bu kursta renk teorisi, tipografi, kompozisyon ve görsel hiyerarşi gibi temel tasarım prensiplerini öğreneceksiniz.',
            learningObjectives: [
                'Adobe Photoshop, Illustrator ve InDesign\'da uzmanlaşma',
                'Renk teorisi ve tipografi prensiplerini uygulama',
                'Logo ve marka kimliği tasarlama',
                'Poster, broşür ve reklam materyalleri oluşturma'
            ],
            conclusion: 'Kurs sonunda profesyonel grafik tasarım projelerini baştan sona yönetebileceksiniz.'
        },
        curriculum: [
            {
                title: 'Tasarım Temelleri',
                lessons: [
                    { lock: false, title: 'Grafik Tasarıma Giriş', duration: '08:20', videoUrl: '' },
                    { lock: true, title: 'Renk Teorisi ve Psikolojisi', duration: '16:45', videoUrl: '' }
                ]
            }
        ]
    },
    {
        slug: 'facebook-dijital-pazarlama',
        title: 'Facebook\'ta Dijital Pazarlama Öğrenmek',
        categoryName: 'Veri Bilimi',
        price: 199,
        originalPrice: 399,
        desc: 'Facebook ve Instagram reklamcılığında uzmanlaşın. Hedef kitle analizi, reklam kampanyası yönetimi ve ROI optimizasyonu ile satışlarınızı artırın.',
        skill_level: 'Orta',
        price_type: 'Ücretli',
        language: 'Türkçe',
        duration: '16sa 30dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb03.jpg',
        isActive: true,
        overview: {
            description: 'Facebook ve Instagram platformlarında etkili dijital pazarlama kampanyaları oluşturmayı öğrenin.',
            whatYouWillLearn: 'Facebook Ads Manager, Instagram reklamları, Pixel kurulumu konularında bilgi edineceksiniz.',
            learningObjectives: [
                'Facebook Ads Manager\'ı profesyonel seviyede kullanma',
                'Hedef kitle analizi ve segmentasyon stratejileri'
            ],
            conclusion: 'Kurs sonunda kendi dijital pazarlama kampanyalarınızı oluşturabileceksiniz.'
        },
        curriculum: [
            {
                title: 'Dijital Pazarlama Temelleri',
                lessons: [
                    { lock: false, title: 'Dijital Pazarlamaya Giriş', duration: '10:15', videoUrl: '' }
                ]
            }
        ]
    },
    {
        slug: 'python-veri-bilimi-makine-ogrenmesi',
        title: 'Python ile Veri Bilimi ve Makine Öğrenmesi',
        categoryName: 'Veri Bilimi',
        price: 0,
        originalPrice: 599,
        desc: 'Python, Pandas, NumPy ve Scikit-learn kullanarak veri analizi ve makine öğrenmesi projelerini hayata geçirin. Gerçek veri setleri ile pratik yapın.',
        skill_level: 'Orta',
        price_type: 'Ücretsiz',
        language: 'Türkçe',
        duration: '28sa 40dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb04.jpg',
        isActive: true,
        overview: {
            description: 'Veri bilimi ve makine öğrenmesi alanında kariyer yapmak isteyenler için hazırlanmış kapsamlı bir eğitim programı.',
            whatYouWillLearn: 'Veri temizleme, keşifsel veri analizi, makine öğrenmesi algoritmaları öğreneceksiniz.',
            learningObjectives: [
                'Python ile veri analizi ve manipülasyonu',
                'Pandas ve NumPy kütüphanelerinde uzmanlaşma'
            ],
            conclusion: 'Kurs sonunda veri bilimi projelerini baştan sona yönetebileceksiniz.'
        },
        curriculum: [
            {
                title: 'Python Temelleri',
                lessons: [
                    { lock: false, title: 'Python ve Veri Bilimine Giriş', duration: '12:30', videoUrl: '' }
                ]
            }
        ]
    },
    {
        slug: 'finansal-analiz-yatirim-stratejileri',
        title: 'Finansal Analiz ve Yatırım Stratejileri',
        categoryName: 'Veri Bilimi',
        price: 349,
        originalPrice: 699,
        desc: 'Hisse senedi analizi, portföy yönetimi ve yatırım stratejileri öğrenin. Teknik ve temel analiz yöntemleri ile bilinçli yatırım kararları alın.',
        skill_level: 'İleri',
        price_type: 'Ücretli',
        language: 'Türkçe',
        duration: '24sa 20dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb05.jpg',
        isActive: true,
        overview: {
            description: 'Finansal piyasalarda başarılı olmak isteyenler için hazırlanmış kapsamlı bir yatırım eğitimi.',
            whatYouWillLearn: 'Finansal tablolar analizi, teknik analiz, portföy yönetimi öğreneceksiniz.',
            learningObjectives: [
                'Finansal tablo analizi ve değerleme yöntemleri',
                'Teknik analiz göstergeleri ve grafik formasyonları'
            ],
            conclusion: 'Kurs sonunda kendi yatırım stratejilerinizi geliştirebileceksiniz.'
        },
        curriculum: [
            {
                title: 'Finansal Piyasalara Giriş',
                lessons: [
                    { lock: false, title: 'Finansal Piyasalar ve Araçlar', duration: '14:20', videoUrl: '' }
                ]
            }
        ]
    },
    {
        slug: 'etkili-iletisim-sunum-becerileri',
        title: 'Etkili İletişim ve Sunum Becerileri',
        categoryName: 'Veri Bilimi',
        price: 179,
        originalPrice: 349,
        desc: 'Profesyonel iletişim becerileri geliştirin, etkili sunumlar yapın ve kariyerinizde fark yaratın. Beden dili, diksiyon ve ikna teknikleri öğrenin.',
        skill_level: 'Başlangıç',
        price_type: 'Ücretli',
        language: 'Türkçe',
        duration: '14sa 50dk',
        videoId: 'b2Az7_lLh3g',
        thumb: '/assets/img/courses/course_thumb06.jpg',
        isActive: true,
        overview: {
            description: 'İş hayatında ve sosyal yaşamda başarılı olmak için gerekli iletişim becerilerini geliştirin.',
            whatYouWillLearn: 'Etkili iletişim, beden dili, sunum teknikleri öğreneceksiniz.',
            learningObjectives: [
                'Etkili iletişim ve aktif dinleme becerileri',
                'Beden dili ve sözsüz iletişim teknikleri'
            ],
            conclusion: 'Kurs sonunda profesyonel ortamlarda kendinden emin bir şekilde iletişim kurabileceksiniz.'
        },
        curriculum: [
            {
                title: 'İletişim Temelleri',
                lessons: [
                    { lock: false, title: 'Etkili İletişime Giriş', duration: '10:30', videoUrl: '' }
                ]
            }
        ]
    }
];

async function getCategories() {
    console.log('📁 Kategoriler getiriliyor...\n');

    try {
        const response = await axios.get(`${API_URL}/categories`, {
            headers: { Authorization: `Bearer ${TOKEN}` }
        });

        const categoryMap = {};
        response.data.categories.forEach(cat => {
            categoryMap[cat.name] = cat._id;
            console.log(`✅ ${cat.icon || '📁'} ${cat.name} (ID: ${cat._id})`);
        });

        return categoryMap;
    } catch (error) {
        console.log('❌ Kategoriler getirilemedi:', error.response?.data?.message || error.message);
        return {};
    }
}

async function createCourses(categoryMap) {
    console.log('\n📚 Kurslar oluşturuluyor...\n');

    for (const course of courses) {
        try {
            const categoryId = categoryMap[course.categoryName];
            if (!categoryId) {
                console.log(`❌ ${course.title} - Kategori bulunamadı: ${course.categoryName}`);
                console.log(`   Mevcut kategoriler: ${Object.keys(categoryMap).join(', ')}`);
                continue;
            }

            const courseData = {
                ...course,
                category: categoryId
            };
            delete courseData.categoryName;

            const response = await axios.post(`${API_URL}/courses`, courseData, {
                headers: { Authorization: `Bearer ${TOKEN}` }
            });

            console.log(`✅ ${course.title} oluşturuldu`);
        } catch (error) {
            console.log(`❌ ${course.title} oluşturulamadı:`, error.response?.data?.message || error.message);
        }
    }
}

async function main() {
    if (TOKEN === 'BURAYA_TOKEN_YAPIŞTIRIN') {
        console.log('❌ Lütfen TOKEN değişkenini güncelleyin!');
        console.log('Token\'ı tarayıcı console\'dan localStorage.getItem("accessToken") ile alabilirsiniz.');
        return;
    }

    try {
        const categoryMap = await getCategories();

        if (Object.keys(categoryMap).length === 0) {
            console.log('\n❌ Kategori bulunamadı. Lütfen önce kategori oluşturun.');
            return;
        }

        console.log('\n💡 Şu anda tüm kurslar "Veri Bilimi" kategorisine atanacak.');
        console.log('   Farklı kategoriler kullanmak için script içindeki categoryName değerlerini güncelleyin.\n');

        await createCourses(categoryMap);
        console.log('\n✨ Tüm işlemler tamamlandı!');
    } catch (error) {
        console.error('❌ Hata:', error.message);
    }
}

main();
