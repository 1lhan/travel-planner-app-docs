```
👤 User (Kullanıcı) Modülü

🎯 Amaç
• Kullanıcılar; seyahat planı oluşturabilir, seyahat planı satın alabilir, yorum yapabilir, içerikleri beğenip favorilerine ekleyebilir, diğer kullanıcıları takip edebilir, kampanyalara katılabilir ve belirli kampanyalar üzerinden cashback (geri ödeme) kazanabilir.
• Influencer'lar ise seyahat planlarını satışa sunarak gelir elde edebilir, ayrıca işletmelerle iş birliği yaparak kampanyaların tanıtımını gerçekleştirip ek kazanç sağlayabilir.
• İşletmeler; platform üzerinde kampanya oluşturabilir, influencer’larla iş birliği yaparak kampanyalarının tanıtımını gerçekleştirebilir ve böylece daha geniş bir kullanıcı kitlesine ulaşabilir. İş birlikleri sayesinde kampanyaların görünürlüğü artırılırken, kullanıcı etkileşimi ve katılım oranları da yükseltilir.

👤 Temel Özellikler ve Roller
• Her kullanıcıya ait temel bilgiler (ad, kullanıcı adı, email, biyografi, profil fotoğrafı, ilgi alanları) tutulur.
• Kullanıcının sistemdeki rolü (bireysel kullanıcı, işletme, influencer, admin) UserRoleApplication modeli ile başvurulu olarak belirlenebilir.
• Kullanıcılar içerik üretici (plan, yorum, kampanya, paylaşım vs.) veya tüketici (takip, beğeni, favori vs.) olabilir.

💬 Kullanıcının Etkileşimleri
• Takip (UserFollow): Kullanıcılar birbirlerini takip ederek akışlarını zenginleştirebilir.
• Favori (Favorite): Kullanıcılar place, campaign ve event gibi içerikleri favorileyerek kolay erişim sağlayabilir.
• Beğeni (Like): Yorumları beğenerek içeriklere tepkilerini gösterebilirler.
• Yorum (Comment): İçeriklere yorum yaparak katkıda bulunabilirler.
• Seyahat Planı oluşturabilir, sistemdeki diğer kullanıcıların planlarını inceleyebilir ya da satın alabilirler.

🤝 Reklam ve İş Birlikleri
• Kullanıcılar influencer ya da işletme olarak reklam iş birliği talebinde bulunabilir.
• Gönderilen iş birliği talepleri CollaborationRequest ile kayıt altına alınır.
• Onaylanan talepler CampaignAffiliate olarak ilişkilendirilir.
• Bu sayede bir kampanyanın birden fazla influencer tarafından reklamı yapılabilir.

🔍 Gelişmiş Özellikler
• Kullanıcı profillerinde; takipçi ve takip edilen sayıları, takipçi listeleri, oluşturulan plan sayısı, beğenilen içerikler ve yapılan yorumlar gibi istatistikler gösterilebilir.
• Influencerlar, gelirlerini merkezi bir panelden takip edebilir. Bu panelde; reklamını yaptıkları kampanyalar (affiliateCampaigns), sattıkları seyahat planları (travelPlanSales), toplam kazançları (totalEarnings) ve henüz ödenmemiş bekleyen tutarlar (pendingEarnings) gibi bilgiler yer alır.

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
```