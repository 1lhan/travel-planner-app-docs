model User {
  id                String   @id @default(cuid())
  email             String   @unique                   // Giriş için kullanılan e-posta adresi
  password          String
  name              String
  username          String?  @unique
  bio               String?
  profileImageUrl   String?
  interests         Category[]                         // Kullanıcının ilgi alanları (kategorilerle ilişki)

  roles             UserRole[]                         // Kullanıcının sistemdeki rolleri (admin, influencer, business, user)

  totalCashback     Float    @default(0.0)             // Kullanıcının bugüne kadar kazandığı toplam cashback

  followerCount     Int @default(0)                    // Takipçi sayısı
  followingCount    Int @default(0)                    // Takip edilen kişi sayısı
  followedBy        UserFollow[] @relation("FollowingRelation") // Bu kullanıcıyı takip edenler
  following         UserFollow[] @relation("FollowerRelation")  // Bu kullanıcının takip ettikleri

  favorites         Favorite[]                         // Kullanıcının favoriye eklediği içerikler
  comments          Comment[]                          // Kullanıcının yaptığı tüm yorumlar
  likes             Like[]                             // Kullanıcının yaptığı tüm beğeniler

  travelPlans       TravelPlan[]             @relation("UserTravelPlans")          // Kullanıcının oluşturduğu seyahat planları
  travelPlanPurchases TravelPlanPurchase[]   @relation("PurchasedTravelPlans")     // Kullanıcının satın aldığı seyahat planları
  travelPlanSales   TravelPlanPurchase[]     @relation("CreatorOfPurchasedPlans")  // Bu kullanıcının oluşturduğu ve satılan seyahat planları

  campaignParticipations  CampaignParticipation[]                     // Kullanıcının katıldığı kampanyalar
  createdCampaigns        Campaign[] @relation("CampaignCreators")    // Kullanıcının oluşturduğu kampanyalar (işletme hesabı ise)
  affiliateCampaigns      CampaignAffiliate[] @relation("influencer") // Influencer olarak yürüttüğü affiliate kampanyalar

  collabRequestsSent     CollaborationRequest[] @relation("CollabSender")    // Gönderilen iş birliği istekleri
  collabRequestsReceived CollaborationRequest[] @relation("CollabReceiver")  // Alınan iş birliği istekleri

  totalEarnings        Float    @default(0.0)          // Kullanıcının toplam geliri (plan + reklam)
  pendingEarnings      Float    @default(0.0)          // Henüz ödenmemiş kazanç

  roleApplications      UserRoleApplication[]                                       // Kullanıcının yaptığı rol başvuruları
  reviewedApplications  UserRoleApplication[] @relation("RoleApplicationReviewer")  // Kullanıcının incelediği başvurular (admin için)

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

model UserFollow {
  id         String   @id @default(cuid())
  followerId String
  follower   User     @relation("FollowerRelation", fields: [followerId], references: [id])

  followingId String
  following   User     @relation("FollowingRelation", fields: [followingId], references: [id])

  createdAt  DateTime @default(now())

  @@unique([followerId, followingId])
}

model Favorite {
  id         String   @id @default(cuid())  // Favori kaydı ID’si
  userId     String                         // Favoriyi ekleyen kullanıcı ID’si
  user       User     @relation(fields: [userId], references: [id]) // Kullanıcı ilişkisi

  targetId   String                         // Favori edilen içerik ID'si (Place, Campaign veya Event)
  targetType FavoriteTargetType             // İçerik tipi: place, campaign, event

  createdAt  DateTime @default(now())       // Favori eklenme tarihi

  @@unique([userId, targetId, targetType])  // Aynı kullanıcı, aynı içeriği tekrar favorileyemez
}

model Comment {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])

  targetId   String                                 // Yorumun ait olduğu içeriğin ID’si
  targetType CommentTargetType                      // İçerik türü: place, travel_plan, campaign

  content    String?                                // Yorum metni (max 2000 karakter)
  rating     Int?                                   // 1–5 arası puan (opsiyonel)

  imageUrls  String[]                               // Opsiyonel, max 5 görsel URL'si
  videoUrl   String?                                // Opsiyonel, tek video URL'si

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  parentId   String?                                // Eğer başka bir yoruma cevapsa onun ID’si
  parent     Comment?  @relation("CommentReplies", fields: [parentId], references: [id])
  replies    Comment[] @relation("CommentReplies")  // Alt yorumlar
}

