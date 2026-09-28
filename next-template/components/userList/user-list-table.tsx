"use client"

import { useEffect, useState } from "react"
import { FileSpreadsheet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/data-table"
import { SearchBar } from "@/components/ui/search-bar"
import { columns } from "./columns"
import { userColumns, userList, userListView } from "./data"

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
          <h2 className="text-base font-medium">{userListView.title}</h2>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline">
              <FileSpreadsheet />
              {userListView.excel}
            </Button>
            <SearchBar
              value={query}
              onValueChange={setQuery}
              placeholder={userListView.search}
            />
          </div>
        </CardContent>
      </Card>
      <DataTable
        columns={columns}
        data={rows}
        empty={userListView.empty}
        loading={loading}
        containerClassName="min-h-0 flex-1 overflow-x-scroll overflow-y-auto"
        className="w-max min-w-full"
      />
    </div>
  )
}
