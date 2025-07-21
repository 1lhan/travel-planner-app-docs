```
model User {
  id                String      @id @default(cuid())
  email             String      @unique
  password          String
  name              String
  username          String?     @unique
  bio               String?
  profileImageUrl   String?

  roles             UserRole[]

  totalCashback     Float       @default(0.0)

  campaignParticipations  CampaignParticipation[]
  travelPlans             TravelPlan[]             @relation("UserTravelPlans")
  createdCampaigns        Campaign[]               @relation("CampaignCreators")
  affiliateCampaigns      CampaignAffiliate[]      @relation("influencer")
  reviews                 Review[]

  roleApplications      UserRoleApplication[]
  reviewedApplications  UserRoleApplication[] @relation("RoleApplicationReviewer")

  createdAt         DateTime     @default(now())
  updatedAt         DateTime     @updatedAt
}

enum UserRole {
  admin
  business
  user
  influencer
  partner (?)
}

model UserRoleApplication {
  id            String       @id @default(cuid())
  
  userId        String
  user          User         @relation(fields: [userId], references: [id])

  requestedRole UserRole
  status        ApplicationStatus @default(pending)

  explanation   String?      // Kullanıcının sunduğu açıklama, neden bu role başvurduğu
  documents     String[]     // Dosya/döküman linkleri (örn. işletme belgesi, sosyal medya profili vb.)

  responseMessage String?    // Admin'in kullanıcıya verdiği geri bildirim (örn: "Instagram hesabınız eksik görünüyor.")

  reviewedById  String?      
  reviewedBy    User?        @relation("RoleApplicationReviewer", fields: [reviewedById], references: [id])
  
  reviewedAt    DateTime?
  createdAt     DateTime     @default(now())
  updatedAt     DateTime     @updatedAt
}

enum ApplicationStatus {
  pending     // İnceleniyor
  approved    // Onaylandı, rol kullanıcıya eklendi
  rejected    // Reddedildi
}

model Category {
  id             String   @id @default(cuid())
  name           String   @unique
  subcategories  String[]
}

model Place {
  id              String   @id @default(cuid())
  googlePlaceId   String?  @unique
  status          PlaceStatus @default(pending)
  name            String
  description     String?
  images          String[]

  categoryId      String     // Örn: accommodation, restaurant, park, museum
  category        Category   @relation(fields: [categoryId], references: [id])
  subcategory     String?    // Örn: hotel, cafe
  tags            String[]   // Örn: family_friendly, natural, pet_friendly

  country         String
  city            String
  district        String?
  address         String?
  location        Json
  phone           String?
  website         String?
  contactEmail    String?
  openingHours    Json?

  googleRating    Float?
  rating          Float?
  reviews         Review[]

  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
}

enum PlaceStatus {
  pending      // Kullanıcı tarafından eklendi, admin onayı bekliyor
  approved     // Yayında ve önerilere dahil edilebilir
  rejected     // Reddedildi, sistemde pasif tutulur
  inactive     // Admin tarafından geçici olarak yayından kaldırıldı
}

model Campaign {
  id                  String           @id @default(cuid())
  status              CampaignStatus   @default(Pending)
  placeId             String
  place               Place            @relation(fields: [placeId], references: [id])

  title               String
  description         String
  images              String[]         // Kapak ve diğer resimler
  categoryId          String
  category            Category         @relation(fields: [categoryId], references: [id])
  subcategory         String?          // Örn: hotel, cafe 
  tags                String[]

  validFrom           DateTime
  validUntil          DateTime
  maxParticipants     Int?

  originalPrice       Float
  discountedPrice     Float
  cashbackRate        Float?           // %10 cashback gibi

  viewCount           Int              @default(0)
  joinCount           Int              @default(0)

  createdById         String
  createdBy           User             @relation("CampaignCreators", fields: [createdById], references: [id])

  participants        User[]           @relation("UserCampaigns", references: [id])
  appliedToTravelPlans TravelPlan[]    @relation("AppliedCampaigns")
  reviews             Review[]

  createdAt           DateTime         @default(now())
  updatedAt           DateTime         @updatedAt
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

model CampaignAffiliate {
  id           String   @id @default(cuid())
  campaignId   String
  campaign     Campaign @relation(fields: [campaignId], references: [id])

  influencerId String
  influencer   User     @relation(fields: [influencerId], references: [id])

  affiliateUrl String   // Influencer'a özel kampanya linki

  clickCount   Int      @default(0)   // Linke kaç kere tıklanmış
  joinCount    Int      @default(0)   // Bu linkten kaç kişi kampanyaya katılmış

  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model CampaignParticipation {
  id             String    @id @default(cuid())
  
  campaignId     String
  campaign       Campaign  @relation(fields: [campaignId], references: [id])
  
  userId         String
  user           User      @relation(fields: [userId], references: [id])
  
  affiliatedById String?    // Katılım influencer linkinden geldiyse o influencer userId'si
  affiliatedBy   User?      @relation("InfluencerCampaignParticipations", fields: [affiliatedById], references: [id])
  
  participatedAt DateTime   @default(now())
  
  status         ParticipationStatus @default(Pending)  // Katılım durumu
   
  cashbackEarned Float?    // Bu katılımdan kazanılan cashback miktarı
}

enum ParticipationStatus {
  pending        // Katılım talebi alındı, onay bekleniyor (örneğin admin veya influencer onayı)
  approved       // Katılım onaylandı, aktif durumda
  checkedIn      // Kullanıcı kampanyaya check-in yaptı (katılım gerçekleşti)
  cancelled      // Kullanıcı katılımını iptal etti veya kampanya iptal oldu
  rejected       // Katılım reddedildi (örneğin onaylanmadı)
}

model TravelPlan {
  id                 String     @id @default(cuid())
  userId             String
  user               User       @relation("UserTravelPlans", fields: [userId], references: [id])

  title              String
  isPublic           Boolean    @default(false)
  minBudget          Float?
  maxBudget          Float?

  travelSteps        Json       // Her adım: lokasyon, tarih, ulaşım, süre, maliyet ve konaklama tercihi içerir

  interests          Category[]

  appliedCampaigns   Campaign[] @relation("AppliedCampaigns")
  recommendations    Json       // Place ve etkinlik önerileri (ör: places[], events[])
  reviews            Review[]

  createdAt          DateTime   @default(now())
  updatedAt          DateTime   @updatedAt
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

recommendations: {
  "places": [
    { "id": "place1", "name": "Müze", "category": "museum" },
    { "id": "place2", "name": "Kafe", "category": "cafe" }
  ],
  "events": [
    { "id": "event1", "name": "Rock Festivali", "type": "concert", "date": "2025-08-12" },
    { "id": "event2", "name": "Yaz Karnavalı", "type": "festival", "date": "2025-08-14" }
  ]
}

model Review {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])

  targetId   String   // TravelPlan, Place veya Campaign ID'si
  targetType ReviewTargetType

  rating     Int
  comment    String?

  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

enum ReviewTargetType {
  travel_plan
  place
  campaign
}
```