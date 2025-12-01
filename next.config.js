/**
 * next.config.js
 *
 * Next.js configuration file.
 * Configures build settings and runtime behavior.
 *
 * reactStrictMode: Enables React's strict mode for better development
 *                  experience and catching potential issues.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable React strict mode for better development experience
  reactStrictMode: true,
  // Note: CSS Modules are handled natively by Next.js,
  // no additional webpack configuration needed
}

module.exports = nextConfig

