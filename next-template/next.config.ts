import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Gerçek API'ye geçişte avatar/medya URL'lerinin geldiği domain'ler buraya eklenir.
    // Örnek: { protocol: "https", hostname: "cdn.example.com" }
    remotePatterns: [],
  },
}

export default nextConfig
