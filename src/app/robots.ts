import { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/api/'],
        },
        sitemap: 'https://me.onra.ch/sitemap.xml', // Replace with your actual domain
    }
}