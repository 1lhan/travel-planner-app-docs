🗺️ Seyahat Planı (Travel Plan) Modülü

🎯 Amaç
• Kullanıcıların kendi tercihlerine göre özelleştirilmiş seyahat planları oluşturmasını sağlar.
• Sistemin temel verilere dayanarak akıllı öneriler sunmasını ve bu planlara uygun kampanyaları eşleştirmesini sağlar.
• Oluşturulan planlar toplulukla paylaşılabilir ve yapay zeka desteğiyle sürekli geliştirilebilir.

👤 Kullanıcıdan Alınan Girdiler
• Bütçe Limiti (opsiyonel): minBudget, maxBudget
• Kişi Sayısı: Seyahate katılacak toplam kişi sayısı
• İlgi Alanları: Tarih, doğa, müze, alışveriş, gece hayatı vb.
• Seyahat Adımları:
    • Ülke, şehir veya ilçe bilgisi
    • Lokasyonda kalış süresi
    • Ulaşım tipi (opsiyonel): uçak, otobüs, tren, özel araç, karavan vb.
    • Konaklama tipi (opsiyonel): otel, hostel, Airbnb, kamp alanı, karavan parkı vb.
• Kampanya Katılım Bilgisi (koşullu): Kişi sayısı > 1 ve kampanyalı hizmet seçilmişse, kampanyadan kaç kişinin yararlanacağı bilgisi alınır.

🧠 Modül İşleyişi

1. Plan Oluşturma
• Kullanıcı kişi sayısı ve opsiyonel bütçe sınırlarını belirler.
• İlgi alanlarını seçer.
• Gideceği her lokasyon için kalış süresi, ulaşım ve konaklama tiplerini (opsiyonel) girer.
• Kampanyalı hizmet seçilmiş ve grup varsa kampanya yararlanıcı sayısı istenir.

📌 Çok Lokasyonlu Seyahatlerde Sıralama
• Her lokasyon için önce ulaşım ve konaklama tercihleri yapılır.
• Ardından gezilecek yerler ve etkinlikler önerilir.
• Örnek akış:
    • Antalya için ulaşım & konaklama
    • Muğla için ulaşım & konaklama
    • Antalya için gezilecek yer ve etkinlikler
    • Muğla için gezilecek yer ve etkinlikler
    • Antalya için takvim
    • Muğla için takvim
• Böylece her lokasyon için bağlama uygun öneriler sağlanır.

2. Yapay Zeka Destekli Öneriler
• Konaklama: Kullanıcının bütçesi, kişi sayısı, seyahat tarihleri, ilgi alanları ve tercih ettiği konaklama türüne göre en uygun seçenekler sunulur.
• Ulaşım: Gidiş-dönüş alternatifleri; bütçe, kişi sayısı, lokasyon ve tarih göz önünde bulundurularak listelenir.
• Gezilecek Yerler ve Etkinlikler: Her lokasyon için maksimum 10 öneri sunulur. Kampanyalı ve cashback fırsatı olan mekanlar öncelikli gösterilir.
• Kullanıcı Etkileşimi: “Daha fazla göster” butonuyla ek öneriler alınabilir.
• Filtreleme ve Sıralama: Popülerlik, kullanıcı değerlendirmeleri, fiyat ve kampanya durumu gibi kriterlere göre sonuçlar filtrelenip sıralanabilir.

3. Seyahat Ögeleri Seçimi, Manuel Yer Ekleme ve Aktivite Takvimi
• Kullanıcı önerilen seçeneklerden tercih yapar.
• Kullanıcı, sistemde kayıtlı olup önerilmeyen yerleri seçip ekleyebilir.
• Ayrıca, sistemde kayıtlı olmayan özel yerler manuel olarak da seyahat planına dahil edilebilir.
• Kullanıcı, önerilen ya da kendi eklediği yerleri günlük aktivite takvimine ekleyerek seyahat planını oluşturur.

4. Özellikler
• Place modeli üzerinden yerler arası ulaşım seçenekleri tek tuşla Google Maps'te gösterilir.

