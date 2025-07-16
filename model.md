```prisma
model User {
  id             String   @id @default(cuid())
  fullName       String
  email          String   @unique
  phoneNumber    String?
  password       String
  role           UserRole @default(user)

  birthdate      DateTime?
  gender         String?
  city           String?
  interests      Interest[]

  travelPlans            TravelPlan[]                  @relation("UserTravelPlans")
  campaignParticipations UserCampaignParticipation[]   @relation("UserCampaignParticipations")
  reviews                Review[]                      @relation("UserReviews")
  cashbackTransactions   CashbackTransaction[]         @relation("UserCashbackTransactions")
  earnedCoins            Coin[]                        @relation("UserCoins")
  coinPurchases          CoinPurchase[]                @relation("UserCoinPurchases")
  createdCampaigns       Campaign[]                    @relation("CampaignCreators")

  totalCoin      Float                @default(0)
  totalCashback  Float                @default(0)

  createdAt      DateTime             @default(now())
  updatedAt      DateTime             @updatedAt
  deletedAt      DateTime?
}

// Kullanıcıların hesaplarını işletme hesabına dönüştürmek için yaptıkları başvuruları temsil eden model
model BusinessApplication {
  id         String   @id @default(cuid())
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  status     ApplicationStatus @default(Pending) // Pending, Approved, Rejected
  appliedAt  DateTime @default(now())
  reviewedAt DateTime?
}

model TravelPlan {
  id                 String     @id @default(cuid())
  userId             String
  user               User       @relation("UserTravelPlans", fields: [userId], references: [id])

  title              String
  isPublic           Boolean    @default(false)
  minBudget          Float?
  maxBudget          Float
  departureDate      DateTime
  returnDate         DateTime
  departureTransport Transport
  returnTransport    Transport
  interests          Interest[]
  accommodationType  Accommodation

  appliedCampaigns   Campaign[]  @relation("AppliedCampaigns")
  recommendations    Json?
  reviews            Review[]    @relation("TravelPlanReviews")

  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt
}

model Campaign {
  id                  String   @id @default(cuid())
  title               String
  description         String
  validFrom           DateTime
  validUntil          DateTime
  maxParticipants     Int
  category            Interest
  originalPrice       Float
  discountedPrice     Float
  imageUrl            String
  city                String
  district            String
  mapUrl              String
  isActive            Boolean  @default(true)
  isCashbackCampaign  Boolean  @default(false)
  cashbackRate        Float?

  createdById         String
  createdBy           User     @relation("CampaignCreators", fields: [createdById], references: [id])

  participants          UserCampaignParticipation[]    @relation("UserCampaignParticipations")
  appliedToTravelPlans  TravelPlan[]                   @relation("AppliedCampaigns")

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model UserCampaignParticipation {
  id           String           @id @default(cuid())
  userId       String
  user         User             @relation("UserCampaignParticipations", fields: [userId], references: [id])
  campaignId   String
  campaign     Campaign         @relation("UserCampaignParticipations", fields: [campaignId], references: [id])
  joinedAt     DateTime         @default(now())
  usedCashback Float?

  @@unique([userId, campaignId])
}

model CashbackTransaction {
  id            String           @id @default(cuid())
  userId        String
  campaignId    String           // type: Earned ise hangi kampanyadan kazanıldığı, Refund ise hangi kampanyadan iade yapıldığı anlamına gelir
  amount        Float            // Pozitif: kazanma, negatif: kullanım veya iade
  type          TransactionType  // Earned, Used, Refund
  status        CashbackStatus?  // Onay durumu (örn. pending, confirmed)
  transactionAt DateTime         @default(now())

  user          User             @relation("UserCashbackTransactions", fields: [userId], references: [id])
  campaign      Campaign?        @relation(fields: [campaignId], references: [id])
}

model Coin {
  id          String    @id @default(cuid())
  userId      String
  user        User      @relation("UserCoins", fields: [userId], references: [id])

  amount      Int
  source      CoinSource
  taskId      String?
  task        Task?     @relation(fields: [taskId], references: [id])

  earnedAt    DateTime  @default(now())
}

model CoinProduct {
  id           String   @id @default(cuid())
  title        String
  description  String
  imageUrl     String
  coinPrice    Int
  stock        Int
  isActive     Boolean  @default(true)

  purchases    CoinPurchase[]  @relation("ProductPurchases")
  createdAt    DateTime        @default(now())
  updatedAt    DateTime        @updatedAt
}

model CoinPurchase {
  id            String       @id @default(cuid())
  userId        String
  user          User         @relation("UserCoinPurchases", fields: [userId], references: [id])

  productId     String
  product       CoinProduct  @relation("ProductPurchases", fields: [productId], references: [id])

  coinAmount    Int
  purchasedAt   DateTime     @default(now())
}

model Review {
  id             String      @id @default(cuid())
  userId         String
  user           User        @relation("UserReviews", fields: [userId], references: [id])

  travelPlanId   String
  travelPlan     TravelPlan  @relation("TravelPlanReviews", fields: [travelPlanId], references: [id])

  rating         Int
  comment        String?
  createdAt      DateTime    @default(now())
  updatedAt      DateTime    @updatedAt
}

enum Transport {
  Bus
  Plane
  Train
  Car
}

enum Interest {
  Nature
  Museum
  Nightlife
  History
  Events
  Shopping
  Beach
  Food
}

enum Accommodation {
  Hotel
  Hostel
  Airbnb
  Camp
  Other
}

enum TransactionType {
  Earned
  Used
  Refund
}

enum CashbackStatus {
  Pending       // Kullanıcı cashback hak etti, ama henüz onaylanmadı (örneğin kampanya süresi dolmadı veya onay bekleniyor)
  Confirmed     // Cashback onaylandı, kullanıcı bu tutarı artık harcayabilir
}

enum UserRole {
  User
  Admin
  BusinessOwner
}

enum ApplicationStatus {
  Pending
  Approved
  Rejected
}

enum CoinSource {
  TaskCompletion        // Görev tamamlayarak coin kazanma
  CampaignParticipation // Kampanyaya katılım sonucu coin kazanma
  ServicePurchase       // Hizmet/ürün satın alımına özel coin kazanma
  ReviewWriting         // Yorum yaparak coin kazanma
  InviteFriend          // Arkadaş daveti gibi sosyal aksiyonlar
  Bonus                 // Özel kampanya / hediye coini
}

model Task {

}

```