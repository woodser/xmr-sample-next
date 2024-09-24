/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  webpack: (config, { isServer }) => {
    config.experiments = { ...config.experiments, topLevelAwait: true }

    if (!isServer) {
      config.resolve.alias.fs = "memfs";
      config.resolve.fallback.child_process = false;
    }

    if (isServer) {
      config.externals.push("monero-ts");
      config.resolve.alias["web-worker"] = "webworker-threads";
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