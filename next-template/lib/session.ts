"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isLocale } from "@/lib/locales"

const SESSION = "session"

function localePath(locale: string) {
  return isLocale(locale) ? locale : "tr"
}

export async function signIn(locale: string) {
  const jar = await cookies()
  jar.set(SESSION, "1", { path: "/", httpOnly: true, sameSite: "lax" })
  redirect(`/${localePath(locale)}`)
}

export async function signOut(locale: string) {
  const jar = await cookies()
  jar.delete(SESSION)
  redirect(`/${localePath(locale)}/login`)
}
