// Halk arasında bilinen Türk atasözleri.
export const ATASOZLERI = [
  { soz: 'Damlaya damlaya göl olur.', anlam: 'Küçük birikimler zamanla büyük sonuçlar doğurur.' },
  { soz: 'Sakla samanı, gelir zamanı.', anlam: 'Değersiz görünen şeyler bir gün işe yarayabilir.' },
  { soz: 'Ağaç yaşken eğilir.', anlam: 'Eğitim küçük yaşta verilmelidir.' },
  { soz: 'Bugünün işini yarına bırakma.', anlam: 'Yapılacak işi ertelememek gerekir.' },
  { soz: 'Komşu komşunun külüne muhtaçtır.', anlam: 'İnsanlar en küçük şeyde bile birbirine ihtiyaç duyar.' },
  { soz: 'Bir elin nesi var, iki elin sesi var.', anlam: 'Birlikte çalışmak başarıyı getirir.' },
  { soz: 'Acele işe şeytan karışır.', anlam: 'Aceleyle yapılan işte hata olur.' },
  { soz: 'Sabreden derviş muradına ermiş.', anlam: 'Sabırlı olan sonunda isteğine kavuşur.' },
  { soz: 'Dost kara günde belli olur.', anlam: 'Gerçek dost zor zamanda yanında olandır.' },
  { soz: 'Ayağını yorganına göre uzat.', anlam: 'Harcamalarını gelirine göre ayarla.' },
  { soz: 'Gülü seven dikenine katlanır.', anlam: 'Sevilen şeyin zorluklarına da katlanmak gerekir.' },
  { soz: 'Tatlı dil yılanı deliğinden çıkarır.', anlam: 'Güzel sözle her iş başarılır.' },
  { soz: 'Emek olmadan yemek olmaz.', anlam: 'Çalışmadan kazanç elde edilmez.' },
  { soz: 'Su testisi su yolunda kırılır.', anlam: 'İnsan sürekli yaptığı işte zarar görebilir.' },
  { soz: 'Mum dibine ışık vermez.', anlam: 'İnsan çoğu zaman en yakınlarına faydalı olamaz.' },
  { soz: 'Rüzgâr eken fırtına biçer.', anlam: 'Kötülük yapan daha büyük kötülükle karşılaşır.' },
  { soz: 'Keskin sirke küpüne zarar.', anlam: 'Öfkeli insan en çok kendine zarar verir.' },
  { soz: 'İşleyen demir ışıldar.', anlam: 'Çalışan insan her zaman gelişir ve parlar.' },
  { soz: 'Az veren candan, çok veren maldan.', anlam: 'Az olanın verdiği az da olsa değerlidir.' },
  { soz: 'Bin bilsen de bir bilene danış.', anlam: 'Ne kadar bilirsen bil, bilene danışmak gerekir.' },
  { soz: 'Ateş düştüğü yeri yakar.', anlam: 'Acıyı en çok başına gelen hisseder.' },
  { soz: 'Her işte bir hayır vardır.', anlam: 'Kötü görünen olaylardan iyi sonuç çıkabilir.' },
  { soz: 'Görünen köy kılavuz istemez.', anlam: 'Apaçık olan şey için açıklamaya gerek yoktur.' },
  { soz: 'Üzüm üzüme baka baka kararır.', anlam: 'İnsanlar birbirinden etkilenir.' },
  { soz: 'Yuvayı dişi kuş yapar.', anlam: 'Evi yuva yapan kadındır.' },
  { soz: 'Söz gümüşse sükût altındır.', anlam: 'Bazen susmak konuşmaktan daha değerlidir.' },
  { soz: 'Kervan yolda düzülür.', anlam: 'İşler başladıktan sonra zamanla yoluna girer.' },
  { soz: 'Yalancının mumu yatsıya kadar yanar.', anlam: 'Yalan kısa sürede ortaya çıkar.' },
  { soz: 'Bilmemek ayıp değil, öğrenmemek ayıptır.', anlam: 'Asıl kusur öğrenmeye çalışmamaktır.' },
];

export function randomAtasozu() {
  return ATASOZLERI[Math.floor(Math.random() * ATASOZLERI.length)];
}
