📢 Kampanya Reklam ve İşbirliği Modülü

🎯 Amaç
• İşletmeler ile influencerlar arasında kampanya tanıtımı ve reklam işbirliği süreçlerini yönetir.
• Onaylanan işbirlikleri sayesinde influencerlar özel bağlantılarla kampanyaları tanıtır, katılımlar ve performans detayları takip edilir.
• Kampanyalar birden fazla influencer tarafından tanıtılabilir.

👥 Kimler Reklam/İşbirliği Talebi Oluşturabilir?
• İşletmeler: Influencerlara kampanya tanıtımı için işbirliği teklifi gönderebilir.
• Influencerlar: İşletmelere kampanya tanıtımı için işbirliği başvurusunda bulunabilir.

📝 Temel İşleyiş

1. İşbirliği Talebi (CollaborationRequest)
 • İşletme veya influencer tarafından kampanya bazlı işbirliği talebi oluşturulur.
 • Talep durumu pending, accepted veya rejected olabilir.
 • Mesaj alanında işbirliği detayları paylaşılabilir.
 • Onaylandığında CampaignAffiliate kaydı oluşturulabilir.

2. Affiliate Kayıtları (CampaignAffiliate)
 • Onaylanmış işbirlikleri bu modelde tutulur.
 • Influencerlar kendilerine özel affiliateUrl ile kampanyayı tanıtır.
 • Bu bağlantı üzerinden kampanyaya katılan kullanıcıların CampaignParticipation kayıtlarında affiliatedById ile influencer bilgisi yer alır.
 • Tıklanma (clickCount), katılım (joinCount) ve influencer kazancı (earning) izlenir.
 • Affiliate kaydı bir geçerlilik süresine (validUntil) sahiptir.

3. Kampanya Katılımları (CampaignParticipation)
 • Kullanıcıların kampanyaya katılım bilgileri bu modelde yer alır.
 • affiliatedById alanı influencer aracılığıyla yapılan katılımı belirtir.
 • Katılım durumu (status) takip edilir; örn. onay bekliyor, onaylandı, check-in yapıldı vb.
 • Cashback kazanımı ve grup katılımı detayları tutulur.

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
