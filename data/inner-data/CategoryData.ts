export interface CategoryType {
    id: number;
    slug: string;
    name: string;
    icon: string;
    description: string;
    courseCount: number;
}

const category_data: CategoryType[] = [
    {
        id: 1,
        slug: "gelistirme",
        name: "Geliştirme",
        icon: "flaticon-coding",
        description: "Web, mobil ve yazılım geliştirme kursları",
        courseCount: 1
    },
    {
        id: 2,
        slug: "sanat-ve-tasarim",
        name: "Sanat ve Tasarım",
        icon: "flaticon-graphic-design",
        description: "Grafik tasarım, UI/UX ve dijital sanat kursları",
        courseCount: 1
    },
    {
        id: 3,
        slug: "isletme",
        name: "İşletme",
        icon: "flaticon-email",
        description: "Dijital pazarlama, e-ticaret ve iş geliştirme kursları",
        courseCount: 1
    },
    {
        id: 4,
        slug: "veri-bilimi",
        name: "Veri Bilimi",
        icon: "flaticon-data-science",
        description: "Veri analizi, makine öğrenmesi ve AI kursları",
        courseCount: 1
    },
    {
        id: 5,
        slug: "finans",
        name: "Finans",
        icon: "flaticon-investment",
        description: "Yatırım, finansal analiz ve borsa kursları",
        courseCount: 1
    },
    {
        id: 6,
        slug: "kisisel-gelisim",
        name: "Kişisel Gelişim",
        icon: "flaticon-interaction",
        description: "İletişim, liderlik ve kişisel beceri geliştirme kursları",
        courseCount: 1
    },
];

export default category_data;
