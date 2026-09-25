# Next Template

Genel amaçlı frontend şablonu. Kurumsal site ve uygulama alanı birlikte gelir. Türkçe `/tr`, İngilizce `/en` altındadır. Kök adres `/tr` yoluna gider.

```bash
npm install
npm run dev
```

## Dosya yapısı

```text
app/
  [locale]/                 tr ve en sayfaları
    page.tsx                ana sayfa
    hakkimizda/ about/
    hizmetler/ services/
    iletisim/ contact/
    blog/
    profil/ profile/
    app/                    uygulama alanı
      giris/ login/
      page.tsx              panel
      ayarlar/ settings/
      liste/ list/
      profil/ profile/
  layout.tsx
  globals.css               renkler
components/
  layout/                   menü, alt bilgi, uygulama çerçevesi
  ui/                       shadcn parçaları
lib/
  site.ts                   ad, açıklama, menü
public/                     ikon ve statik dosyalar
```

İngilizce klasör adları yukarıdaki İngilizce satırlardır. Dil değişince aynı sayfanın diğer dildeki adresi açılır.

## Özelleştirme

Kurum adı, kısa açıklama ve menü `lib/site.ts` içindedir. Örnek ad **Site Adı**dır.

Site rengi laciverttir ve sabittir. Açık, koyu ve sistem seçimi üst menüdedir; yalnızca siteyi etkiler.

Uygulama renkleri lacivert, mavi, yeşil, turuncu ve mordur. Yeni renk `globals.css` içindeki listeye eklenir. Yazı tipi listesi boştur; eklenene kadar Geist kullanılır. Renk, yerleşim ve yazı tipi sağ ayar panelinden seçilir. Açık ve koyu tercih uygulama ile site arasında paylaşılmaz.

Yeni bir sayfa her iki dilde de açılır. Ortak buton, form, kart ve tablo `components/ui` altındadır.
