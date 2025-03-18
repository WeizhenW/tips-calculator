import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://easy-tip-calculator.vercel.app'
  const currentDate = new Date().toISOString()

  return [
    {
      url: baseUrl,
      lastModified: currentDate,
    },
    {
      url: `${baseUrl}/stats`,
      lastModified: currentDate,
    }
  ]
} 