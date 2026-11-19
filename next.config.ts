import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Disable experimental segment caching that causes Windows OneDrive file-locking collisions
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;
