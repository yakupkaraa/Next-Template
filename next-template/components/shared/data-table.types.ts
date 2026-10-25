import type { ColumnDef, OnChangeFn, RowData } from "@tanstack/react-table"
import type { ReactNode, Ref } from "react"
import type { DataTableFeatures } from "@/components/shared/data-table-features"

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
}
