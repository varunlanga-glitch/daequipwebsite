// Cloudflare R2 CDN base URL for high-res assets
export const CDN = 'https://pub-2e720f85e29f4fd38f2994edca4f8e25.r2.dev'

// Helper to build full CDN image URL
export const cdnImage = (filename) => `${CDN}/images/${filename}`

// Helper to build full CDN video URL
export const cdnVideo = (filename) => `${CDN}/videos/${filename}`
