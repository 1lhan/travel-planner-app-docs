```
📅 Seyahat Planı Modülü

⭐ Seyahat Planı Oluşturma
• Kullanıcı istediği kadar seyahat planı oluşturabilir.
• Seyahat planı başlangıçta isPublic = false (gizli) olur.
• Kullanıcı planı herkese açık yapmak isterse isPublic = true yapılabilir.
• Aynı kampanyaya bir kullanıcı birden fazla kez katılamaz, dolayısıyla seyahat planının önerileri oluşturulurken kullanıcının katıldığı kampanyalar gösterilmez.
• Kullanıcı oluşturduğu seyahat planlarını hesabım sayfasında görüntüleyebilir.

Oluşturulan planda aşağıdaki bilgiler olmalı:
• Tarih aralığı (departureDate, returnDate)
• Bütçe limiti (minBudget, maxBudget)
• Ulaşım türü (departureTransport, returnTransport)
• Konaklama tercihi (accommodationType)
• İlgi alanları (interests)
• title (plan başlığı)
Bu bilgiler, recommendations (önerilen kampanyalar ve seyahat önerileri) ve appliedCampaigns (katıldığı kampanyalar) bilgileri TravelPlan modeline kaydedilir.
Oluşturulan planın ID’si, User.travelPlans ilişkisine eklenir.
Seyahat planında kullanıcının katıldığı kampanyaya ait katılım bilgileri UserCampaignParticipation modeline kaydedilir.

⭐ Seyahat Planı Silme
• Kullanıcı, bir seyahat planını silerken eğer o plan kapsamında katıldığı kampanyalar varsa ve "Katıldığım kampanyalardan da çık" seçeneğini işaretlerse, sistem kullanıcıyı bu kampanyalardan da çıkarır.
• Bu işlem sonrası şu adımlar gerçekleştirilir:
• UserCampaignParticipation tablosundaki, ilgili userId ve campaignId bilgilerine sahip katılım kayıtları silinir.
• Kullanıcının User.campaignParticipations ilişkisi bu kayıtların silinmesiyle güncellenir.
• Eğer kampanyanın cashback özelliği aktifse, kullanıcının o kampanyadan kazanmış olduğu (type = Earned) CashbackTransaction kayıtları bulunur ve silinir.
• Kullanıcı kampanyadan ayrılırken kampanya satın alımında cashback kullanmışsa, bu cashback iadesi yapılır. Bu kapsamda, CashbackTransaction tablosuna negatif tutarlı ve type = Refund olan yeni bir kayıt eklenir ve kullanıcının toplam cashback miktarı (User.totalCashback) buna göre güncellenir.
• Ayrıca, silinen seyahat planına ait varsa değerlendirme veya yorumlar, hem Review modelinden hem de ilgili kullanıcıların User.reviews ilişkilerinden kaldırılır.
• Seyahat planının ID'sine göre, ilgili kayıt TravelPlan tablosundan ve User.travelPlans alanından silinir.

⭐ Seyahat Planı Güncelleme Özelliği Olmayacak




🎁 Kampanyalar Modülü

★ Kampanyalar, uygulamanın "Kampanyalar" sayfasında genel olarak listelenir. Ayrıca, "Seyahat Planı Oluşturucu" ekranında kullanıcının girdiği değerlere göre sistem tarafından öneri olarak sunulur.
★ Fiziksel ürünler de kampanya modeli altında tutulacaktır (Coin ile alınabilen ürünler hariç).

⭐ Kampanya Oluşturma
• Kampanyalar, işletme sahipleri ve adminler tarafından oluşturulabilir.

📌 Kampanya Alanları:
• title: Kampanya başlığı.
• description: Uzun açıklama; metin ve görsel içerebilen bir text editor aracılığıyla girilir.
• validFrom - validUntil: Kampanyanın geçerli olacağı tarih aralığı.
• maxParticipants: Kampanyaya katılabilecek maksimum kullanıcı sayısı.
• category: İlgi alanı kategorisi. Kullanıcı yalnızca bir adet kategori seçebilir (select input).
• originalPrice - discountedPrice: Kampanyanın normal ve indirimli fiyatı.
• imageUrl: Kampanyaya ait görselin bilgisayardan yüklenmesiyle belirlenir.
• city - district - mapUrl: Kampanyanın geçerli olduğu şehir, ilçe ve Google Maps bağlantısı.
• cashbackRate: Cashback yüzdesi. Bu alan yalnızca admin tarafından belirlenebilir.
• isCashbackCampaign: Kampanyanın cashback destekli olup olmadığını belirtir. Sadece admin tarafından değiştirilebilir.
• isActive: Kampanyanın aktiflik durumu. Hem işletme sahibi hem de admin, kampanyayı geçici olarak devre dışı bırakabilir.Devre dışı bırakıldığında, kampanyaya yalnızca katılım yapılamaz; diğer işlemler devam edebilir.

🔗 İlişkili Alanlar:
• createdById: Kampanyayı oluşturan kullanıcının ID’si.
• participants: Kampanyaya katılan kullanıcılarla ilişkili UserCampaignParticipation verilerini tutan liste.
• appliedToTravelPlans: Kampanyanın dahil edildiği seyahat planlarının ID’lerini içeren ilişki.
• createdAt - updatedAt: Sistem tarafından otomatik olarak atanır; kampanyanın oluşturulma ve son güncellenme zamanlarını belirtir.

Bu kampanya Campaign modeline kaydedilir. Ayrıca bu kaydın ID'si User.createdCampaigns alanına da eklenir.

⭐ Kampanya Güncelleme
• Eğer kampanyaya en az bir kişi katılmışsa ve kampanya içeriğinde değişiklik yapılırsa, kullanıcılara “Katıldığınız şu kampanyada değişiklik yapılmıştır, isterseniz kampanyayı iptal edebilirsiniz” şeklinde bildirim gönderilir.
• Eğer kampanyaya en az bir kişi katılmışsa kampanyanın orijinal fiyat ve kampanyalı fiyat alanları değiştirilemez.
• Bir kampanyaya cashback özelliği tanımlandıktan sonra, eğer kampanyayı işletme sahibi oluşturduysa, kampanyanın maksimum katılımcı sayısını sadece admin değiştirebilir; işletme sahibi bu alanı değiştiremez.
• Hem işletme sahibi hem de admin kampanyanın isActive değerini değiştirebilir. Eğer isActive = false ise kampanyaya katılım yapılamaz.
• Kampanya işletme sahibi ya da admin tarafından iptal edildiğinde kullanıcılara "bu kampanya iptal edilmiştir, iade işlemleri yapılacaktır" tarzı bir mesaj gönderilir ve kampanyadan ayrılma sürecinde yapılan işlemler gerçekleştirilir.

⭐ Kampanyaya Katılma
• Her kullanıcı, bir kampanyaya yalnızca bir kez katılabilir.

Kullanıcı bir kampanyaya katıldığında, kampanyaya katılım bilgileri şunlardır:
• userId (kullanıcı ID'si)
• campaignId (katıldığı kampanyanın ID'si)
• joinedAt (kampanyaya katılma tarihi)
• usedCashback (kampanya satın alınırken eğer cashback kullanıldıysa miktarı)
Bu bilgiler UserCampaignParticipation modeline kaydedilir. Oluşan kaydın ID’si, User.campaignParticipations ve Campaign.participants alanlarına eklenir.
Eğer kullanıcı kampanyaya katılırken cashback kullandıysa, kullanılan tutar kadar User.totalCashback değeri azaltılır ve type = Used olacak şekilde yeni bir CashbackTransaction kaydı oluşturulur. Bu kaydın ID’si, User.cashbackTransactions ilişkisine otomatik olarak eklenir.

Kullanıcının katıldığı kampanyada cashback tanımlıysa, yukarıdaki işlemlere ek olarak;
• userId (kullanıcının ID’si)
• campaignId (kampanyanın ID’si)
• amount (cashback miktarı)
• type (Earned, Used, Refund)
• status (pending, confirmed)
• transactionAt (işlem tarihi)
type = Earned ve status = Pending olarak yeni bir kayıt CashbackTransaction modeline eklenir. Oluşan bu kaydın ID’si User.cashbackTransactions ilişkisine bağlanır. Kampanya sona erdikten sonra ilgili kaydın status değeri Confirmed olarak güncellenir ve cashback miktarı User.totalCashback alanına eklenir.

⭐ Kampanyadan Ayrılma: Kullanıcı katıldığı kampanyadan ayrıldığında, userId ve campaignId bilgilerine göre;
• Campaign modelindeki participants (yani UserCampaignParticipation kayıtları) arasından ilgili UserCampaignParticipation kaydı silinir,
• User modelindeki campaignParticipations alanından ilgili UserCampaignParticipation kaydı silinir,
• Kampanyanın cashback özelliği varsa, kullanıcıya ait CashbackTransaction kayıtları içinde, ilgili kampanya ve kullanıcıya ait olan ve type'ı Earned olan (kazanılan) cashback kaydı bulunur ve silinir,
• Kullanıcının kampanyadan ayrılırken kampanya satın alımında cashback kullandıysa, bunun iadesi (refund) yapılır; bu durumda CashbackTransaction tablosuna amount ve type: Refund şeklinde yeni bir kayıt eklenir ve kullanıcının toplam cashback'i (User.totalCashback) buna göre güncellenir.


💸 Cashback

⭐ Cashbackleri hesaplara tanımlama
• Kullanıcılar, katıldıkları kampanyalardan kazandıkları cashbackleri kampanya sona erdikten sonra kazanırlar. Bu süreçte, ilgili CashbackTransaction kaydının status alanı Confirmed olarak güncellenir. Confirmed durumuna geçen cashback miktarı, kullanıcının totalCashback alanına eklenmelidir.

Admin panelinde, Kampanyalar bölümünde her kampanya için "Cashbackleri Onayla" veya benzer bir buton bulunur. Bu butona tıklandığında sistem:
• İlgili kampanyanın participants (katılımcılar) listesinden tüm userIdleri alır.
• Her bir kullanıcı için, o kampanyaya ait CashbackTransaction kayıtları içinde status = Pending olanları bulur.
• Bu kayıtların status alanını Confirmed olarak günceller.
• Güncellenen cashback miktarlarını kullanıcıların totalCashback alanına ekler.
Böylece kullanıcıların cashback bakiyeleri güncellenmiş olur ve kullanıma açılır.

★ Kullanıcı, cashback ile ilgili bilgilerini "Hesabım" sayfasındaki "Cashback" bölümünden görüntüleyebilir. Burada:
• Hangi kampanyadan, ne zaman, ne kadar cashback kazandığını ve cashback’in aktif olup olmadığını görebilir (User.cashbackTransactions).
• Ne zaman, hangi kampanyada ve ne kadar cashback harcadığını görebilir (User.cashbackTransactions).
• Toplam ne kadar cashback'i olduğunu görebilir (User.totalCashback).


👤 User

★ Kullanıcı ad-soyad, email, telefon numarası, şifre, doğum tarihi, cinsiyet, şehir, ilgi alanları bilgilerini hesabım sayfasından güncelleyebilir.

★ Bir işletme sahibi, öncelikle normal kullanıcı olarak hesap oluşturur. Daha sonra hesabını işletme hesabına dönüştürmek için hesabım sayfasından başvuruda bulunur.


💬 Review

⭐ Değerlendirme Yapma
• Kullanıcılar, görünürlüğü açık olan seyahat planlarına değerlendirme puanı (yıldız) verebilir ve yorum yapabilir.
• Kullanıcı bir seyahat planına değerlendirme yaptığında aşağıdaki bilgiler Review modeline kaydedilir:
    • userId: Yorumu yapan kullanıcının ID'si
    • travelPlanId: Değerlendirilen seyahat planının ID'si
    • rating: Verilen yıldız puanı (zorunlu)
    • comment: Kullanıcının yorumu (zorunlu değil)
    • createdAt: Değerlendirmenin oluşturulma tarihi
    • updatedAt: Değerlendirmenin son güncellenme tarihi
• Oluşturulan değerlendirme kaydının ID'si hem User.reviews hem de TravelPlan.reviews ilişkilerine eklenir.
• Değerlendirmeler şu alanlarda görüntülenir:
    • Seyahat planı detay sayfasındaki "Değerlendirmeler" bölümünde (herkese açık)
    • Kullanıcının hesabım sayfasındaki "Değerlendirmelerim" bölümünde (kişisel)

⭐ Değerlendirme Güncelleme
• Kullanıcı, yaptığı değerlendirmeyi daha sonra güncelleyebilir.
• Bu işlem sırasında, Review modelindeki ilgili kaydın:
    • rating ve/veya comment alanları güncellenir,
    • updatedAt alanı sistem tarafından otomatik olarak güncellenir.

⭐ Değerlendirme Silme
• Kullanıcı, yaptığı değerlendirmeyi silebilir.
• Bu durumda ilgili kayıt:
    • Review modelinden tamamen silinir,
    • Ayrıca bu değerlendirmeye ait ID, User.reviews ve TravelPlan.reviews ilişkilerinden kaldırılır.


Coin

★ Coinler sadece "Coin ile alınabilen ürünler" tarzında olacak sayfadaki ürünlerde harcanabilir.

⭐ Coin ile alınabilen ürünleri kaydı
• Coin ile alınabilen ürünleri sisteme sadece admin ekleyebilir.
• Coin ürünlerinin alanları: title, description, imageUrl (ürün resmi bilgisayardan seçilir), coinPrice, stock
admin bu alanları doldurduktan sonra ürünü kaydeder.



```