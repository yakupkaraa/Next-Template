export type AppEnv = "development" | "qa" | "production"

const APP_ENVS: readonly AppEnv[] = ["development", "qa", "production"]

const FALLBACK_API_URL: Record<AppEnv, string> = {
  development: "http://dev.api.example.your-url.com",
  qa: "https://qa.api.example.your-url.com",
  production: "https://prod.api.example.your-url.com",
}

function readAppEnv(value: string | undefined): AppEnv {
  if (value && APP_ENVS.includes(value as AppEnv)) return value as AppEnv
  return "development"
}

const DEFAULT_SITE_URL = "http://localhost:3000"

function readSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (explicit) return explicit
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim()
  if (vercelUrl) return `https://${vercelUrl}`
  return DEFAULT_SITE_URL
}

const appEnv = readAppEnv(process.env.NEXT_PUBLIC_APP_ENV)
const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || FALLBACK_API_URL[appEnv]
const siteUrl = readSiteUrl()

export const config = { appEnv, apiUrl, siteUrl }
