```
📁 Hesabım Sayfası
├── 👤 Profil Bilgilerim
│   ├── Ad Soyad
│   ├── E-posta
│   ├── Şehir
│   ├── İlgi Alanları
│   ├── Şifre Değiştir
│   ├── Cinsiyet
│   └── Şehir

├── 📅 Seyahat Planlarım
│   ├── 📍 Plan
│   │   ├── Plan ID
│   │   ├── Plan Adı
│   │   ├── Plan Oluşturulması Tarihi
│   │   ├── [Görüntüle]
│   │   ├── [Sil]
│   └── [+ Yeni Seyahat Planı Oluştur]

├── 💬 Değerlendirmelerim
│   ├── Seyahat Plan ID
│   ├── Seyahat Plan Adı
│   ├── Puan (⭐️ 1–5)
│   ├── Yorum
│   ├── Tarih
│   ├── [Düzenle]
│   └── [Sil]

(
Bu sayfada, toplam cashback bakiyesi, cashbacklerin harcama geçmişi ve kullanıcının katıldığı kampanyalar iki şekilde gösterilecektir:
Cashback kazanılan kampanyalar:
Kullanıcının User modelindeki cashbacks ilişkisi üzerinden erişilen cashback verileri ve bu kayıtlardaki campaignId referansıyla ilişkili kampanyalar gösterilir. Bu bölümde, kampanyaya ait bilgilerle birlikte kazanılan cashback tutarı da yer alır.
Cashback kazanılmayan kampanyalar:
Kullanıcının katıldığı diğer kampanyalar (Campaigns ilişkisi) içinden, cashbacks ilişkisindeki campaignId değerleriyle eşleşmeyen kampanyalar filtrelenerek listelenir.
)
├── 🎁 Katıldığım Kampanyalar
│   ├── Kampanya ID
│   ├── Kampanya Başlığı
│   ├── Katılım Tarihi
│   ├── Şehir - İlçe
│   ├── Kategori
│   ├── Cashback Tutarı
│   ├── Kullanılan Cashback
│   ├── Kalan Cashback
│   ├── Cashback Durumu (status: pending, confirmed, partiallyUsed, used)
│   ├── [Çık] (date.now() > kampanya bitiş tarihi ise bu butonun olmaması lazım)
│   └── [Görüntüle]

(Bu sayfa, rolü firma sahibi olan kullanıcılarda olacak sadece)
├── 🎁 Kampanyalarım
│   ├── 📍 Kampanya
│   │   ├── Kampanya ID
│   │   ├── Kampanya Başlığı
│   │   ├── Başlangıç - Bitiş Tarihi
│   │   ├── Katılımcı Sayısı
│   │   ├── Max Katılımcı Sayısı
│   │   ├── Görüntülenme Sayısı (?)
│   │   ├── [Detayları Görüntüle]
│   │   ├── [Düzenle] 
│   │   ├── [Sil]
│   └── [+ Yeni Kampanya Oluştur]

├── 🚪 Oturumu Kapat (Logout)
```