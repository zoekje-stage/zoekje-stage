import { MetadataRoute } from 'next'
import { readdirSync, statSync } from 'fs'
import { join } from 'path'

function getRoutes(dir: string, baseUrl: string, basePath = ''): MetadataRoute.Sitemap {
  const entries = readdirSync(dir, { withFileTypes: true })
  const routes: MetadataRoute.Sitemap = []

  for (const entry of entries) {
    const fullPath = join(dir, entry.name)
    
    if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
      const pagePath = join(fullPath, 'page.tsx')
      try {
        statSync(pagePath)
        const urlPath = basePath ? `${basePath}/${entry.name}` : `/${entry.name}`
        routes.push({
          url: `${baseUrl}${urlPath}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.8,
        })
        routes.push(...getRoutes(fullPath, baseUrl, urlPath))
      } catch {
        routes.push(...getRoutes(fullPath, baseUrl, basePath ? `${basePath}/${entry.name}` : `/${entry.name}`))
      }
    }
  }

  return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://easystage.nl'
  const appDir = join(process.cwd(), 'app')
  
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  routes.push(...getRoutes(appDir, baseUrl))

  return routes
}
