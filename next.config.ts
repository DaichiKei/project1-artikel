import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [], // Kosongkan array untuk menerima gambar dari semua domain
    unoptimized: true, // Nonaktifkan optimisasi gambar
  },
};

export default nextConfig;
