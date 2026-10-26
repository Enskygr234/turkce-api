import { test } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/index.js';

const get = async (path) => {
  const res = await app.request(path);
  return { status: res.status, body: await res.json() };
};

test('sayıyı yazıya çevirme', async () => {
  const cases = {
    0: 'sıfır',
    7: 'yedi',
    100: 'yüz',
    1000: 'bin',
    2000: 'iki bin',
    1001000: 'bir milyon bin',
    1234567: 'bir milyon iki yüz otuz dört bin beş yüz altmış yedi',
    '-45': 'eksi kırk beş',
  };
  for (const [n, yazi] of Object.entries(cases)) {
    assert.equal((await get(`/yaziyla/${n}`)).body.yazi, yazi);
  }
  assert.equal((await get('/yaziyla/12a')).status, 400);
});

test('tutarı yazıya çevirme', async () => {
  assert.equal((await get('/yaziyla/tutar/1250.5')).body.yazi, 'bin iki yüz elli lira elli kuruş');
  assert.equal((await get('/yaziyla/tutar/99,07')).body.yazi, 'doksan dokuz lira yedi kuruş');
  assert.equal((await get('/yaziyla/tutar/10')).body.yazi, 'on lira');
});

test('metin araçları', async () => {
  assert.equal((await get('/metin/slug?q=' + encodeURIComponent('Çığ Düştü, İşte Öyle!'))).body.slug, 'cig-dustu-iste-oyle');
  assert.equal((await get('/metin/donustur?tip=buyuk&q=istanbul')).body.sonuc, 'İSTANBUL');
  assert.equal((await get('/metin/donustur?tip=kucuk&q=IŞIK')).body.sonuc, 'ışık');
  assert.equal((await get('/metin/donustur?tip=baslik&q=' + encodeURIComponent('İSTANBUL ışıkları'))).body.sonuc, 'İstanbul Işıkları');
  const s = (await get('/metin/istatistik?q=' + encodeURIComponent('Merhaba dünya. Nasılsın?'))).body;
  assert.equal(s.words, 3);
  assert.equal(s.sentences, 2);
});

test('iller', async () => {
  const all = (await get('/iller')).body;
  assert.equal(all.length, 81);
  assert.equal((await get('/iller/34')).body.ad, 'İstanbul');
  assert.equal((await get('/iller/06')).body.ad, 'Ankara');
  assert.equal((await get('/iller/' + encodeURIComponent('izmir'))).body.plaka, 35);
  assert.equal((await get('/iller/82')).status, 404);
});

test('tatiller', async () => {
  const { body } = await get('/tatiller/2026');
  assert.equal(body.tatiller.length, 8);
  const cumhuriyet = body.tatiller.find((t) => t.tarih === '2026-10-29');
  assert.equal(cumhuriyet.gun, 'Perşembe');
  assert.equal((await get('/tatiller/1900')).status, 400);
});

test('atasözü, şifre, uuid', async () => {
  assert.ok((await get('/atasozu')).body.soz);
  const sifre = (await get('/sifre?uzunluk=24&sembol=0')).body.sifre;
  assert.equal(sifre.length, 24);
  assert.match(sifre, /^[A-Za-z0-9]+$/);
  assert.equal((await get('/sifre?uzunluk=2')).status, 400);
  const ids = (await get('/uuid?adet=3')).body;
  assert.equal(ids.length, 3);
  assert.match(ids[0], /^[0-9a-f-]{36}$/);
});

test('bilinmeyen uç nokta 404 döner', async () => {
  assert.equal((await get('/yok')).status, 404);
});
