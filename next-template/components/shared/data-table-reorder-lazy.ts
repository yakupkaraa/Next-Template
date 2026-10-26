/**
 * dnd-kit yalnızca bu fonksiyon çağrıldığında (`import()` dinamik) indirilir.
 *
 * Bilinçli olarak `next/dynamic` yerine düz `import()` + state kullanılıyor: `next/dynamic`
 * yüklenme sırasında hedef bileşeni `loading` fallback'iyle DEĞİŞTİRİR (children'a erişemez),
 * bu da DndContext/SortableContext gibi "children'ı sarmalayan" bir bileşen için satırların
 * yükleme bitene kadar kısa süreliğine kaybolmasına (layout kayması) yol açardı. Düz
 * `import()` ile modül tamamen çözülene kadar statik satırlar kesintisiz görünür kalır;
 * aynı webpack/Turbopack code-splitting birimi (ayrı chunk) yine de uygulanır.
 */
export function loadDataTableReorderDnd() {
  return import("@/components/shared/data-table-reorder-dnd")
}
