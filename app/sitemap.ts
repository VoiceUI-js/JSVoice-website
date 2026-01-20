import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://jsvoice.dev'

function getDocsRoutes(dir: string, baseRoute: string): string[] {
    let routes: string[] = []

    if (!fs.existsSync(dir)) return routes

    const items = fs.readdirSync(dir)

    for (const item of items) {
        const fullPath = path.join(dir, item)
        const stat = fs.statSync(fullPath)

        if (stat.isDirectory()) {
            // Recursively search
            routes = [...routes, ...getDocsRoutes(fullPath, `${baseRoute}/${item}`)]
        } else if (item === 'page.tsx' || item === 'page.js') {
            // Found a page
            routes.push(baseRoute)
        }
    }

    return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
    // 1. Static Routes
    const staticRoutes = [
        '',
        '/playground',
        '/showcase',
        '/blogs', // Add the new blog index
    ]

    // 2. Dynamic Doc Routes
    // Start searching from app/docs. baseRoute is '/docs' because app/docs/page.tsx -> /docs
    const docsDir = path.join(process.cwd(), 'app/docs')
    const docRoutes = getDocsRoutes(docsDir, '/docs')

    // 3. Dynamic Blog Routes
    const posts = getAllPosts(['slug', 'date'])
    const blogRoutes = posts.map(post => ({
        url: `${BASE_URL}/blogs/${post.slug}`,
        lastModified: new Date(post.date || new Date()),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    // Merge everything
    const allRoutes = [
        ...staticRoutes.map(route => ({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency: route === '' ? 'daily' : 'weekly',
            priority: route === '' ? 1 : 0.8
        })),
        ...docRoutes.map(route => ({
            url: `${BASE_URL}${route}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8
        })),
        ...blogRoutes
    ]

    // Deduplicate (in case docs root is caught twice)
    const uniqueRoutes = Array.from(new Map(allRoutes.map(item => [item.url, item])).values())

    return uniqueRoutes as MetadataRoute.Sitemap
}
