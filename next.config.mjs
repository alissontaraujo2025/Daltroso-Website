/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        // Video files keep stable names, so cache for a week and revalidate in the background.
        source: "/videos/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=2592000" },
        ],
      },
    ];
  },
};

export default nextConfig;
