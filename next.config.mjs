/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dev.to",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "ui.contentstack.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "images.contentstack.io",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
