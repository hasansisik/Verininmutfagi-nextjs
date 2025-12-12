interface MenuItem {
    id: number;
    title: string;
    link: string;
    menu_class?: string;
    home_sub_menu?: {
        menu_details: {
            link: string;
            title: string;
            badge?: string;
            badge_class?: string;
        }[];
    }[];
    sub_menus?: {
        link: string;
        title: string;
        dropdown?: boolean;
        mega_menus?: {
            link: string;
            title: string;
        }[];
    }[];
}[];

const menu_data: MenuItem[] = [

    {
        id: 1,
        title: "Anasayfa",
        link: "/",
    },
    {
        id: 2,
        title: "Kategoriler",
        link: "#",
        sub_menus: [
            { link: "/courses?category=business", title: "İşletme" },
            { link: "/courses?category=data-science", title: "Veri Bilimi" },
            { link: "/courses?category=art-design", title: "Sanat & Tasarım" },
            { link: "/courses?category=marketing", title: "Pazarlama" },
            { link: "/courses?category=finance", title: "Finans" },
            { link: "/courses?category=development", title: "Geliştirme" },
        ],
    }
];
export default menu_data;
