interface DataType {
   id: number;
   page: string;
   question: string;
   answer: string;
   class_name?:string;
}[];

const faq_data: DataType[] = [
   {
      id: 1,
      page: "home_1",
      question: "Skillgrow size ne sunuyor?",
      answer: "Skillgrow, alanında uzman eğitmenlerimizle birlikte en kaliteli online eğitim deneyimini sunar. Binlerce kurs arasından seçim yapabilir, kendi hızınızda öğrenebilir ve sertifikalar kazanabilirsiniz.",
   },
   {
      id: 2,
      page: "home_1",
      question: "Eğitiminiz için neden bizi seçmelisiniz?",
      class_name:"collapsed",
      answer: "Uzman eğitmen kadromuz, geniş kurs kataloğumuz ve esnek öğrenme seçeneklerimizle kariyerinizde ilerlemenize yardımcı oluyoruz. Size uygun kursları bulmanızı ve başarıya ulaşmanızı sağlıyoruz.",
   },
   {
      id: 3,
      page: "home_1",
      question: "Size nasıl hizmet sunuyoruz?",
      class_name:"collapsed",
      answer: "7/24 erişilebilir online kurslarımız, interaktif içeriklerimiz ve uzman eğitmen desteğimizle size en iyi öğrenme deneyimini sunuyoruz. İstediğiniz zaman, istediğiniz yerden öğrenebilirsiniz.",
   },
   {
      id: 4,
      page: "home_1",
      question: "Kurslarınız uygun fiyatlı mı?",
      class_name:"collapsed",
      answer: "Evet, kurslarımız uygun fiyatlıdır ve çeşitli ödeme seçenekleri sunuyoruz. Ayrıca düzenli olarak indirimler ve özel kampanyalar düzenliyoruz. Herkes için erişilebilir eğitim sağlıyoruz.",
   },
];

export default faq_data;
