import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export async function POST() {
  const jar = await cookies()
  // Cookie oluşturulduğu path ve httpOnly attribute'larıyla siliniyor.
  jar.set("session", "", {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
  })
  return NextResponse.json({ ok: true })
}
