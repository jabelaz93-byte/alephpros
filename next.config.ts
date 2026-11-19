import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  reactCompiler: true,
  async redirects() {
    // Old alephpros.com URLs (copy deck › "Redirects") and pages folded into the new tree.
    return [
      {
        source: "/construction-renovations",
        destination: "/services/remodeling-renovation",
        permanent: true,
      },
      {
        source: "/services/construction-and-renovation",
        destination: "/services/remodeling-renovation",
        permanent: true,
      },
      {
        source: "/services/construction-renovations",
        destination: "/services/remodeling-renovation",
        permanent: true,
      },
      {
        source: "/flooring-surface-systems",
        destination: "/building-systems/surface",
        permanent: true,
      },
      {
        source: "/electrical-smart-systems",
        destination: "/building-systems/electrical-smart",
        permanent: true,
      },
      {
        source: "/plumbing-water-systems",
        destination: "/building-systems/plumbing-water",
        permanent: true,
      },
      {
        source: "/property-management",
        destination: "/services/property-management",
        permanent: true,
      },
      {
        source: "/equipment-rentals",
        destination: "/services/equipment-rentals",
        permanent: true,
      },
      {
        source: "/corporate-rentals",
        destination: "/services/corporate-rentals",
        permanent: true,
      },
      {
        source: "/skilled-trade-training",
        destination: "/services/skilled-trade-training",
        permanent: true,
      },
      {
        source: "/our-approach",
        destination: "/how-we-build",
        permanent: true,
      },
      {
        source: "/our-approach/:slug",
        destination: "/how-we-build/:slug",
        permanent: true,
      },
      { source: "/meet-the-team", destination: "/team", permanent: true },
      { source: "/contact-us", destination: "/contact", permanent: true },
      // Not in the page tree (docs/ARCHITECTURE.md); temporary until those pages exist.
      {
        source: "/services",
        destination: "/building-systems",
        permanent: false,
      },
      { source: "/about", destination: "/team", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
