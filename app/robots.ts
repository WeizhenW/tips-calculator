import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: 'https://tips-calculator.vercel.app/sitemap.xml',
    host: 'https://tips-calculator.vercel.app',
  }
} 