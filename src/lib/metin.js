// Türkçe karakter duyarlı metin araçları.
const MAP = { ç: 'c', ğ: 'g', ı: 'i', ö: 'o', ş: 's', ü: 'u', â: 'a', î: 'i', û: 'u' };

export function slugify(text, sep = '-') {
  return String(text ?? '')
    .toLocaleLowerCase('tr')
    .replace(/[çğıöşüâîû]/g, (c) => MAP[c])
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, sep)
    .replace(new RegExp(`^\\${sep}+|\\${sep}+$`, 'g'), '');
}

export function upper(text) {
  return String(text ?? '').toLocaleUpperCase('tr');
}

export function lower(text) {
  return String(text ?? '').toLocaleLowerCase('tr');
}

export function title(text) {
  return lower(text).replace(/(^|\s)(\S)/g, (_, s, c) => s + c.toLocaleUpperCase('tr'));
}

export function stats(text) {
  const t = String(text ?? '');
  const words = t.trim() ? t.trim().split(/\s+/).length : 0;
  return {
    characters: t.length,
    charactersNoSpaces: t.replace(/\s/g, '').length,
    words,
    sentences: (t.match(/[^.!?…]+[.!?…]+/g) || (t.trim() ? [t] : [])).length,
    // Ortalama okuma hızı ~200 kelime/dk
    readingTimeSeconds: Math.ceil((words / 200) * 60),
  };
}
