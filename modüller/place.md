```
📍 Place (Mekan) Modülü

🎯 Amaç
• Place Modülü, sistemdeki tüm fiziksel mekanların merkezi olarak tanımlandığı yapıdır. Seyahat planı oluşturma, öneri sunma, kampanya bağlama ve kullanıcı etkileşimi gibi birçok modül için temel veri kaynağıdır.

📌 Kapsam
• Konaklama Mekanları: Otel, hostel, pansiyon, kamp ve karavan alanları, bungalov
• Gezilecek Yerler: Yeme-İçme Mekanları, Doğal alan, müze vb.

🔍 Kullanım Senaryoları
• Seyahat planı oluşturulurken, belirli konaklama tiplerine uygun yerler ve gezilecek mekanlar bu model üzerinden önerilir.
• Her kampanya bir Place ile ilişkilendirilir ve kampanyanın lokasyon bilgisi bu modelden alınır.
• Kullanıcılar favorilerine ekleyebilir, yorum yapabilir, değerlendirebilir.
• Gezilecek yerler listesi ve konaklama sayfalarının temel veri kaynağı olarak kullanılır.

🗂️ Veri Kaynakları
• Google Places API:
    • Ana veri kaynağıdır.
    • Restoran, otel, park, müze gibi kategorilerde yerler alınabilir.
    • Google Place ID ile eşleştirme yapılır.
    • Açıklama, e-posta ve telefon gibi bilgiler sınırlı olabilir.
• iOverlander:
    • Kamp ve karavan parkı verileri JSON/CSV olarak entegre edilebilir.

📊 Veri Kalitesi ve Yönetim
• Sisteme mekan (Place) kaydı iki farklı yolla yapılabilir:

1. 🔄 Dinamik API Entegrasyonları (Otomatik Kayıt)
    • Google Places API, iOverlander gibi kaynaklardan belirli aralıklarla veri çekilerek sistemde dinamik olarak mekan kaydı yapılır.
    • Bu veriler konum, kategori, başlık, görsel gibi alanlarla otomatik olarak oluşturulur.
    • Periyodik veri senkronizasyonları ile güncellik sağlanır.
    • Duplikasyon ve eksik veri kontrolü sistem tarafından yapılır.

2. 📝 Manuel Girişler (İşletme Bazlı)
    • Yalnızca işletme sahipleri, sistemde bulunmayan bir mekan üzerinden kampanya oluşturmak istediklerinde manuel mekan kaydı yapabilir.
    • Bu mekanlar taslak statüsünde sisteme alınır ve yalnızca admin onayı sonrasında yayına alınır.
    • Onay sürecinde; içerik bütünlüğü, kategori doğruluğu, konum bilgisi ve varsa kampanya ilişkisi titizlikle kontrol edilir.

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
```