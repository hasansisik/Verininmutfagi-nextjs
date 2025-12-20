/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  turbopack: {},
  webpack: (config) => {
    // logged-out.scss için PostCSS config'ini özelleştir
    const rules = config.module.rules;

    rules.forEach((rule) => {
      if (rule.oneOf && Array.isArray(rule.oneOf)) {
        rule.oneOf.forEach((oneOf) => {
          if (oneOf.test && oneOf.test.toString().includes('scss')) {
            // use bir array veya object olabilir
            if (Array.isArray(oneOf.use)) {
              oneOf.use = oneOf.use.map((use) => {
                if (typeof use === 'object' && use !== null) {
                  const loader = use.loader || (typeof use === 'string' ? use : '');
                  if (loader.includes && loader.includes('postcss-loader')) {
                    return {
                      ...use,
                      options: {
                        ...(use.options || {}),
                        postcssOptions: (loaderContext) => {
                          const resourcePath = loaderContext?.resourcePath || '';
                          // logged-out.scss için sadece autoprefixer kullan
                          if (resourcePath.includes('logged-out.scss')) {
                            return {
                              plugins: [require('autoprefixer')],
                            };
                          }
                          // Diğer dosyalar için normal config (postcss.config.js'den gelir)
                          return {};
                        },
                      },
                    };
                  }
                }
                return use;
              });
            } else if (oneOf.use && typeof oneOf.use === 'object') {
              // use bir object ise
              const loader = oneOf.use.loader || '';
              if (loader.includes && loader.includes('postcss-loader')) {
                oneOf.use = {
                  ...oneOf.use,
                  options: {
                    ...(oneOf.use.options || {}),
                    postcssOptions: (loaderContext) => {
                      const resourcePath = loaderContext?.resourcePath || '';
                      if (resourcePath.includes('logged-out.scss')) {
                        return {
                          plugins: [require('autoprefixer')],
                        };
                      }
                      return {};
                    },
                  },
                };
              }
            }
          }
        });
      }
    });

    return config;
  },
};

export default nextConfig;
