/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = {
  images: {
    domains: [
      "cms.nhl.bamgrid.com",
      "nhl.bamcontent.com",
      "www-league.nhlstatic.com",
      "upload.wikimedia.org",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/teams",
        permanent: true,
      },
    ];
  },
};

return nextConfig;
