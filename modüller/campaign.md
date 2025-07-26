🎁 Kampanya (Campaign) Modülü

🎯 Amaç
• Kampanya Modülü, kullanıcıların oluşturduğu seyahat planlarına uygun kampanyaları dinamik ve akıllı şekilde önerir; uygulamanın "Kampanyalar" sayfasında listeler.
• İşletmelerin (otel, restoran vb.) kampanyalarını yayınlayıp yönetebileceği kapsamlı bir altyapı sağlar.
• Influencerların kampanyaları kendi özel affiliate linkleri ile paylaşarak performans takibi yapabilmesine olanak tanır.
• Kampanyalara katılım, cashback yönetimi ve influencer yönlendirme süreçlerini entegre şekilde destekler.

👤 Kampanya Oluşturma Yetkisi
• Admin (Yönetici): Her türlü kampanyayı oluşturabilir, düzenleyebilir, onaylayabilir, silebilir, durumlarını yönetebilir.
• İşletme Hesapları: Sistemde kayıtlı bir Place (mekan) üzerinden kampanya ekleyebilir ve yönetebilir.

📌 Kampanya Temel Özellikleri
• Kampanya Bilgileri: Başlık, açıklama, kategori (örn. konaklama, restoran), alt kategori (otel, kafe vb.), etiketler (tags).
• Yer Bilgisi: Kampanya mutlaka sistemde kayıtlı bir Place ile ilişkilendirilir (placeId). Böylece adres, iletişim ve konum bilgileri Place modelinden çekilir.
• Fiyatlandırma: Orijinal ve indirimli fiyat bilgisi, opsiyonel cashback oranı.
• Geçerlilik ve Katılım: Kampanyanın geçerli olduğu tarih aralığı, maksimum katılımcı sayısı.
• Görseller: Kapak ve detaylı kampanya görselleri.
• İstatistikler: Katılım (joinCount) sayıları.
• Yorum ve Değerlendirme: Kullanıcılar kampanyalara yorum yapabilir ve yıldız bazlı değerlendirme bırakabilir. Böylece kampanya kalitesi hakkında geri bildirim sağlanır.

💡 Akıllı Öneri ve Kullanıcı Deneyimi
• Kampanyalar, kullanıcıların seyahat planı kriterlerine (lokasyon, tarih, kategori, ilgi alanları) göre filtrelenip önerilir.
• Cashback içeren kampanyalar özel simge ve etiketlerle vurgulanır.
• En çok katılım alan ve popüler kampanyalar öne çıkarılır.
• Kullanıcılar kampanya detaylarında ilgili yer bilgilerini ve kampanya avantajlarını net görebilir.

💸 Cashback ve Gelir Yönetimi
• Kampanyaya katılım sonrası CampaignParticipation kaydı oluşturulur; burada kampanya ID’si ve kazanılan cashback bilgisi yer alır.
• Katılım durumu checkedIn olduğunda, cashback miktarı kullanıcının totalCashback alanına yansıtılır.
• Influencer yönlendirmeleriyle gerçekleşen katılımlar CampaignAffiliate ve CampaignParticipation modelleriyle takip edilir.

👥 Katılım, Influencer ve Affiliate Takibi
• Kullanıcılar bir kampanyaya sadece bir kez katılabilir.
• Influencerlar kampanyaları kendilerine özel oluşturulan affiliateUrl ile paylaşır.
• Bu linklere tıklama (clickCount) ve bu yolla gerçekleşen katılımlar (joinCount) izlenir.
• Katılım influencer aracılığıyla gerçekleşmişse, bu bilgi CampaignParticipation.affiliatedById alanında saklanır.
• Influencerların kampanyalardan elde ettikleri kazançlar CampaignAffiliate.earning ve status ile yönetilir.
• CampaignAffiliate.status alanı, ödeme süreci (pending, active, expired, paid vb.) için kullanılır.

📊 Raporlama ve Performans Takibi
• Kampanyalar ve influencer bazında performans ölçümü yapılabilir:
• Kampanya görüntülenme ve katılım istatistikleri.
• Influencer bazında yönlendirme tıklama ve katılım sayıları.
• İşletmeler kampanyalarının performansını ve influencer katkılarını detaylı şekilde görebilir.

model Campaign {
  id                  String           @id @default(cuid())
  status              CampaignStatus   @default(pending) // Kampanya durumu
  placeId             String           // Kampanyanın ilişkilendirildiği mekan
  place               Place            @relation(fields: [placeId], references: [id])

  title               String           // Kampanya başlığı
  description         String           // Kampanya açıklaması
  images              String[]         // Kapak ve detay görselleri
  categoryId          String           // Kategori
  category            Category         @relation(fields: [categoryId], references: [id])
  subcategory         String?          // Alt kategori
  tags                String[]         // Etiketler

  validFrom           DateTime         // Kampanya başlangıç tarihi
  validUntil          DateTime         // Kampanya bitiş tarihi
  maxParticipants     Int?             // Maksimum katılımcı sayısı

  originalPrice       Float            // Orijinal fiyat
  discountedPrice     Float            // İndirimli fiyat
  cashbackRate        Float?           // Opsiyonel cashback oranı

  joinCount           Int              @default(0) // Katılım sayısı

  createdById         String           // Kampanyayı oluşturan kullanıcı
  createdBy           User             @relation("CampaignCreators", fields: [createdById], references: [id])

  participants        User[]           @relation("UserCampaigns", references: [id])
  appliedToTravelPlans TravelPlan[]    @relation("AppliedCampaigns")
  comments            Comment[]

  affiliates          CampaignAffiliate[]

  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
}

model CampaignAffiliate {
  id           String           @id @default(cuid())

  campaignId   String
  campaign     Campaign         @relation(fields: [campaignId], references: [id])

  influencerId String
  influencer   User             @relation(fields: [influencerId], references: [id])

  affiliateUrl String           // Influencer'a özel kampanya bağlantısı

  clickCount   Int              @default(0)   // Tıklanma sayısı
  joinCount    Int              @default(0)   // Bu linkten yapılan katılımlar

  earning      Float            @default(0.0) // Influencer'ın kazanacağı toplam tutar
  status       AffiliateStatus  @default(pending) // Ödeme durumu (pending, active, paid, vb.)
  validUntil   DateTime         // Affiliate geçerlilik süresi

  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}

model CampaignParticipation {
  id             String           @id @default(cuid())
  
  campaignId     String
  campaign       Campaign         @relation(fields: [campaignId], references: [id])
  
  userId         String
  user           User             @relation(fields: [userId], references: [id])
  
  affiliatedById String?          // Influencer aracılığıyla katılım varsa influencer ID'si
  affiliatedBy   User?            @relation("InfluencerCampaignParticipations", fields: [affiliatedById], references: [id])

  travelPlanId   String?          // Kullanıcının katılımı ilişkili seyahat planı
  travelPlan     TravelPlan?      @relation(fields: [travelPlanId], references: [id])
  
  participatedAt DateTime         @default(now())
  
  status         ParticipationStatus @default(pending) // Katılım durumu (pending, approved, checkedIn, vb.)
   
  cashbackEarned Float?           // Kullanıcının kazandığı cashback miktarı

  participantsCount Int?          // Grup katılımı için katılımcı sayısı (opsiyonel)
}