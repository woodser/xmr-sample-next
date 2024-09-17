/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }

    if (!isServer) {
      config.resolve.alias.fs = "memfs";
      config.resolve.fallback.child_process = false;
    }

    config.externals = [...config.externals, ({ request }, callback) => {
      if (/^web-worker$/.test(request)) {
        return callback(null, request);
      }
      callback();
    }];

    return config;
  },
};

export default nextConfig;
