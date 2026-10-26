// Sabit tarihli resmi tatiller. Dini bayramlar (Ramazan/Kurban) her yıl
// kaydığı ve resmi takvime bağlı olduğu için bu listede yer almaz.
const SABIT = [
  { ay: 1, gun: 1, ad: 'Yılbaşı' },
  { ay: 4, gun: 23, ad: 'Ulusal Egemenlik ve Çocuk Bayramı' },
  { ay: 5, gun: 1, ad: 'Emek ve Dayanışma Günü' },
  { ay: 5, gun: 19, ad: "Atatürk'ü Anma, Gençlik ve Spor Bayramı" },
  { ay: 7, gun: 15, ad: 'Demokrasi ve Milli Birlik Günü' },
  { ay: 8, gun: 30, ad: 'Zafer Bayramı' },
  { ay: 10, gun: 28, ad: 'Cumhuriyet Bayramı Arifesi', yarimGun: true },
  { ay: 10, gun: 29, ad: 'Cumhuriyet Bayramı' },
];

const GUNLER = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

export function tatiller(yil) {
  return SABIT.map(({ ay, gun, ad, yarimGun }) => {
    const date = new Date(Date.UTC(yil, ay - 1, gun));
    return {
      tarih: date.toISOString().slice(0, 10),
      ad,
      gun: GUNLER[date.getUTCDay()],
      ...(yarimGun && { yarimGun: true }),
    };
  });
}
