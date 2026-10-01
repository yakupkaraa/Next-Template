"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { isLocale } from "@/lib/locales"

const SESSION = "session"

function localePath(locale: string) {
  return isLocale(locale) ? locale : "tr"
}

export async function signIn(locale: string, formData: FormData) {
  const jar = await cookies()
  const remember = formData.get("remember") === "on"
  jar.set(SESSION, "1", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    ...(remember ? { maxAge: 60 * 60 * 24 * 30 } : {}),
  })
  redirect(`/${localePath(locale)}`)
}

export async function signOut(locale: string) {
  const jar = await cookies()
  jar.delete(SESSION)
  redirect(`/${localePath(locale)}/auth/login`)
}
