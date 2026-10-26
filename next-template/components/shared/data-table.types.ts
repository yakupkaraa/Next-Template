import type { ColumnDef, OnChangeFn, RowData } from "@tanstack/react-table"
import type { ReactNode, Ref } from "react"
import type { DataTableFeatures } from "@/components/shared/data-table-features"

export type { DataTableCellEditor, DataTableColumnMeta } from "@/components/shared/data-table-cell-editor-types"

export type DataTableGridLines = "none" | "rows" | "cells"

export type DataTableApi = {
  resetColumnState: () => void
}

export type DataTableColumnMenuCopy = {
  sortAsc: string
  sortDesc: string
  clearSort: string
  search: string
  selectAll: string
  clearFilter: string
  empty: string
}

export type DataTablePaginationCopy = {
  /** Yer tutucular: {from}, {to}, {total}. */
  rangeTemplate: string
  pageSizeLabel: string
  firstPageLabel: string
  previousPageLabel: string
  nextPageLabel: string
  lastPageLabel: string
}

export type DataTablePaginationConfig = {
  pageSize: number
  pageSizeOptions: readonly number[]
  copy: DataTablePaginationCopy
}

export type DataTableExpandable<TData> = {
  /** Genişletilmiş satırın altında gösterilecek detay içeriği. */
  renderDetail: (row: TData) => ReactNode
  /** Verilmezse tüm satırlar genişletilebilir kabul edilir. */
  getRowCanExpand?: (row: TData) => boolean
  /** Genişletme düğmesine hover/focus olduğunda çağrılır (lazy detay parçasını önceden yükler). */
  onPreloadDetail?: () => void
  expandLabel: string
  collapseLabel: string
}

export type DataTableReorderAnnouncementsCopy = {
  /** Sürükleme öncesi ekran okuyucuya bir kez okunan kısa talimat. */
  screenReaderInstructions: string
  /** Yer tutucular: {position}, {total}. */
  pickedUpTemplate: string
  movedTemplate: string
  droppedTemplate: string
  cancelledTemplate: string
}

export type DataTableReorderConfig = {
  /** Bırakma anında çağrılır; iyimser güncelleme ve hata durumunda geri alma çağıranın sorumluluğundadır. */
  onReorder: (activeId: string, overId: string) => void | Promise<void>
  /** true iken tutaçlar disabled/aria-disabled olur, sürükleme başlamaz (ör. arama/sıralama/filtre aktifken). */
  disabled?: boolean
  dragHandleLabel: string
  sequenceHeader: string
  announcements: DataTableReorderAnnouncementsCopy
}

export type DataTableEditableCopy = {
  /** Yer tutucu: {column}. */
  editingAnnouncementTemplate: string
  savedAnnouncement: string
  cancelledAnnouncement: string
}

export type DataTableEditable<TData> = {
  /** Hücrenin düzenleme anındaki ham (biçimsiz) değeri. */
  getCellValue: (row: TData, columnId: string) => string
  /** Kaydet; hata fırlatırsa düzenleme modunda kalır ve değer eski haline döner (çağıran rollback yapar). */
  onCellCommit: (row: TData, columnId: string, nextValue: string) => void | Promise<void>
  /** Hata metni döndürürse kaydetmeden düzenleme modunda kalır. */
  validateCell?: (columnId: string, value: string) => string | undefined
  copy: DataTableEditableCopy
}

export type DataTableCellCoord = { rowId: string; columnId: string }

export type DataTableCellNavigateDirection = "up" | "down" | "left" | "right" | "tab" | "shiftTab"

/** `DataTableRow`'un her hücreyi `DataTableEditableCell` ile render etmesi için gereken API. */
export type DataTableEditableRowApi<TData> = {
  editable: DataTableEditable<TData>
  activeCell: DataTableCellCoord | null
  editingCell: DataTableCellCoord | null
  announcement: string
  onActivateCell: (coord: DataTableCellCoord) => void
  onBeginEdit: (coord: DataTableCellCoord) => void
  onCommitCell: (row: TData, coord: DataTableCellCoord, value: string) => void
  onCancelEdit: () => void
  onNavigate: (coord: DataTableCellCoord, direction: DataTableCellNavigateDirection) => void
  registerCellRef: (coord: DataTableCellCoord, node: HTMLTableCellElement | null) => void
}

export type DataTableColumnResizeConfig = {
  /** Kilitli sütun id'leri `true` — kilitliyken tutaç `cursor-not-allowed`, sürükleme başlamaz. */
  lockedColumns: Record<string, boolean>
  onLockedColumnsChange: (next: Record<string, boolean>) => void
  lockColumnLabel: string
  unlockColumnLabel: string
  resizeHandleLabel: string
}

export type DataTableProps<TData extends RowData> = {
  columns: ColumnDef<DataTableFeatures, TData>[]
  data: TData[]
  empty: string
  loading?: boolean
  containerClassName?: string
  className?: string
  virtualize?: boolean
  /** Sağa sabitlenen kolon id'leri (LTR). */
  pinEnd?: string[]
  /** Sola sabitlenen kolon id'leri (LTR). */
  pinStart?: string[]
  columnMenu?: DataTableColumnMenuCopy
  tableApiRef?: Ref<DataTableApi | null>
  onColumnStateChange?: (active: boolean) => void
  isRowSelected?: (row: TData) => boolean
  /** Opt-in sayfalama; `false` (varsayılan) tüm satırları gösterir ve virtualization'ı etkilemez. */
  pagination?: DataTablePaginationConfig | false
  /** Kontrollü kolon görünürlüğü; verilmezse tablo kendi (gizli) state'ini tutar. */
  columnVisibility?: Record<string, boolean>
  onColumnVisibilityChange?: OnChangeFn<Record<string, boolean>>
  /**
   * Satır kimliği üretici. Genişletme (expanded) state'i satır kimliğine bağlı
   * tutulduğundan, `expandable` kullanılırken verinin kendi kalıcı id alanı
   * verilmelidir — aksi halde sıralama/sayfalama sonrası state yanlış satıra kayabilir.
   */
  getRowId?: (row: TData) => string
  /** Opt-in satır genişletme; verilmezse genişletme sütunu/düğmesi render edilmez. */
  expandable?: DataTableExpandable<TData>
  /** Opt-in satır sıralama (sürükle-bırak); verilmezse tutaç/sıra sütunu render edilmez. */
  reorder?: DataTableReorderConfig
  /** Dikey/yatay hücre çizgileri; verilmezse bugünkü görünüm ("rows") korunur. */
  gridLines?: DataTableGridLines
  /** Opt-in hücre düzenleme; verilmezse hücreler salt okunur kalır, grid ARIA semantiği eklenmez. */
  editable?: DataTableEditable<TData> | false
  /** Opt-in sütun genişliği değiştirme (kilit ikonu + sürüklenebilir tutaç); verilmezse render edilmez. */
  columnResize?: DataTableColumnResizeConfig
}
