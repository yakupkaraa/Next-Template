"use client"

import { useEffect, useState } from "react"
import { FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SearchBar } from "@/components/ui/search-bar"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { userColumns, userList } from "@/components/userList/data"

const skeletonRows = 14

export function UserListTable() {
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  const normalized = query.trim().toLocaleLowerCase("tr")
  const rows = normalized
    ? userList.filter((row) =>
        userColumns.some((column) =>
          row[column.key].toLocaleLowerCase("tr").includes(normalized)
        )
      )
    : userList

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4">
      <Card size="sm" className="shrink-0 rounded-[8px]">
        <CardContent className="flex items-center justify-between gap-4">
          <h2 className="text-base font-medium">Kullanıcı listesi</h2>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline">
              <FileSpreadsheet />
              Excel
            </Button>
            <SearchBar value={query} onValueChange={setQuery} />
          </div>
        </CardContent>
      </Card>
    <Table
      containerClassName="min-h-0 flex-1 overflow-x-scroll overflow-y-auto"
      className="w-max min-w-full"
    >
      <TableHeader className="sticky top-0 z-10 bg-background">
        <TableRow>
          {userColumns.map((column) => (
            <TableHead key={column.key} className="whitespace-nowrap bg-background">
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading
          ? Array.from({ length: skeletonRows }, (_, row) => (
              <TableRow key={`skeleton-${row}`}>
                {userColumns.map((column, columnIndex) => (
                  <TableCell key={column.key}>
                    <Skeleton
                      className={`h-4 ${columnIndex % 3 === 0 ? "w-16" : columnIndex % 3 === 1 ? "w-28" : "w-20"}`}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : null}
        {!loading && rows.length === 0 ? (
          <TableRow>
            <TableCell colSpan={userColumns.length} className="text-muted-foreground">
              Sonuç yok
            </TableCell>
          </TableRow>
        ) : null}
        {!loading &&
          rows.map((row) => (
            <TableRow key={row.id}>
              {userColumns.map((column) => (
                <TableCell key={column.key} className="whitespace-nowrap">
                  {row[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
      </TableBody>
    </Table>
    </div>
  )
}
