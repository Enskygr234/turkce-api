import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { numberToWords, amountToWords } from './lib/yaziyla.js';
import { slugify, upper, lower, title, stats } from './lib/metin.js';
import { ILLER, findIl } from './lib/iller.js';
import { tatiller } from './lib/tatiller.js';
import { ATASOZLERI, randomAtasozu } from './lib/atasozleri.js';
import { generatePassword } from './lib/sifre.js';

const app = new Hono();

app.use('*', cors());

app.onError((err, c) => {
  const status = err instanceof RangeError || err instanceof TypeError || err instanceof SyntaxError ? 400 : 500;
  return c.json({ error: status === 400 ? err.message : 'Sunucu hatası' }, status);
});

app.notFound((c) => c.json({ error: 'Böyle bir uç nokta yok. Liste için / adresine bakın.' }, 404));

app.get('/', (c) =>
  c.json({
    ad: 'Türkçe API',
    surum: '1.0.0',
    uclar: {
      'GET /yaziyla/:sayi': 'Sayıyı yazıya çevirme',
      'GET /yaziyla/tutar/:tutar': 'Tutarı lira-kuruş olarak yazıya çevirme',
      'GET /metin/slug?q=': 'Türkçe karakter uyumlu slug',
      'GET /metin/donustur?q=&tip=buyuk|kucuk|baslik': 'Türkçe büyük/küçük harf dönüşümü',
      'GET /metin/istatistik?q=': 'Karakter, kelime, cümle sayısı ve okuma süresi',
      'GET /iller': '81 il ve plaka kodları',
      'GET /iller/:plakaVeyaAd': 'Plaka kodu veya ada göre il',
      'GET /tatiller/:yil?': 'Sabit tarihli resmi tatiller',
      'GET /atasozu': 'Rastgele atasözü',
      'GET /atasozleri': 'Tüm atasözleri',
      'GET /sifre?uzunluk=16&sembol=1&rakam=1&buyuk=1&kucuk=1': 'Güvenli şifre üretme',
      'GET /uuid?adet=1': 'UUID v4 üretme',
    },
  }),
);

app.get('/yaziyla/tutar/:tutar', (c) => {
  const tutar = c.req.param('tutar');
  return c.json({ tutar, yazi: amountToWords(tutar) });
});

app.get('/yaziyla/:sayi', (c) => {
  const sayi = c.req.param('sayi');
  if (!/^-?\d{1,18}$/.test(sayi)) throw new TypeError('Tam sayı girin (en fazla 18 hane)');
  return c.json({ sayi, yazi: numberToWords(sayi) });
});

app.get('/metin/slug', (c) => {
  const q = c.req.query('q') ?? '';
  return c.json({ metin: q, slug: slugify(q, c.req.query('ayrac') === '_' ? '_' : '-') });
});

app.get('/metin/donustur', (c) => {
  const q = c.req.query('q') ?? '';
  const fn = { buyuk: upper, kucuk: lower, baslik: title }[c.req.query('tip') ?? 'buyuk'];
  if (!fn) throw new TypeError("tip 'buyuk', 'kucuk' veya 'baslik' olmalı");
  return c.json({ metin: q, sonuc: fn(q) });
});

app.get('/metin/istatistik', (c) => c.json(stats(c.req.query('q') ?? '')));

app.get('/iller', (c) => c.json(ILLER));

app.get('/iller/:q', (c) => {
  const il = findIl(decodeURIComponent(c.req.param('q')));
  return il ? c.json(il) : c.json({ error: 'İl bulunamadı' }, 404);
});

app.get('/tatiller/:yil?', (c) => {
  const yil = Number(c.req.param('yil') ?? new Date().getFullYear());
  if (!Number.isInteger(yil) || yil < 2017 || yil > 2100) {
    throw new RangeError('Yıl 2017-2100 arasında olmalı');
  }
  return c.json({ yil, not: 'Dini bayramlar dahil değildir.', tatiller: tatiller(yil) });
});

app.get('/atasozu', (c) => c.json(randomAtasozu()));

app.get('/atasozleri', (c) => c.json(ATASOZLERI));

const flag = (v, def = true) => (v === undefined ? def : !['0', 'false', 'hayir'].includes(v));

app.get('/sifre', (c) => {
  const q = c.req.query();
  const sifre = generatePassword({
    length: q.uzunluk ? Number(q.uzunluk) : 16,
    lower: flag(q.kucuk),
    upper: flag(q.buyuk),
    digits: flag(q.rakam),
    symbols: flag(q.sembol),
  });
  c.header('Cache-Control', 'no-store');
  return c.json({ sifre, uzunluk: sifre.length });
});

app.get('/uuid', (c) => {
  const adet = Number(c.req.query('adet') ?? 1);
  if (!Number.isInteger(adet) || adet < 1 || adet > 100) throw new RangeError('adet 1-100 arasında olmalı');
  c.header('Cache-Control', 'no-store');
  return c.json(Array.from({ length: adet }, () => crypto.randomUUID()));
});

export default app;