model Like {
  id          String         @id @default(cuid())
  userId      String
  user        User           @relation(fields: [userId], references: [id])

  targetId    String                          // Beğenilen içeriğin ID'si
  targetType  LikeTargetType                  // Beğenilen içeriğin tipi (örn. comment)

  createdAt   DateTime       @default(now())

  @@unique([userId, targetId, targetType])    // Aynı kullanıcı aynı içeriği yalnızca bir kez beğenebilir
}

model UserRoleApplication {
  id            String       @id @default(cuid())
  
  userId        String
  user          User         @relation(fields: [userId], references: [id])

  requestedRole UserRole     // admin, business, user, influencer
  status        ApplicationStatus @default(pending)  // pending, approved, rejected

  applicationContent String   // Başvuru metni (neden, sosyal medya vs.)

  uploadedDocuments  String[]?  // Dosya URL’leri (ör: ["https://s3.../doc1.pdf", "https://s3.../doc2.pdf"])

  responseMessage String?    // Admin'in kullanıcıya verdiği geri bildirim (örn: "Instagram hesabınız eksik görünüyor.")

  reviewedById  String?      
  reviewedBy    User?        @relation("RoleApplicationReviewer", fields: [reviewedById], references: [id])
  reviewedAt    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

model Place {
  id              String   @id @default(cuid())  // Sistem içi benzersiz mekan ID’si
  googlePlaceId   String?  @unique               // Google Places ile eşleşme için ID
  status          PlaceStatus @default(pending)  // Kayıt durumu: pending, approved, rejected, inactive
  name            String                         // Mekan adı
  description     String?                        // Mekan açıklaması
  images          String[]                       // Görsellerin URL listesi

  categoryId      String                         // Ana kategori ID (örn: accommodation, park)
  category        Category   @relation(fields: [categoryId], references: [id]) // Kategori ilişkisi
  subcategory     String?                        // Alt kategori (örn: hotel, cafe)
  tags            String[]                       // Filtreleme/öneri için etiketler (örn: pet_friendly)

  country         String                         // Ülke
  city            String                         // Şehir
  district        String                         // İlçe
  address         String                         // Açık adres
  location        Json                           // Konum koordinatları (lat, lng)
  phone           String?                        // Telefon numarası
  website         String?                        // Web sitesi
  contactEmail    String?                        // E-posta adresi
  openingHours    Json?                          // Açılış saatleri (haftalık)

  googleRating    Float?                         // Google'dan gelen puan
  rating          Float?                         // Kullanıcılar tarafından verilen ortalama puan
  comments        Comment[]                      // Kullanıcı yorumları ilişkisi

  createdAt       DateTime @default(now())       // Oluşturulma zamanı
  updatedAt       DateTime @updatedAt            // Son güncelleme zamanı
}

model Category {
  id             String   @id @default(cuid())
  name           String   @unique
  subcategories  String[]
}

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
  comments             Comment[]

  affiliates          CampaignAffiliate[]

  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
}

model CampaignAffiliate {
  id           String           @id @default(cuid())

  campaignId   String                                                        // İlişkili kampanya ID'si
  campaign     Campaign         @relation(fields: [campaignId], references: [id])

  influencerId String                                                        // Influencer kullanıcı ID'si
  influencer   User             @relation(fields: [influencerId], references: [id])

  affiliateUrl String           // Influencer'a özel kampanya bağlantısı

  clickCount   Int              @default(0)                                  // Bu linke yapılan tıklama sayısı
  joinCount    Int              @default(0)                                  // Bu link üzerinden kampanyaya katılım sayısı

  earning      Float            @default(0.0)                                // Influencer'ın kazandığı toplam gelir
  status       AffiliateStatus  @default(pending)                            // Affiliate durumu (pending, active, paid, vb.)
  validUntil   DateTime         // Affiliate bağlantısının geçerlilik süresi

  createdAt    DateTime         @default(now())
  updatedAt    DateTime         @updatedAt
}

