// Kriptografik olarak güvenli şifre üretici.
import { randomInt } from 'node:crypto';

const SETS = {
  lower: 'abcdefghijkmnopqrstuvwxyz',
  upper: 'ABCDEFGHJKLMNPQRSTUVWXYZ',
  digits: '23456789',
  symbols: '!@#$%&*?-_=+',
};

export function generatePassword({ length = 16, lower = true, upper = true, digits = true, symbols = true } = {}) {
  if (!Number.isInteger(length) || length < 4 || length > 128) {
    throw new RangeError('Uzunluk 4 ile 128 arasında olmalı');
  }
  const active = Object.entries({ lower, upper, digits, symbols }).filter(([, on]) => on).map(([k]) => SETS[k]);
  if (!active.length) throw new TypeError('En az bir karakter grubu seçilmeli');

  // Her seçili gruptan en az bir karakter garanti edilir
  const chars = active.map((set) => set[randomInt(set.length)]);
  const all = active.join('');
  while (chars.length < length) chars.push(all[randomInt(all.length)]);

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.join('');
}
