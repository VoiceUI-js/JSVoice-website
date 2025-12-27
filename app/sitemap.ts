import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://jsvoice.dev'

    const routes = [
        '',
        '/docs',
        '/docs/get-started/installation',
        '/docs/get-started/quick-start',
        '/docs/get-started/wake-word',
        '/docs/core/recognition',
        '/docs/core/synthesis',
        '/docs/core/visualizers',
        '/docs/commands/navigation',
        '/docs/commands/scrolling',
        '/docs/commands/forms',
        '/docs/commands/interaction',
        '/docs/commands/system',
        '/docs/advanced/patterns',
        '/docs/advanced/events',
        '/docs/advanced/errors',
        '/docs/api/class',
        '/docs/api/types',
        '/playground',
        '/showcase',
    ]

    return routes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : route.startsWith('/docs') ? 0.8 : 0.5,
    }))
}
