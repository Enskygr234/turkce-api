// Sayıyı Türkçe yazıya çevirme (fatura, çek, dekont için).
const ONES = ['', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz'];
const TENS = ['', 'on', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan'];
const SCALES = ['', 'bin', 'milyon', 'milyar', 'trilyon', 'katrilyon'];

function threeDigits(n) {
  const h = Math.floor(n / 100);
  const t = Math.floor((n % 100) / 10);
  const o = n % 10;
  const parts = [];
  if (h) parts.push(h === 1 ? 'yüz' : `${ONES[h]} yüz`);
  if (t) parts.push(TENS[t]);
  if (o) parts.push(ONES[o]);
  return parts.join(' ');
}

export function numberToWords(value) {
  let n = BigInt(value);
  if (n === 0n) return 'sıfır';
  const negative = n < 0n;
  if (negative) n = -n;
  if (n >= 10n ** 18n) throw new RangeError('Sayı çok büyük (en fazla 18 hane)');

  const groups = [];
  for (let i = 0; n > 0n; i++, n /= 1000n) {
    const g = Number(n % 1000n);
    if (!g) continue;
    // "bir bin" denmez, sadece "bin"
    const words = i === 1 && g === 1 ? 'bin' : [threeDigits(g), SCALES[i]].filter(Boolean).join(' ');
    groups.unshift(words);
  }
  return (negative ? 'eksi ' : '') + groups.join(' ');
}

// "1234.56" -> "bin iki yüz otuz dört lira elli altı kuruş"
export function amountToWords(input) {
  const str = String(input ?? '').trim().replace(',', '.');
  if (!/^-?\d{1,18}(\.\d{1,2})?$/.test(str)) {
    throw new TypeError('Geçerli bir tutar girin (örn. 1234.56)');
  }
  const [intPart, fracPart = ''] = str.split('.');
  const kurus = Number(fracPart.padEnd(2, '0'));
  let text = `${numberToWords(intPart)} lira`;
  if (kurus) text += ` ${numberToWords(kurus)} kuruş`;
  return text;
}
