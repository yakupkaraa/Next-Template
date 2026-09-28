"use client"

import { useEffect, useState, type ReactNode } from "react"
import { Building2, Mail, MapPin, Phone } from "lucide-react"
import { CountryFlag } from "@/components/layout/header/locale-flag"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { userColumns, userList, userListView, type UserRow } from "@/components/userList/data"
import { userCardView } from "./data"

const label = Object.fromEntries(userColumns.map((column) => [column.key, column.label])) as Record<
  (typeof userColumns)[number]["key"],
  string
>

const statusColors: Record<string, string> = {
  Aktif: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  Beklemede: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300",
  Pasif: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300",
}

function initials(user: UserRow) {
  return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toLocaleUpperCase("tr")
}

function Detail({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <p className="flex items-start gap-2 text-muted-foreground">
      <span className="mt-0.5 shrink-0 text-foreground">{icon}</span>
      <span className="min-w-0 break-all">{text}</span>
    </p>
  )
}

function UserCard({ user }: { user: UserRow }) {
  const confirmed = user.verified === userListView.confirmed

  return (
    <Card className="h-full gap-0 overflow-hidden py-0">
      <div className="flex flex-col items-center pb-4 text-center">
        <div className="h-16 w-full bg-linear-to-br from-primary/25 via-primary/10 to-muted" />
        <Avatar className="-mt-8 size-16 ring-4 ring-card">
          <AvatarFallback className="bg-background text-base font-medium text-foreground">
            {initials(user)}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="mt-3 px-4">
          {user.firstName} {user.lastName}
        </CardTitle>
        <p className="px-4 text-sm text-muted-foreground">
          {user.title} · {user.role}
        </p>
        <Badge variant="secondary" className={`mt-2 ${statusColors[user.status]}`}>
          {user.status}
        </Badge>
      </div>
      <Separator />
      <CardContent className="flex flex-col gap-3 bg-muted/40 py-4">
        <Detail icon={<Mail className="size-4" />} text={user.email} />
        <Detail icon={<Phone className="size-4" />} text={user.phone} />
        <Detail icon={<Building2 className="size-4" />} text={`${user.company} · ${user.department}`} />
        <p className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="size-4 shrink-0 text-foreground" />
          <span className="inline-flex min-w-0 items-center gap-2">
            <CountryFlag country={user.country} />
            {user.city}, {user.country}
          </span>
        </p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-1">
          <span className="text-muted-foreground">
            {label.plan}: {user.plan}
          </span>
          <Badge
            variant="secondary"
            className={
              confirmed
                ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                : "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
            }
          >
            {user.verified}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}

function UserCardSkeleton() {
  return (
    <Card className="h-full gap-0 overflow-hidden py-0">
      <div className="flex flex-col items-center pb-4">
        <Skeleton className="h-16 w-full rounded-none" />
        <Skeleton className="-mt-8 size-16 rounded-full" />
        <Skeleton className="mt-3 h-4 w-28" />
        <Skeleton className="mt-2 h-3 w-36" />
        <Skeleton className="mt-2 h-5 w-16 rounded-full" />
      </div>
      <Separator />
      <CardContent className="flex flex-col gap-3 bg-muted/40 py-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <Skeleton className="h-4 w-3/5" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
    </Card>
  )
}

export function UserCardGrid() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 2500)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-base font-medium">{userCardView.title}</h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4">
        {loading
          ? Array.from({ length: 8 }, (_, index) => <UserCardSkeleton key={index} />)
          : userList.map((user) => <UserCard key={user.id} user={user} />)}
      </div>
    </div>
  )
}
