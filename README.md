# Türkçe API ❄️

Türkçe'ye özel, ücretsiz ve bağımlılığı az bir yardımcı API. [Hono](https://hono.dev) ile yazıldı; Node.js'te veya Vercel'de çalışır.

## Uç noktalar

| Uç nokta | Ne yapar |
|---|---|
| `GET /yaziyla/:sayi` | Sayıyı yazıya çevirir (`1234567` → *bir milyon iki yüz otuz dört bin beş yüz altmış yedi*) |
| `GET /yaziyla/tutar/:tutar` | Tutarı lira-kuruş olarak yazar (`1250.50` → *bin iki yüz elli lira elli kuruş*) |
| `GET /metin/slug?q=` | Türkçe karakter uyumlu slug (`Çığ Düştü!` → `cig-dustu`) |
| `GET /metin/donustur?q=&tip=buyuk\|kucuk\|baslik` | Doğru Türkçe büyük/küçük harf (`istanbul` → `İSTANBUL`, `IŞIK` → `ışık`) |
| `GET /metin/istatistik?q=` | Karakter, kelime, cümle sayısı ve tahmini okuma süresi |
| `GET /iller` | 81 il ve plaka kodları |
| `GET /iller/:plakaVeyaAd` | Plaka kodu veya ada göre il (`/iller/34`, `/iller/izmir`) |
| `GET /tatiller/:yil` | Sabit tarihli resmi tatiller ve haftanın günü (dini bayramlar hariç) |
| `GET /atasozu` | Rastgele atasözü ve anlamı |
| `GET /atasozleri` | Tüm atasözleri |
| `GET /sifre?uzunluk=16&sembol=1&rakam=1&buyuk=1&kucuk=1` | Kriptografik olarak güvenli şifre |
| `GET /uuid?adet=1` | UUID v4 (en fazla 100 adet) |

Hatalı istekler `400`, olmayan adresler `404` ve `{ "error": "..." }` döner. CORS açıktır, tarayıcıdan doğrudan çağrılabilir.

## Örnek

```bash
curl http://localhost:3000/yaziyla/tutar/1907.19
# {"tutar":"1907.19","yazi":"bin dokuz yüz yedi lira on dokuz kuruş"}

curl http://localhost:3000/iller/61
# {"plaka":61,"plakaKodu":"61","ad":"Trabzon"}
```

## Çalıştırma

```bash
npm install
npm start        # http://localhost:3000
npm run dev      # dosya değişince yeniden başlar
npm test
```

## Vercel'e yükleme

Proje Vercel'in Hono desteğiyle ek ayar gerektirmeden çalışır (`src/index.js` uygulamayı dışa aktarır):

```bash
npx vercel
```

## Lisans

MIT
