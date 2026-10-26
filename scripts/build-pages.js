// GitHub Pages için statik sürümü _site/ klasörüne üretir:
// - Veri uçları JSON dosyası olur (/api/iller/34.json gibi)
// - Hesaplama yapan araçlar sayfada tarayıcıda çalışır (src/lib aynen kopyalanır)
import { mkdir, writeFile, cp, rm } from 'node:fs/promises';
import { ILLER } from '../src/lib/iller.js';
import { tatiller } from '../src/lib/tatiller.js';
import { ATASOZLERI } from '../src/lib/atasozleri.js';
import { slugify } from '../src/lib/metin.js';

const OUT = new URL('../_site/', import.meta.url);

async function json(path, data) {
  const file = new URL(path, OUT);
  await mkdir(new URL('.', file), { recursive: true });
  await writeFile(file, JSON.stringify(data, null, 2));
}

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

await json('api/iller.json', ILLER);
for (const il of ILLER) {
  await json(`api/iller/${il.plaka}.json`, il);
  await json(`api/iller/${il.plakaKodu}.json`, il);
  await json(`api/iller/${slugify(il.ad)}.json`, il);
}

for (let yil = 2017; yil <= 2100; yil++) {
  await json(`api/tatiller/${yil}.json`, { yil, not: 'Dini bayramlar dahil değildir.', tatiller: tatiller(yil) });
}

await json('api/atasozleri.json', ATASOZLERI);

await cp(new URL('../src/lib/', import.meta.url), new URL('lib/', OUT), { recursive: true });
await cp(new URL('../pages/', import.meta.url), OUT, { recursive: true });
await writeFile(new URL('.nojekyll', OUT), '');

console.log('Statik site _site/ klasörüne üretildi');
