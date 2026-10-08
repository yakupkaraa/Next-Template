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

const appEnv = readAppEnv(process.env.NEXT_PUBLIC_APP_ENV)
const apiUrl = process.env.NEXT_PUBLIC_API_URL?.trim() || FALLBACK_API_URL[appEnv]

export const config = { appEnv, apiUrl }