5. Paylaşım ve Yönetim
• Plan isPublic ise toplulukla paylaşılır (varsayılan gizli).
• Influencerların oluşturduğu seyahat planları ve bu planlara yaptıkları paylaşımlar ana sayfada özel olarak öne çıkarılır.
• Kullanıcılar kendi planlarını listeler, düzenler, siler.
• Kullanıcılar seyahat planlarına yorum yapabilir.

model TravelPlan {
  id                 String       @id @default(cuid())
  userId             String
  user               User         @relation("UserTravelPlans", fields: [userId], references: [id])

  isPublic           Boolean      @default(false)  // Toplulukla paylaşım durumu
  sharedByInfluencer Boolean      @default(false)  // Influencer tarafından paylaşım durumu

  title              String       // Seyahat planının başlığı
  minBudget          Float?       // Minimum bütçe limiti (opsiyonel)
  maxBudget          Float?       // Maksimum bütçe limiti (opsiyonel)
  interests          Category[]   // Kullanıcının ilgi alanları

  travelSteps        Json         // Lokasyon, tarih, ulaşım, süre, maliyet ve konaklama tercihi detayları
  appliedCampaigns   Campaign[]   @relation("AppliedCampaigns")  // Planla ilişkilendirilmiş kampanyalar
  placeSelections    Json         // Seçilen gezilecek yerler (Place ID referansları)
  eventSelections    Json         // Seçilen etkinlikler (Event ID referansları)
  manualPlaces       Json?        // Sistem dışı manuel eklenen özel yerler (opsiyonel)
  activityCalendar   Json?        // Günlük aktivite takvimi (her lokasyon için ayrı olabilir)

  price              Float?       // Plan ücretliyse fiyat (TRY)
  isFree             Boolean      @default(true)   // Ücretsiz mi?
  soldCount          Int          @default(0)      // Satın alma sayısı
  purchases          TravelPlanPurchase[] @relation("PurchasedTravelPlans")  // Planı satın alanlar

  comments           Comment[]    // Seyahat planına yapılan yorumlar

  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt
}

travelSteps: [
  {
    "country": "İtalya",
    "city": "Roma",
    "district": "Trastevere",
    "arrivalDate": "2025-08-01",
    "departureDate": "2025-08-04",
    "transport": "Plane",
    "travelDurationMinutes": 120,
    "travelCost": 150.0,
    "accommodationType": "Hotel"
  },
  {
    "country": "Fransa",
    "city": "Paris",
    "district": "Montmartre",
    "arrivalDate": "2025-08-04",
    "departureDate": "2025-08-09",
    "transport": "Train",
    "travelDurationMinutes": 240,
    "travelCost": 80.0,
    "accommodationType": "Hostel"
  }
]

activityCalendar: [
    {
        "2025-08-01": [
            {
            "locationId": "place123",
            "activityType": "sightseeing",   // örn: sightseeing, dining, transport, event, manualPlace
            "title": "Antalya Kaleiçi Turu",
            "startTime": "09:00",
            "endTime": "12:00",
            "notes": "Rehberli tur",
            "relatedId": "place123"           // İlgili Place veya Event ID'si
            },
            {
            "locationId": "place456",
            "activityType": "dining",
            "title": "Öğle Yemeği",
            "startTime": "12:30",
            "endTime": "13:30",
            "notes": "Deniz ürünleri restoranı",
            "relatedId": "place456"
            }
        ],
        "2025-08-02": [
            {
            "locationId": "place789",
            "activityType": "event",
            "title": "Yat Festivali",
            "startTime": "14:00",
            "endTime": "18:00",
            "notes": "Yat turu ve etkinlik",
            "relatedId": "event789"
            }
        ]
    }
]

model TravelPlanPurchase {
  id             String   @id @default(cuid())

  buyerId        String
  buyer          User     @relation(fields: [buyerId], references: [id])

  travelPlanId   String
  travelPlan     TravelPlan @relation(fields: [travelPlanId], references: [id])

  pricePaid      Float
  platformFee    Float     // Örneğin %20'si sistem komisyonu
  creatorEarning Float     // Örneğin %80'i plana sahip kullanıcıya kalır

  earningStatus  TravelPlanEarningStatus @default(pending) // Kazanç ödendi mi? pending, paid, disputed, cancelled

  purchasedAt    DateTime @default(now())
  paidAt         DateTime?    // Ödeme yapıldıysa
}