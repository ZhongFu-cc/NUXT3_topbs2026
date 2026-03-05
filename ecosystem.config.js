module.exports = {
  apps: [
    {
      name: 'TOPBS',
      port: '3000',
      exec_mode: 'cluster',
      instances: '1',
      script: './.output/server/index.mjs',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
        NUXT_PUBLIC_API_BASE: "__NUXT_PUBLIC_API_BASE__",
        NUXT_PUBLIC_DOMAIN: "__NUXT_PUBLIC_DOMAIN__"
      }
    }
  ]
}
