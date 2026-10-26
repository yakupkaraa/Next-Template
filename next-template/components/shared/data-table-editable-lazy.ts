/**
 * Hücre editörleri (text/number/select/date) yalnızca bu fonksiyon çağrıldığında
 * (`import()` dinamik) indirilir. Reorder katmanındaki aynı gerekçeyle düz `import()` +
 * state kullanılıyor: okuma modundaki hücre içeriği editör çözülene kadar kesintisiz
 * görünür kalır, next/dynamic'in `loading` fallback'i gibi children/mevcut içeriği
 * değiştirme riski oluşmaz.
 */
export function loadDataTableCellEditor() {
  return import("@/components/shared/data-table-cell-editor")
}
