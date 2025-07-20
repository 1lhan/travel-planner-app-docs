```
🗺️ Seyahat Planlama Modülü

🎯 Amaç

Seyahat Planlama Modülü, kullanıcıların kendi tercihlerine göre özelleştirilmiş seyahat planları oluşturmasını sağlar.
Sistem, kullanıcıdan alınan temel girdilere dayanarak akıllı öneriler üretir ve bu plana uygun kampanyaları eşleştirir.
Planlar diğer kullanıcılarla paylaşılabilir ve yapay zeka desteğiyle sürekli geliştirilebilir.

👤 Kullanıcıdan Alınan Girdiler

• Bütçe Limiti (opsiyonel): Minimum ve maksimum bütçe (minBudget, maxBudget)
• İlgi Alanları: Tarih, doğa, gurme, müze, alışveriş, gece hayatı vb. kategoriler
• Seyahat Adımları:
    • Ülke, şehir veya ilçe bilgisi
    • Lokasyonda kalış süresi
    • Ulaşım tipi (opsiyonel): Uçak, otobüs, tren, özel araç, karavan vb.
    • Konaklama tipi (opsiyonel): Otel, hostel, Airbnb, kamp alanı, karavan parkı vb.

🧠 Modül İşleyişi

1. Plan Oluşturma
    • Kullanıcı isterse minimum ve maksimum bütçe belirler.
    • İlgi alanları arasından tercihlerini seçer.
    • Gideceği her lokasyon için kalış süresi, ulaşım tipi (opsiyonel) ve konaklama tipi (opsiyonel) bilgilerini girer.
    • Sistem, bu veriler doğrultusunda ulaşım, konaklama, gezilecek yerler (Place), kampanyalar ve etkinlik seçeneklerini listeler.

2. Yapay Zeka Destekli Öneriler
    • İlgi alanları, bütçe (opsiyonel), gidilecek lokasyonlar, tarih aralığı ve konaklama tercihlerine göre (AccommodationPlace modeli üzerinden) konaklama seçenekleri sunulur.
    • Bütçe (opsiyonel), tarih aralığı, gidilecek lokasyonlar, konaklama tercihi ve ulaşım tercihlerine göre;
        • Gidiş ve dönüş için ulaşım seçenekleri sunulur.
        • Örneğin, iki lokasyon varsa; seyahatin başladığı yerden 1. lokasyona, 1. lokasyondan 2. lokasyona ve 2. lokasyondan başlangıç noktasına dönüş için ulaşım alternatifleri önerilir.
        • Aynı zamanda, her tarih aralığı için uygun konaklama seçenekleri de kullanıcıya sunulur.
    • İlgi alanı, bütçe (opsiyonel), gidilecek lokasyonlar ve tarih aralığına göre yer önerileri (Place modeli üzerinden) ve etkinlikler sunulur.
    • Yer, konaklama ve etkinlik listelerinde kampanyalı seçenekler öncelikli olarak gösterilir.
    • Cashback içeren kampanyalar özel olarak etiketlenir.
    • Kampanya dışı sonuçlar popülerlik, değerlendirme puanı ve fiyat gibi kriterlere göre sıralanabilir.

3. Manuel Yer Ekleme
    • Kullanıcı dilerse sistemde bulunmayan özel bir yeri plana manuel olarak ekleyebilir.
    
4. Özellikler
    • Yerler, konaklama ve ulaşım seçeneklerine sıralama işlemi (fiyat, en çok tercih edilen, google değerlendirme puanı) uygulanabilecek.

5. Aktivite Takvimi
    • Kullanıcı önerilen veya kendi eklediği yerleri günlük takvime yerleştirerek seyahatini planlar.

6. Paylaşım ve Yönetim
    • Plan isPublic olarak işaretlenirse toplulukla paylaşılır. (default=private)
    • Her kullanıcı "Hesabım" sayfasında kendi planlarını listeleyebilir, düzenleyebilir, silebilir.
    • Influencer kullanıcılar sharedByInfluencer = true ile özel içerikler üretebilir.


📝 Değerlendirme (Review) Modülü

🎯 Amaç

Değerlendirme Modülü, kullanıcıların deneyimledikleri seyahat planlarını, konaklama yerlerini ve mekanları puanlayarak değerlendirmelerine olanak tanır.
Bu sayede sistemdeki içerikler topluluk katkısıyla sürekli zenginleşir, öneriler daha güvenilir ve kişiselleştirilebilir hâle gelir.

👤 Kullanıcıdan Alınan Girdiler

• Hedef Varlık (sadece biri):
    • Seyahat Planı (TravelPlan)
    • Yer/Mekan (Place)
    • Konaklama Yeri (AccommodationPlace)
• Puan: 1–5 arası tam sayı (rating)
• Yorum (opsiyonel): Kullanıcının serbest metinle bıraktığı açıklama (comment)


```