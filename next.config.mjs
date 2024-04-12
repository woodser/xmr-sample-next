/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.externals["web-worker"] = "web-worker";
        }
        return config;
      }
};

export default nextConfig;
