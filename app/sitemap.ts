import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: 'https://tips-calculator.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://tips-calculator.vercel.app/stats',
      lastModified: new Date(),
    }
  ]
} 