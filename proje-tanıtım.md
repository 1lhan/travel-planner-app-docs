```
🗺️ Seyahat Planlama Modülü

🎯 Amaç
    • Seyahat Planlama Modülü, kullanıcıların kendi tercihlerine göre özelleştirilmiş seyahat planları oluşturmasını sağlar.
    • Sistem, kullanıcıdan alınan temel girdilere dayanarak akıllı öneriler üretir ve bu plana uygun kampanyaları eşleştirir.
    • Planlar diğer kullanıcılarla paylaşılabilir ve yapay zeka desteğiyle sürekli geliştirilebilir.

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
    3. Manuel Yer Ekleme: Kullanıcı dilerse sistemde bulunmayan özel bir yeri plana manuel olarak ekleyebilir.
    4. Özellikler: Yerler, konaklama ve ulaşım seçeneklerine sıralama işlemi (fiyat, en çok tercih edilen, google değerlendirme puanı) uygulanabilecek.
    5. Aktivite Takvimi: Kullanıcı önerilen veya kendi eklediği yerleri günlük takvime yerleştirerek seyahatini planlar.
    6. Paylaşım ve Yönetim
        • Plan isPublic olarak işaretlenirse toplulukla paylaşılır. (default=private)
        • Her kullanıcı "Hesabım" sayfasında kendi planlarını listeleyebilir, düzenleyebilir, silebilir.
        • Influencer kullanıcılar sharedByInfluencer = true ile özel içerikler üretebilir.




🎁 Kampanya Modülü

🎯 Amaç
    • Kampanya Modülü, kullanıcıların oluşturduğu seyahat planlarına uygun kampanyaları dinamik ve akıllı bir şekilde önerir ve uygulama içindeki “Kampanyalar” sayfasında listelenir.
    • Aynı zamanda otel, restoran gibi işletmelerin kampanya yayınlayıp yönetebileceği kapsamlı bir altyapı sunar.
    • Ayrıca influencerların kampanyaları sosyal medya üzerinden paylaşarak performans takibini yapabilmesi de desteklenir.

👤 Kimler Kampanya Oluşturabilir?
    • Admin (Yönetici): Tüm kampanyaları oluşturabilir, düzenleyebilir, onaylayabilir, silebilir ve durumlarını yönetebilir.
    • İşletme Hesapları: Sistemde önceden kayıtlı yer (Place) üzerinden kampanya ekleyebilir ve yönetebilir.
    • İş Ortakları / Partner API: İleri aşamada, dış sistemlerden kampanya entegrasyonu sağlanabilir. (?)

📌 Kampanya Temel Özellikleri
    • Kampanya Bilgileri: Başlık, açıklama, kategori (örn. konaklama, restoran), alt kategori (hotel, cafe vb.), etiketler (tags).
    • Yer Bilgisi: Kampanya doğrudan bir Place (mekan) ile ilişkilendirilir. Böylece adres, iletişim ve konum bilgileri Place modelinden çekilir.
    • Fiyatlandırma: Orijinal ve indirimli fiyat bilgisi, opsiyonel cashback oranı.
    • Geçerlilik ve Katılım: Kampanyanın geçerli olduğu tarih aralığı, maksimum katılımcı sayısı.
    • Görseller: Kapak ve detaylı kampanya görselleri.
    • İstatistikler: Görüntülenme (viewCount) ve katılım (joinCount) sayıları.
    • Yorum ve Değerlendirme: Kullanıcılar kampanyalara yorum yapabilir ve yıldız bazlı değerlendirme bırakabilir. Böylece kampanya kalitesi hakkında geri bildirim sağlanır.

🔍 Akıllı Öneri Sistemi
    • Kampanyalar, seyahat planı oluşturulurken girilen kriterlere göre (lokasyon, tarih, kategori, ilgi alanı) kullanıcıya önerilir.
    • Cashback içeren kampanyalar özel simge ve etiketlerle vurgulanarak öne çıkar.
    • En çok katılım alan veya popüler kampanyalar ayrıca filtrelenebilir.

💸 Cashback Yönetimi
    • Cashback oranı tanımlı kampanyalara katılan kullanıcılar için, katılım sonrası CampaignParticipation kaydı oluşturulur.
    Bu kayıtta kampanya kimliği (ID) ve kazanılacak cashback tutarı gibi bilgiler yer alır.
    • Katılım durumu checkedIn olduğunda, kullanıcının kazandığı cashback miktarı User.totalCashback alanına yansıtılır.

👥 Katılım ve Influencer Takibi
    • Her kullanıcı, bir kampanyaya yalnızca bir kez katılabilir (CampaignParticipation).
    • Influencer’lar, kendilerine özel affiliateUrl aracılığıyla kampanyaları paylaşır (CampaignAffiliate).
    • Bu bağlantı üzerinden yapılan tıklama ve katılımlar sistem tarafından takip edilir (clickCount, joinCount).
    • Katılım bir influencer aracılığıyla gerçekleşmişse, bu bilgi CampaignParticipation.affiliatedById alanında tutulur.

📊 Raporlama ve Performans Takibi
    • Kampanyalara ait temel istatistikler (görüntülenme ve katılım sayıları) sistem tarafından kaydedilir.
    • Influencer bazında performans takibi yapılabilir; hangi influencer kaç kişiyi yönlendirmiş ve bu yönlendirmelerin kaçı katılımla sonuçlanmış gibi veriler analiz edilir (CampaingAffiliate).
    • İşletmeler, hem kendi kampanyalarının performansını hem de kampanyalarını tanıtan influencer'ların katkılarını yönetim panelinden detaylı olarak izleyebilir (CampaingAffiliate).

🔗 Kampanya Yerle İlişkilendirme
    • Kampanya mutlaka sistemde kayıtlı bir Place ile ilişkilendirilir.
    • Bu sayede kampanya detaylarındaki adres, iletişim, konum bilgileri tutarlı ve güncel olur.
    • Kampanya, ilgili mekanın kategorisi ve alt kategorisi ile uyumludur. (?)




📍 Place (Mekan) Modülü

🎯 Amaç
    • Place Modülü, seyahat planlarında önerilecek mekanları, kampanyaların ilişkilendirileceği fiziksel yerleri ve kullanıcı yorumlarına açık lokasyonları merkezi olarak tanımlar.
    • Kapsamında; restoranlar, oteller, müzeler, kamp alanları, parklar, doğal alanlar gibi birçok türde mekan yer alır. Ayrıca bu mekanlar sistemin öneri motoru, kampanya modülü ve seyahat planlama süreçlerinde aktif olarak kullanılır.
    • Place modülü, seyahat planı oluşturma sürecinde girilen kriterler (lokasyon, tarih, kategori, ilgi alanı) doğrultusunda;
        • konaklama seçenekleri,
        • önerilen mekânlar
        • ve gezilecek yerler sayfasında kullanıcılara öneri olarak sunulacak yer verilerini içerir.

🗂️ Kaynaklar ve Veri Sağlama
    Google Places API:
        • Ana veri kaynağıdır. Konaklama, restoran, park, müze gibi kategorilere ait yerler bu API’den alınabilir.
        • Eksikler: Açıklama, iletişim bilgileri API yanıtında sınırlıdır.
        • Limit: Aylık 10.000 istek, her istek 20 kayıt getirir.
    iOverlander (Kamp & Karavan Alanları):
        • JSON veya CSV formatlarında indirilebilen açık veri kaynaklarından kamp, karavan parkı gibi alternatif konaklama alanları sistemde Place olarak işlenebilir.

🧩 Temel Özellikler
    📌 Genel Bilgiler
        • name, description, images gibi temel alanlar ile mekanın tanıtımı yapılır.
        • category (örn: restaurant, museum) ve subcategory (örn: cafe, beach) bilgisi ile sınıflandırma yapılır.
        • tags: pet_friendly, family_friendly, nature, instagrammable gibi etiketlerle kullanıcı tercihine göre filtreleme sağlanır.
    🧭 Konum ve İletişim
        • country, city, district, address, location (GeoJSON koordinat) verileriyle mekana ait tam konum bilgisi sağlanır.
        • phone, website, contactEmail, openingHours gibi iletişim ve hizmet saatleri alanları yer alır.
        • Google Place ID: googlePlaceId alanı ile Google API üzerinden yer eşleştirmesi yapılır.

🔗 İlişkili Modüllerle Entegrasyon
    🎁 Kampanya Modülü
        • Her kampanya mutlaka bir Place ile ilişkilidir.
        • Kampanya detayı görüntülendiğinde, bağlı olduğu yerin bilgileri (adres, kategori, açıklama, harita, telefon) doğrudan Place modelinden çekilir.

    🗺️ Seyahat Planlama Modülü
        • Seyahat planında önerilen yerler ve konaklama yerleri bu model üzerinden alınır.
        • Kullanıcının ilgi alanı, tarih, bütçe ve lokasyona göre mekanlar filtrelenir.
        • Kampanyalı mekanlar öne çıkarılır.

    🧠 Akıllı Öneri Sistemi
        • Filtreleme kriterleri: kategori, alt kategori, etiketler, konum, değerlendirme puanı, popülerlik.
        • Kullanıcının önceki etkileşimleri ve seyahat geçmişine göre sıralama algoritmaları uygulanabilir.
        • Kampanyalı ve cashback’li mekanlar özel etiketlerle vurgulanır.

📊 Veri Kalitesi ve Yönetim
    • Admin’ler veya onaylı iş ortakları duplicate kayıtları, eksik bilgileri düzenleyebilir.
    • Google API veya iOverlander gibi kaynaklardan periyodik veri senkronizasyonları yapılabilir.
    • Manuel girilen mekanlar uygunluk kontrolü sonrası yayınlanır.

🧪 Geliştirme Alanları (İleri Aşama)
    • Yorumlardan duygu analizi yapılarak “olumlu/olumsuz deneyim” oranları hesaplanabilir.
    • Popüler mekanlar için ziyaret sıklığına göre trend etiketi eklenebilir.
    • Etkinlik lokasyonları, partner API (örn. Biletix) üzerinden alınarak bu modelle entegre edilebilir.

💬 Yorum ve Puanlama
    • Her Place, kullanıcılar tarafından yıldız puanı verilerek (rating) ve yorum (comment) yazılarak değerlendirilir.
    • Puanlar hem Google üzerinden gelen (googleRating), hem de sistemde yapılan yorumlarla (rating) iki ayrı başlıkta gösterilebilir.
    • Review modeli üzerinden gelen tüm yorumlar ilişkilendirilir ve topluluk katkısı ile mekan profili sürekli gelişir.




📝 Değerlendirme (Review) Modülü

🎯 Amaç
    • Değerlendirme Modülü, kullanıcıların deneyimledikleri seyahat planlarını, konaklama yerlerini, mekanları ve kampanyaları puanlayarak değerlendirmelerine olanak tanır.
    • Bu sayede sistemdeki içerikler topluluk katkısıyla sürekli zenginleşir, öneriler daha güvenilir ve kişiselleştirilebilir hâle gelir.

👤 Kullanıcıdan Alınan Girdiler
    • Hedef Varlık (sadece biri):
        • Seyahat Planı (TravelPlan)
        • Yer/Mekan (Place)
        • Konaklama Yeri (AccommodationPlace)
    • Puan: 1–5 arası tam sayı (rating)
    • Yorum (opsiyonel): Kullanıcının serbest metinle bıraktığı açıklama (comment)




📱 User (Kullanıcı) Modülü

★ Kullanıcılar, sistemde influencer veya işletme (business) hesabına geçiş yapmak için başvuru oluşturabilir. Başvurular incelenip onaylandığında, kullanıcının roles alanına ilgili rol eklenir.

👤 Kullanıcı Tipleri ve Roller
    • admin: Sistemin genel yönetimini yapar, tüm verileri denetler.
    • business: İşletme hesabı; kampanya oluşturup yönetebilir.
    • user: Standart kullanıcı, seyahat planları oluşturur, kampanyalara katılır.
    • influencer: Kampanyaları sosyal medyada paylaşır, performans takibi yapılır.
    • partner: İş ortakları, ek işlevsellik ve entegrasyon sağlar.

🔑 Temel Özellikler
    • Kullanıcı bilgileri: e-posta, şifre, isim, kullanıcı adı, profil resmi ve biyografi.
    • Çoklu rol desteği ile kullanıcı birden fazla role sahip olabilir.
    • Kullanıcının toplam kazandığı cashback tutarı ve kampanya katılımları kaydedilir.
    • Kullanıcının oluşturduğu seyahat planları ve kampanyalar takip edilir.
    • Influencerların kampanya paylaşım performansları izlenir (tıklama ve katılım sayıları).
    • Kullanıcının yaptığı değerlendirmelere ait ID'ler sistemde ilişkilendirilerek saklanır.

🔗 İlişkili Modüllerle Entegrasyon
    • Seyahat Planlama Modülü: Kullanıcının oluşturduğu ve katıldığı seyahat planları burada tutulur.
    • Kampanya Modülü: Kullanıcıların kampanyalara katılımı, kampanya oluşturma ve influencer paylaşım verileri bu modülle ilişkilidir.
    • Değerlendirme Modülü: Kullanıcı yorumları ve puanları yönetilir.
```