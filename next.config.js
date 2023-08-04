/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa');

const nextConfig = {
    ...withPWA({
      dest: 'public',
      register: true,
      skipWaiting: true,
    }),
    experimental: {
      appDir: true,
    },
    images: {
      domains: [
        'avatars.githubusercontent.com',
        'lh3.googleusercontent.com',
        'res.cloudinary.com'
      ]
    }
  }
  
  module.exports = nextConfig