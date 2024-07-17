/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "miro.medium.com" },
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/original/**",
      },
    ],
  },
};

export default nextConfig;
