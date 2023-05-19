/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      '@prisma/client',
      '@bcrypt',
      'autoprefixer',
      'eslint',
      'lodash',
      'postcss',
      'tailwindcss',
      'prisma',
      'typescript'
    ],
    swcPlugins: [
      ["next-superjson-plugin", {}]
    ],
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com"
    ]
  }
}

module.exports = nextConfig