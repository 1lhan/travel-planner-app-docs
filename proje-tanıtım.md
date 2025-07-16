```
🧭 Proje Amacı

Bu proje, kullanıcıların kişiselleştirilmiş seyahat planları oluşturmasını ve bu planlara uygun kampanyalardan faydalanmasını sağlayan, yapay zeka destekli bir seyahat planlama platformudur. Sistem; kullanıcının ilgi alanları, bütçesi, konaklama tercihleri ve tarih aralığı gibi bilgileri değerlendirerek ona özel dinamik öneriler, kampanya eşleştirmeleri ve destinasyon tavsiyeleri sunar. Böylece kullanıcılar daha uygun fiyatlı, hedeflerine ve zevklerine daha uygun tatiller planlayabilir.


🗺️ Seyahat Planlama Modülü

Kullanıcılar bu modül aracılığıyla detaylı seyahat planları oluşturabilir. Her seyahat planı aşağıdaki kriterlere göre şekillendirilir:

• Tarih aralığı (gidiş – dönüş)
• Bütçe limiti (minimum ve maksimum)
• Ulaşım türü (otobüs, uçak, tren, karavan, araç)
• Konaklama tercihi (otel, hostel, Airbnb, kamp, karavan vb.)
• İlgi alanları (tarih, doğa, yemek, müze, alışveriş vb.)

Sistem, bu verileri analiz ederek hem kullanıcıya uygun kampanyaları önermekte, hem de yapay zeka desteğiyle özel etkinlik ve destinasyon önerileri sunmaktadır. Oluşturulan planlar isteğe bağlı olarak diğer kullanıcılarla da paylaşılabilir. Her kullanıcı kendi planlarını "Hesabım" sayfasında takip edebilir, düzenleyebilir veya silebilir.


🎁 Kampanya Modülü

Kampanyalar, kullanıcıların oluşturduğu seyahat planlarına uygun olarak sistem tarafından önerilir ve ayrıca uygulama içinde "Kampanyalar" sayfasında listelenir. Bu kampanyalar:
Yöneticiler (admin) veya iş ortakları (ör. oteller, ulaşım şirketleri, tur firmaları) tarafından oluşturulabilir.

Her kampanya; başlık, açıklama, kategori (örneğin konaklama, ulaşım, etkinlik), konum bilgisi (şehir/ilçe), tarih aralığı, kişi limiti, indirimli fiyat ve orijinal fiyat gibi bilgiler içerir.

Kampanyalar ayrıca:
• Katılım sayısına göre analiz edilebilir.
• Görüntülenme istatistikleri takip edilebilir.
• Şirket hesabı olan kullanıcılar kampanyaları "Hesabım" sayfasından yönetebilir.


💸 Cashback Özelliği

Bazı kampanyalarda cashback (geri ödeme) özelliği bulunur. Bu özellik sayesinde:
Kullanıcılar katıldıkları kampanyadan belirli bir oranda (ör. %5) nakit iadesi kazanır.
Kazanılan cashback miktarı, kullanıcının hesabında birikir.

Kullanıcılar "Cashbacklerim" sayfasından:
• Kazandıkları miktarları
• Ne zaman ne kadar harcadıklarını
• Hangi kampanyalardan kazandıklarını
• Cashback durumlarını (bekliyor, onaylandı) takip edebilir.
• Cashback özelliği, kullanıcıların platforma olan bağlılığını ve kampanyalara katılım isteğini artırmayı hedefler.

🪙 Coin Sistemi

Platformda kullanıcıların çeşitli etkileşimleri sonucunda coin kazanabilecekleri bir ödül sistemi bulunmaktadır. Bu sistem, kullanıcıların aktifliğini artırmayı ve görev tabanlı etkileşimleri teşvik etmeyi hedefler.
Coin Kazanma Yöntemleri:
• Kullanıcılar aşağıdaki yollarla coin kazanabilir:
• Görev tamamlama (ör. anket doldurma, seyahat planı oluşturma, yorum yazma)
• Kampanyaya katılım
• Belirli hizmet veya ürünlerin satın alınması
• Arkadaş daveti gibi sosyal aksiyonlar
• Özel promosyon veya bonus etkinlikler
• Her coin kaydı, kullanıcının profiline bağlanır ve kazanç nedeni CoinSource enum alanında tutulur.

Coin Bilgileri: Kullanıcının toplam coin bakiyesi User.totalCoin alanında güncel olarak tutulur.
Tüm kazanımlar ve coin geçmişi kullanıcıya "Hesabım" sayfasında gösterilir.


🎁 Coin Ürünleri

Kullanıcılar kazandıkları coin'leri özel ürün veya hizmetleri satın almak için kullanabilir. Coin ile alınabilecek bu içerikler, platformda ayrı bir "Coin Ürünleri" sekmesinde listelenir.
Coin Ürünlerinin Özellikleri: Her ürün, başlık, açıklama, görsel, coin fiyatı ve stok bilgisiyle tanımlanır.
• Yalnızca coin ile satın alınabilir; TL ile ödeme yapılmaz.
• Ürün stokları sistem tarafından takip edilir ve tükenen ürünler otomatik olarak pasifleştirilir.
• Satın Alma İşlemi: Kullanıcının CoinPurchase modeli üzerinden yaptığı her satın alma kaydedilir.
• Satın alma işlemi gerçekleştiğinde: Harcanan coin miktarı, User.totalCoin alanından düşülür.
• CoinPurchase modeli üzerinden işlem tarihi, ürün ID’si ve kullanıcı ID’si ile kayıt tutulur.


🌿 Organik Tarım Bölümü

Projemizin Organik Tarım Bölümü, doğaya ve sağlığa duyarlı bireyler için sürdürülebilir ve temiz tarım yöntemlerini teşvik etmeyi amaçlar.

Bu bölümde;
• Yerel üreticilerle iş birliği yapılarak taze ve güvenilir organik ürünlerin temini sağlanır.
• Kullanıcılar, organik tarım ürünlerini kolayca keşfedebilir, satın alabilir ve bu alanda gelişen kampanyalardan faydalanabilir.
• Aynı zamanda, sürdürülebilir yaşam ve çevre dostu tarım uygulamaları hakkında farkındalık yaratılır.


✨ Özetle

Bu proje, klasik seyahat planlama uygulamalarından farklı olarak:
Kişiselleştirme: İlgi alanlarına, bütçeye ve konaklama tercihlerine göre öneri
Yapay Zeka Destekli Öneriler: Akıllı kampanya ve rota önerileri
Kampanya Takibi ve Katılım: Hem kullanıcılar hem işletmeler için etkili bir yönetim
Cashback Mekanizması: Katılımı teşvik eden ödüllendirme sistemi sunarak yenilikçi bir deneyim sağlar.
```