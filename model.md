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

  travelPlans    TravelPlan[]         @relation("UserTravelPlans")
  campaigns      Campaign[]           @relation("CampaignParticipants")
  reviews        Review[]             @relation("UserReviews")
  cashbacks      Cashback[]           @relation("UserCashbacks")
  cashbackUsages CashbackUsage[]      @relation("UserCashbackUsages")
  earnedCoins    Coin[]               @relation("UserCoins")
  coinPurchases  CoinPurchase[]       @relation("UserCoinPurchases")
  createdCampaigns Campaign[]         @relation("CampaignCreators")

  totalCoin      Float                @default(0)
  totalCashback  Float                @default(0)

  createdAt      DateTime             @default(now())
  updatedAt      DateTime             @updatedAt
  deletedAt      DateTime?
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
  category            Category
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

  participants          User[]       @relation("CampaignParticipants")
  appliedToTravelPlans  TravelPlan[] @relation("AppliedCampaigns")
  cashbacks             Cashback[]   @relation("CampaignCashbacks")

  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
}

model Cashback {
  id             String   @id @default(cuid())
  userId         String
  user           User     @relation("UserCashbacks", fields: [userId], references: [id])

  campaignId     String
  campaign       Campaign @relation("CampaignCashbacks", fields: [campaignId], references: [id])

  amount         Float
  status         CashbackStatus @default(pending)
  earnedAt       DateTime @default(now())
}

model CashbackUsage {
  id           String   @id @default(cuid())
  userId       String
  user         User     @relation("UserCashbackUsages", fields: [userId], references: [id])

  amount       Float
  usedAt       DateTime @default(now())
}

model Coin {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation("UserCoins", fields: [userId], references: [id])

  amount      Int
  source      CoinSource
  taskId      String?
  task        Task?    @relation(fields: [taskId], references: [id])

  earnedAt    DateTime @default(now())
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
  id            String      @id @default(cuid())
  userId        String
  user          User        @relation("UserCoinPurchases", fields: [userId], references: [id])

  productId     String
  product       CoinProduct @relation("ProductPurchases", fields: [productId], references: [id])

  coinAmount    Int
  purchasedAt   DateTime    @default(now())
}

model Review {
  id             String     @id @default(cuid())
  userId         String
  user           User       @relation("UserReviews", fields: [userId], references: [id])

  travelPlanId   String
  travelPlan     TravelPlan @relation("TravelPlanReviews", fields: [travelPlanId], references: [id])

  rating         Int
  comment        String?
  createdAt      DateTime   @default(now())
  updatedAt      DateTime   @updatedAt
}

model Task {

}

enum Transport {
  bus
  plane
  train
  car
}

enum Interest {
 nature
 museum
 nightlife
 history
 events
 shopping
 beach
 food
}

enum Category {
  travel
  accommodation
  food
  entertainment
  shopping
  wellness
}

enum Accommodation {
  hotel
  hostel
  airbnb
  camp
  other
}

enum UserRole {
  user
  admin
  businessOwner
}

// Bu değerler değiştirilebilir
enum CoinSource {
  TASK_COMPLETION         // Görev tamamlayarak coin kazanma
  CAMPAIGN_PARTICIPATION  // Kampanyaya katılım sonucu coin kazanma
  SERVICE_PURCHASE        // Hizmet/ürün satın alımına özel coin kazanma
  REVIEW_WRITING          // Yorum yaparak coin kazanma
  INVITE_FRIEND           // Arkadaş daveti gibi sosyal aksiyonlar
  BONUS                   // Özel kampanya / hediye coini
}
```
