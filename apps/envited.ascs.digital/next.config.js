//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { composePlugins, withNx } = require('@nx/next')

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve = {
        ...config.resolve,
        fallback: {
          // fixes proxy-agent dependencies
          net: false,
          tls: false,
          perf_hooks: false,
          fs: false,
          path: false,
        },
      }
    }

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    }

    config.module.rules = [
      ...config.module.rules,
      { test: /\.jsonld$/i, loader: 'raw-loader' },
      { test: /\.ttl$/i, loader: 'raw-loader' },
    ]

    return config
  },
}

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
]

module.exports = composePlugins(...plugins)(nextConfig)