model CampaignParticipation {
  id             String           @id @default(cuid())
  
  campaignId     String                                                       // Kampanya ID'si
  campaign       Campaign         @relation(fields: [campaignId], references: [id])
  
  userId         String                                                       // Katılan kullanıcı ID'si
  user           User             @relation(fields: [userId], references: [id])
  
  affiliatedById String?                                                      // Influencer aracılığıyla katılım varsa influencer ID'si (opsiyonel)
  affiliatedBy   User?            @relation("InfluencerCampaignParticipations", fields: [affiliatedById], references: [id])

  travelPlanId   String?                                                      // Katılımın bağlı olduğu seyahat planı ID'si (opsiyonel)
  travelPlan     TravelPlan?      @relation(fields: [travelPlanId], references: [id])
  
  participatedAt DateTime         @default(now())                             // Katılım tarihi
  
  status         ParticipationStatus @default(pending)                        // Katılım durumu (pending, approved, checkedIn, vb.)
   
  cashbackEarned Float?           // Kullanıcının kazandığı cashback miktarı (opsiyonel)

  participantsCount Int?          // Grup katılımı için katılımcı sayısı (opsiyonel)
}

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

model CollaborationRequest {
  id             String   @id @default(cuid())

  senderId       String                                                     // Teklifi gönderen kullanıcı ID'si
  sender         User     @relation("CollabSender", fields: [senderId], references: [id])

  receiverId     String                                                     // Teklifi alan kullanıcı ID'si
  receiver       User     @relation("CollabReceiver", fields: [receiverId], references: [id])

  campaignId     String                                                     // İlgili kampanya ID'si
  campaign       Campaign @relation(fields: [campaignId], references: [id])

  message        String?                                                    // İşbirliği mesajı (opsiyonel)
  response       String?                                                    // İşbirliği talebine verilen yazılı yanıt, açıklama veya not
  status         CollaborationStatus @default(pending)                      // Talep durumu (pending, accepted, rejected)

  createdAt      DateTime @default(now())
  respondedAt    DateTime?
}

enum UserRole {
  admin
  business
  user
  influencer
}

enum FavoriteTargetType {
  place
  campaign
  event
}

enum CommentTargetType {
  place
  travel_plan
  campaign
  //post
}

enum LikeTargetType {
  //post
  comment
}

enum ApplicationStatus {
  pending     // İnceleniyor
  approved    // Onaylandı, rol kullanıcıya eklendi
  rejected    // Reddedildi
}

enum PlaceStatus {
  pending      // Kullanıcı tarafından eklendi, admin onayı bekliyor
  approved     // Yayında ve önerilere dahil edilebilir
  rejected     // Reddedildi, sistemde pasif tutulur
  inactive     // Admin tarafından geçici olarak yayından kaldırıldı
}

enum CampaignStatus {
  pending     // İşletme oluşturdu, admin onayı bekliyor
  approved    // Admin onayı aldı ama henüz aktif değil (yayın tarihi gelmedi veya manuel aktif edilmedi)
  active      // Yayında ve katılıma açık
  full        // Katılımcı limiti doldu, artık katılım alınmıyor
  expired     // Kampanyanın süresi doldu (validUntil geçti)
  inactive    // Manuel olarak yayından kaldırıldı (geçici)
  rejected    // Admin tarafından reddedildi
  archived    // Kalıcı olarak arşivlendi (admin veya işletme tarafından)
  cancelled   // Kampanya yayında iken iptal edildi (örneğin etkinlik iptali)
}

enum AffiliateStatus {
  pending       // Süreç başladı, henüz ödeme yapılmadı
  active        // Şu anda aktif olarak kullanıcı yönlendirebiliyor
  expired       // Süresi doldu, sistemde pasif ama ödeme yapılmadı
  paid          // Ödeme başarıyla yapıldı
  rejected      // İşbirliği iptal edildi ya da geçersiz sayıldı (örneğin spam tespit)
  cancelled     // Influencer ya da işletme tarafından manuel iptal edildi
  disputed      // Ödeme ya da kazanç ile ilgili itiraz süreci var
}

enum ParticipationStatus {
  pending        // Katılım talebi alındı, onay bekleniyor (örneğin admin veya influencer onayı)
  approved       // Katılım onaylandı, aktif durumda
  checkedIn      // Kullanıcı kampanyaya check-in yaptı (katılım gerçekleşti)
  cancelled      // Kullanıcı katılımını iptal etti veya kampanya iptal oldu
  rejected       // Katılım reddedildi (örneğin onaylanmadı)
}

enum TravelPlanEarningStatus {
  pending      // Henüz ödeme yapılmadı
  paid         // Kazanç gönderildi
  disputed     // Kullanıcı bir itirazda bulundu
  cancelled    // İade vb. durum
}

enum CollaborationStatus {
  pending
  accepted
  rejected
}