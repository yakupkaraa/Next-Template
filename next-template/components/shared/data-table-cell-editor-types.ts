export type DataTableCellEditor =
  | { type: "text" }
  | { type: "number"; min?: number }
  | { type: "date" }
  | { type: "select"; options: readonly string[] }

/** `dataTableFeatures`'ın `columnMeta` tip yuvası — her sütun tanımına opsiyonel `editor` ekler. */
export type DataTableColumnMeta = {
  editor?: DataTableCellEditor
}
