```
🗺️ Seyahat Planlama Modülü

🎯 Amaç

Seyahat Planlama Modülü, kullanıcıların kendi tercihlerine göre özelleştirilmiş seyahat planları oluşturmasını sağlar.
Sistem, kullanıcıdan alınan temel girdilere dayanarak akıllı öneriler üretir ve bu plana uygun kampanyaları eşleştirir.
Planlar diğer kullanıcılarla paylaşılabilir ve yapay zeka desteğiyle sürekli geliştirilebilir.

👤 Kullanıcıdan Alınan Girdiler

• Tarih Aralığı: Gidiş ve dönüş tarihleri (departureDate, returnDate)
• Bütçe Limiti (opsiyonel): Minimum ve maksimum bütçe (minBudget, maxBudget)
• Ulaşım Tercihleri (opsiyonel): Uçak, otobüs, tren, özel araç, karavan
• Konaklama Tercihi (opsiyonel): Otel, hostel, Airbnb, kamp alanı, karavan parkı vb.
• İlgi Alanları: Tarih, doğa, gurme, müze, alışveriş, gece hayatı vb. kategoriler
• Lokasyon:
    • departureLocation: Seyahatin başladığı şehir
    • arrivalLocation: Gidilmek istenen şehir

🧠 Modül İşleyişi

1. Plan Oluşturma
    • Kullanıcı yukarıdaki girdileri verir
    • Sistem bu bilgiler doğrultusunda ulaşım, konaklama, gezilecek yer (Place) ve etkinlik alternatiflerini listeler.

2. Yapay Zeka Destekli Öneriler
    • İlgi alanı, bütçe (opsiyonel), gidilecek yer, tarih aralığı ve konaklama tercihine (opsiyonel) göre
    konaklama (AccommodationPlace modeli üzerinden) seçenekleri sunulur.
    • Bütçe (opsiyonel), tarih aralığı, gidilecek yer ve ulaşım tercihine (opsiyonel) göre gidiş ve dönüş için ulaşım seçenekleri sunulur.
    • İlgi alanı, bütçe (opsiyonel), gidilecek yer ve tarih aralığına göre yer önerileri sunulur (Place modeli üzerinden).
    • İlgi alanı, bütçe (opsiyonel), gidilecek yer ve tarih aralığına göre etkinlikler sunulur.
    • Yer, konaklama ve varsa etkinlik listelerinde öncelikli olarak kampanyalı seçenekler sunulur.
    • Cashback içeren kampanyalar özel olarak etiketlenir.
    • Kampanya dışı sonuçlar; popülerlik, değerlendirme puanı ve fiyat gibi kriterlere göre sıralanabilir.

3. Manel Yer Ekleme
    • Kullanıcı dilerse sistemde bulunmayan özel bir yeri plana manuel olarak ekleyebilir.
    
4. Özellikler
    • Yerler, konaklama ve ulaşım seçeneklerine sıralama işlemi (fiyat, en çok tercih edilen, google değerlendirme puanı)
    uygulanabilecek.

5. Aktivite Takvimi
    • Kullanıcı önerilen veya kendi eklediği yerleri günlük takvime yerleştirerek seyahatini planlar.

6. Paylaşım ve Yönetim
    • Plan isPublic olarak işaretlenirse toplulukla paylaşılır. (default=private)
    • Her kullanıcı "Hesabım" sayfasında kendi planlarını listeleyebilir, düzenleyebilir, silebilir.
    • Influencer kullanıcılar sharedByInfluencer = true ile özel içerikler üretebilir.
```