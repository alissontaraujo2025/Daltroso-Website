/** @type {import('next').NextConfig} */

// Cabeçalhos de segurança básicos para todas as respostas
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
];

// Mídias mantêm nomes estáveis: cache de uma semana, revalidando em segundo plano
const mediaCache = [
  { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
];

const nextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/videos/:path*", headers: mediaCache },
      { source: "/images/:path*", headers: mediaCache },
    ];
  },
};

export default nextConfig;
