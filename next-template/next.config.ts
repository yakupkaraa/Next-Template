import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    // Gerçek API'ye geçişte avatar/medya URL'lerinin geldiği domain'ler buraya eklenir.
    // Örnek: { protocol: "https", hostname: "cdn.example.com" }
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ]
  },
}

export default nextConfig
